const fs = require('fs');

function checkRoot(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = dir + '/' + entry.name;
    if (entry.isDirectory()) {
      checkRoot(full);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('href="/furniture-moving-within-riyadh/"') || 
          content.includes('href="https://alkaleej-moving.com/furniture-moving-within-riyadh/"') ||
          content.includes('"furniture-moving-within-riyadh/"')) {
        console.log('Direct root link in:', full);
      }
    }
  }
}

checkRoot('.');
console.log('Done searching for root /furniture-moving-within-riyadh/');
