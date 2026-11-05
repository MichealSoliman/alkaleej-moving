const fs = require('fs');
const content = fs.readFileSync('areas/index.html', 'utf8');
console.log(content.slice(0, 3000));
console.log('\n--- HEADINGS ---');
const headings = [...content.matchAll(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log(headings);

