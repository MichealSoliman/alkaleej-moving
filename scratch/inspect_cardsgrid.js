const fs = require('fs');
const html = fs.readFileSync('areas/index.html', 'utf8');

const cardsGridIdx = html.indexOf('id="cardsGrid"');
console.log('cardsGrid snippet:');
console.log(html.slice(cardsGridIdx, cardsGridIdx + 500));

