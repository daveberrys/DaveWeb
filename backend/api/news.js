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

  const toNum = (s) => {
    const cleaned = s.replace(/(\d+)(?:st|nd|rd|th)/, '$1');
    return Date.parse(cleaned);
  };

  const articles = files.map((file) => {
    const filePath = path.join(newsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let dateStr = null;
    for (const line of lines) {
      const match = line.match(/\*{0,2}Date\*{0,2}\s*:\s*(.+?)(?:\s*<br\s*\/?\s*>)?\s*$/i);
      if (match) {
        dateStr = match[1].trim();
        break;
      }
    }
    return { file: path.basename(filePath), dateStr: dateStr || '' };
  });

  articles.sort((a, b) => toNum(b.dateStr) - toNum(a.dateStr))
  return articles;
}

export async function fetch(newsName) {
  const newsDir = path.join(currentDir, '..', 'news');
  const filePath = path.join(newsDir, `${newsName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error('News not found');
  }

  return fs.readFileSync(filePath, 'utf-8');
}
