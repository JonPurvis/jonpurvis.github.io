import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { fetchMyHerdUnique, herdCountPayload } from './elephpant-herd.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'public', 'elephpant-herd-unique.json');

const token = process.env.ELEPHPANT_API_TOKEN?.trim();
if (!token) {
  console.warn('ELEPHPANT_API_TOKEN not set; skipping herd count file update.');
  process.exit(0);
}

const unique = await fetchMyHerdUnique(token);
if (unique === null) {
  console.error('GET /api/me/herd did not return HTTP 200.');
  process.exit(1);
}

await writeFile(outPath, `${herdCountPayload(unique)}\n`, 'utf8');
console.log(`Wrote herd unique count (${unique}) to public/elephpant-herd-unique.json`);
