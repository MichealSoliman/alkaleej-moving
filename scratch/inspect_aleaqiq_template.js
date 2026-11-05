const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');

console.log('--- HEAD ---');
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
if (headMatch) {
  // list link tags and script tags
  console.log(headMatch[1].slice(0, 1000));
}

console.log('\n--- BODY STRUCTURE ---');
const mainTags = [...html.matchAll(/<(?:header|nav|section|footer|div\s+id=["'][^"']+["'])[^>]*>/gi)].map(m => m[0]);
console.log(mainTags.slice(0, 20));

