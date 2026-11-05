const fs = require('fs');

function checkIntercity(p) {
  const c = fs.readFileSync(p, 'utf8');
  console.log(`=== ${p} (length: ${c.length}) ===`);
  const title = (c.match(/<title>(.*?)<\/title>/is) || [])[1];
  const h1 = (c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/is) || [])[1];
  const canonical = (c.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1];
  const schemas = [...c.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gis)].map(m => m[1]);
  console.log('Title:', title ? title.trim() : 'NONE');
  console.log('H1:', h1 ? h1.replace(/<[^>]+>/g, '').trim() : 'NONE');
  console.log('Canonical:', canonical ? canonical.trim() : 'NONE');
  console.log('Schemas count:', schemas.length);
}

checkIntercity('areas/riyadh-to-makkah/index.html');
checkIntercity('areas/riyadh-to-qassim/index.html');
checkIntercity('areas/riyadh-to-dammam/index.html');
checkIntercity('areas/riyadh-to-jeddah/index.html');

