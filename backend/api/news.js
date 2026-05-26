import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export async function fetchAll() {
  const newsDir = path.join(currentDir, '..', 'news');
  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith('.md'));
  return files.map((f) => f.replace('.md', ''));
}

export async function fetch(newsName) {
  const newsDir = path.join(currentDir, '..', 'news');
  const filePath = path.join(newsDir, `${newsName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error('News not found');
  }

  return fs.readFileSync(filePath, 'utf-8');
}
