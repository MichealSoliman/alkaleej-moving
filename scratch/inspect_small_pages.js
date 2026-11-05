const fs = require('fs');

function checkFile(p) {
  const c = fs.readFileSync(p, 'utf8');
  console.log(`=== ${p} (length: ${c.length}) ===`);
  const title = (c.match(/<title>(.*?)<\/title>/is) || [])[1];
  const h1 = (c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/is) || [])[1];
  const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Title:', title ? title.trim() : 'NONE');
  console.log('H1:', h1 ? h1.replace(/<[^>]+>/g, '').trim() : 'NONE');
  console.log('H2s:', h2s);
}

checkFile('areas/hayu-almonsiya/index.html');
checkFile('areas/north-riyadh/index.html');

