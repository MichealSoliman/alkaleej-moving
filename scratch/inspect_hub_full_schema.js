const fs = require('fs');
const html = fs.readFileSync('areas/index.html', 'utf8');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('areas/index.html full schema:');
console.log(schemas[0]);

