/**
 * Prepares the Chief Instructor portrait:
 *  1. Removes the connected white studio background (preserves the white shirt).
 *  2. Softens the matte and de-fringes white spill for clean edges.
 *  3. Composites the portrait onto a sky-blue studio backdrop that matches the
 *     site's blue/cyan accent palette. Only the photo gets this backdrop.
 *
 * Usage: node scripts/prepare-instructor-photo.mjs [input] [output]
 */
import sharp from 'sharp';

const input = process.argv[2] ?? 'public/images/instructors/nezam-uddin-source.jpeg';
const output = process.argv[3] ?? 'public/images/instructors/nezam-uddin.webp';
const SIZE = 800;

// ---------- 1) Load & flood-fill the white background ----------
const { data, info } = await sharp(input)
  .resize(SIZE, SIZE, { fit: 'cover', position: 'top' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h } = info;
const px = (x, y) => (y * w + x) * 4;
const isWhite = (i) => data[i] >= 225 && data[i + 1] >= 225 && data[i + 2] >= 225;
const isLight = (i) => data[i] >= 190 && data[i + 1] >= 190 && data[i + 2] >= 190;

const bg = new Uint8Array(w * h);
const queue = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const idx = y * w + x;
  if (bg[idx] || !isWhite(px(x, y))) return;
  bg[idx] = 1;
  queue.push(idx);
};
for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
while (queue.length) {
  const idx = queue.pop();
  const x = idx % w;
  const y = (idx / w) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
for (let pass = 0; pass < 2; pass++) {
  const next = bg.slice();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (bg[idx]) continue;
      const touches =
        (x > 0 && bg[idx - 1]) ||
        (x < w - 1 && bg[idx + 1]) ||
        (y > 0 && bg[idx - w]) ||
        (y < h - 1 && bg[idx + w]);
      if (touches && isLight(px(x, y))) next[idx] = 1;
    }
  }
  bg.set(next);
}

// ---------- 2) Apply the clean hard matte ----------
// The flood-fill + light-halo pass already removes the white studio fringe,
// so a hard matte keeps edges crisp without re-introducing white spill.
const cutout = Buffer.from(data);
for (let i = 0; i < w * h; i++) {
  cutout[i * 4 + 3] = bg[i] ? 0 : 255;
}

// ---------- 3) Sky-blue studio backdrop ----------
const sky = Buffer.from(`
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7DD3FC"/>
      <stop offset="45%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="30%" r="62%">
      <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#BAE6FD" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#BAE6FD" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#082F49" stop-opacity="0"/>
      <stop offset="100%" stop-color="#082F49" stop-opacity="0.28"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#sky)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#halo)"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#vignette)"/>
</svg>`);

const cutoutPng = await sharp(cutout, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();

await sharp(sky)
  .composite([{ input: cutoutPng, top: 0, left: 0 }])
  .webp({ quality: 90 })
  .toFile(output);

console.log(JSON.stringify({ output, size: `${SIZE}x${SIZE}`, backdrop: 'sky-blue' }));
