const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[0]);
console.log('Scripts in hayu-aleaqiq:');
scripts.forEach(s => {
  if (s.includes('application/ld+json')) {
    console.log('[JSON-LD]');
  } else {
    console.log(s);
  }
});

