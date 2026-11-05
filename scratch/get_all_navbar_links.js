const fs = require('fs');
const nav = fs.readFileSync('components/navbar.html', 'utf8');
const hrefs = [...nav.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('All links in navbar.html:');
console.log([...new Set(hrefs)]);

