import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function fetchAll() {
  const blogsDir = path.join(__dirname, '..', 'blogs');
  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith('.md'));
  return files.map((f) => f.replace('.md', ''));
}

export async function fetch(blogName) {
  const blogsDir = path.join(__dirname, '..', 'blogs');
  const filePath = path.join(blogsDir, `${blogName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error('Blog not found');
  }

  return fs.readFileSync(filePath, 'utf-8');
}
