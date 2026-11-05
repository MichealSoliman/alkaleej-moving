const fs = require('fs');
const content = fs.readFileSync('areas/index.html', 'utf8');
const hrefs = [...content.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total hrefs in areas/index.html:', hrefs.length);
const areaHrefs = hrefs.filter(h => h.includes('hayu') || h.includes('north') || h.includes('riyadh-to') || h.includes('areas'));
console.log('Area hrefs:', areaHrefs);

