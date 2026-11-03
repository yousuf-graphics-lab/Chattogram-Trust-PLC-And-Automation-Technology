/**
 * Compresses the lab photos in public/images/lab to WebP (max 1600px wide).
 * Run: npm run compress:images
 */
import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('public/images/lab');
const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'));
  const info = await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);
  console.log(`${file} -> ${path.basename(output)} (${(info.size / 1024).toFixed(0)} KB)`);
  await unlink(input);
}
console.log('Done.');
