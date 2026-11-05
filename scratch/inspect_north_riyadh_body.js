const fs = require('fs');
const html = fs.readFileSync('areas/north-riyadh/index.html', 'utf8');
const bodyIndex = html.indexOf('<body');
console.log(html.slice(bodyIndex, bodyIndex + 2500));

