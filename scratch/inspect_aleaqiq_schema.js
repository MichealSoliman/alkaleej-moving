const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => m[1]);
console.log('Schemas in hayu-aleaqiq:');
schemas.forEach((s, i) => {
  console.log(`Schema ${i}:`, s);
});

