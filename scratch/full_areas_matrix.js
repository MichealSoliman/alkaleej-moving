const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const rows = [];

dirs.forEach(d => {
  const file = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  const canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1] || '';
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
  
  // check schema scripts
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  let schemaTypes = [];
  schemas.forEach(s => {
    try {
      const obj = JSON.parse(s);
      if (obj['@graph']) {
        schemaTypes.push(...obj['@graph'].map(g => g['@type']));
      } else {
        schemaTypes.push(obj['@type']);
      }
    } catch(e) {
      schemaTypes.push('ERROR: ' + e.message);
    }
  });

  // check if phone is in title
  const phoneInTitle = /0503430106/.test(title);
  // check description template pattern
  const isGenericDesc = desc.includes('تقدم خدمات فك وتركيب وتغليف ونقل الأثاث والمكاتب والفلل والشقق');

  // check FAQ accordion in HTML
  const faqItems = [...html.matchAll(/class=["'][^"']*faq-(?:item|question)[^"']*["']/gi)].length;

  rows.push({
    d,
    title,
    phoneInTitle,
    desc,
    isGenericDesc,
    canonical,
    h1,
    schemaTypes: schemaTypes.flat(),
    faqItems,
    len: html.length
  });
});

console.log(JSON.stringify(rows, null, 2));

