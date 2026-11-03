/**
 * Removes the connected white studio background from the instructor portrait
 * while preserving the white shirt (which is enclosed by the suit).
 *
 * Usage: node scripts/remove-white-bg.mjs [input] [output]
 */
import sharp from 'sharp';

const input = process.argv[2] ?? 'public/images/instructors/nezam-uddin-source.jpeg';
const output = process.argv[3] ?? 'public/images/instructors/nezam-uddin.webp';
const SIZE = 640;

const { data, info } = await sharp(input)
  .resize(SIZE, SIZE, { fit: 'cover', position: 'top' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h } = info;
const px = (x, y) => (y * w + x) * 4;
const isWhite = (i) => data[i] >= 225 && data[i + 1] >= 225 && data[i + 2] >= 225;
const isLight = (i) => data[i] >= 190 && data[i + 1] >= 190 && data[i + 2] >= 190;

// 1) Flood-fill background from the image borders only.
const bg = new Uint8Array(w * h);
const queue = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const idx = y * w + x;
  if (bg[idx]) return;
  if (!isWhite(px(x, y))) return;
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

// 2) Remove light halo/fringe pixels that touch the removed background.
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

// 3) Apply alpha.
let transparent = 0;
for (let i = 0; i < w * h; i++) {
  if (bg[i]) {
    data[i * 4 + 3] = 0;
    transparent++;
  }
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .webp({ quality: 90 })
  .toFile(output);

console.log(
  JSON.stringify({ output, size: `${w}x${h}`, transparentPct: ((transparent / (w * h)) * 100).toFixed(1) })
);
