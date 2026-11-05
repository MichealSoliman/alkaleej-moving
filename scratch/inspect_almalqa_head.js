const fs = require('fs');
const html = fs.readFileSync('areas/hayu-almalqa/index.html', 'utf8');
const bodyIndex = html.indexOf('<body');
console.log(html.slice(bodyIndex, bodyIndex + 1200));

