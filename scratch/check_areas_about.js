const fs = require('fs');
const path = require('path');

function getAreasFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAreasFiles(full, list);
    } else if (entry.name.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const files = getAreasFiles('areas');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('about') && l.includes('href')) {
      console.log(`${f}:${idx+1} -> ${l.trim()}`);
    }
  });
});
