const fs = require('fs');
const content = fs.readFileSync('areas/index.html', 'utf8');
const match = content.match(/const areasData = (\[[\s\S]*?\]);/);
if (match) {
  try {
    const data = eval(match[1]);
    console.log('areasData count:', data.length);
    data.forEach(d => console.log(d.name, '->', d.link));
  } catch(e) {
    console.log('Error parsing areasData:', e.message);
  }
}

