const fs = require('fs');
const path = require('path');

function getAllFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, list);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.xml') || entry.name === '.htaccess') {
      list.push(full);
    }
  }
  return list;
}

const files = getAllFiles('.');
const nonWaArabic = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hrefMatches = content.match(/href=["'][^"']*[\u0600-\u06FF%][^"']*["']/g) || [];
  hrefMatches.forEach(m => {
    if ((m.includes('%D') || /[\u0600-\u06FF]/.test(m)) && !m.includes('wa.me')) {
      nonWaArabic.push({ file: f, match: m });
    }
  });
});

console.log('Non-wa.me Arabic or encoded hrefs count:', nonWaArabic.length);
nonWaArabic.forEach(h => console.log(h.file, '->', h.match));
