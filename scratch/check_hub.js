const fs = require('fs');
const path = require('path');

const hubFile = path.join(__dirname, '..', 'areas', 'index.html');
if (fs.existsSync(hubFile)) {
  const content = fs.readFileSync(hubFile, 'utf8');
  console.log('areas/index.html length:', content.length);
  const title = (content.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  const desc = (content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  console.log('Hub Title:', title.trim());
  console.log('Hub Desc:', desc.trim());
  
  // check which areas are linked
  const links = [...content.matchAll(/href=["'](\/areas\/[^"']+)["']/gi)].map(m => m[1]);
  console.log('Linked area URLs in areas/index.html:', [...new Set(links)]);
}

