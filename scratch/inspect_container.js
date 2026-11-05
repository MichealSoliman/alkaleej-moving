const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');

const containerMatch = html.match(/<div class="[^"]*container[^"]*"[^>]*>([\s\S]*?)<\/main>/i);
if (containerMatch) {
  console.log('Container snippet:', containerMatch[0].slice(0, 1500));
}

