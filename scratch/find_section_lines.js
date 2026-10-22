const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((line, idx) => {
  const m = line.match(/<section\b[^>]*\bid="([^"]+)"/i);
  if (m) console.log(`Line ${idx + 1}: <section id="${m[1]}">`);
  else if (line.includes('<section')) console.log(`Line ${idx + 1}: <section [no-id]>`);
});
