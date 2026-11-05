const fs = require('fs');
const html = fs.readFileSync('areas/riyadh-to-jeddah/index.html', 'utf8');

console.log('Title:', (html.match(/<title>(.*?)<\/title>/is) || [])[1]);
console.log('Desc:', (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1]);
console.log('H1:', (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/is) || [])[1]);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Schemas count:', schemas.length);
schemas.forEach((s, idx) => console.log(`Schema ${idx}:`, s));

