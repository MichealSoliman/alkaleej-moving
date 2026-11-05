const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');
const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]);
console.log('Links in hayu-aleaqiq:');
links.forEach(l => console.log(l));

