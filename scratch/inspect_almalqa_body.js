const fs = require('fs');
const html = fs.readFileSync('areas/hayu-almalqa/index.html', 'utf8');

console.log('Al-Malqa sidebar check:', html.includes('sticky-sidebar'));
console.log('Al-Malqa main tag check:', html.includes('<main'));
console.log('Al-Malqa first 1000 chars of body:');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/header>/i);
if (bodyMatch) {
  console.log(bodyMatch[0].slice(0, 1000));
}

