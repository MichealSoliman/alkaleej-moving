const fs = require('fs');

function inspectPage(p) {
  const html = fs.readFileSync(p, 'utf8');
  console.log(`=== ${p} ===`);
  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/is) || [])[1];
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Title:', title ? title.trim() : 'NONE');
  console.log('H1:', h1 ? h1.replace(/<[^>]+>/g, '').trim() : 'NONE');
  console.log('H2s:', h2s);
}

inspectPage('areas/hayu-almalqa/index.html');
inspectPage('areas/hayu-aleaqiq/index.html');
inspectPage('areas/hayu-aleulya/index.html');

