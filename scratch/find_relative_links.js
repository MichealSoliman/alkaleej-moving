const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(full, list);
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const files = getAllHtmlFiles('.');
const relativeLinks = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/href=["']([^"']+)["']/g) || [];
  matches.forEach(m => {
    const val = m.replace(/href=["']/, '').replace(/["']$/, '');
    if (
      !val.startsWith('http') &&
      !val.startsWith('/') &&
      !val.startsWith('#') &&
      !val.startsWith('tel:') &&
      !val.startsWith('mailto:') &&
      !val.startsWith('javascript:')
    ) {
      relativeLinks.push({ file, link: val });
    }
  });
});

console.log('Total relative links found:', relativeLinks.length);
relativeLinks.forEach(r => {
  console.log(`${r.file} -> ${r.link}`);
});
