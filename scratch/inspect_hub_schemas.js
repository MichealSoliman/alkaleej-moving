const fs = require('fs');
const html = fs.readFileSync('areas/index.html', 'utf8');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('areas/index.html schemas count:', schemas.length);
schemas.forEach((s, i) => console.log(`Schema ${i}:`, s.slice(0, 500)));

