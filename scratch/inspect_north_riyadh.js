const fs = require('fs');
const html = fs.readFileSync('areas/north-riyadh/index.html', 'utf8');
console.log('north-riyadh first 2000 chars:');
console.log(html.slice(0, 2000));

