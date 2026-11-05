const fs = require('fs');
const html = fs.readFileSync('areas/riyadh-to-jeddah/index.html', 'utf8');
const idIdx = html.indexOf('id="faq"');
if (idIdx !== -1) {
  console.log(html.slice(idIdx, idIdx + 3000));
} else {
  console.log('No id="faq" in jeddah');
}

