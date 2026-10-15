const fs = require('fs');
const path = require('path');

function getAllFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

const files = getAllFiles('.');
const matches = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('bedroom-disassembly-installation')) {
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('bedroom-disassembly-installation')) {
        matches.push({ file: f, line: idx + 1, text: l.trim() });
      }
    });
  }
});

console.log(`Found ${matches.length} occurrences in ${new Set(matches.map(m => m.file)).size} files:`);
matches.forEach(m => console.log(`${m.file}:${m.line} -> ${m.text}`));
