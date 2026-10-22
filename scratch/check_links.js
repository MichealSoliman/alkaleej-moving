const fs = require('fs');
const path = require('path');
const html = fs.readFileSync('index.html', 'utf8');

const linkMatches = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
const uniqueLinks = new Map();

linkMatches.forEach(m => {
  const href = m[1].trim();
  const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!uniqueLinks.has(href)) {
    uniqueLinks.set(href, []);
  }
  uniqueLinks.get(href).push(text);
});

console.log(`Unique hrefs count: ${uniqueLinks.size}\n`);

for (const [href, texts] of uniqueLinks.entries()) {
  let status = 'EXTERNAL / PROTOCOL';
  let targetExists = null;
  if (!href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
    let cleanHref = href.split('?')[0].split('#')[0];
    if (cleanHref.startsWith('/')) cleanHref = '.' + cleanHref;
    if (cleanHref === '' || cleanHref === '.') cleanHref = './index.html';
    else if (cleanHref.endsWith('/')) cleanHref = cleanHref + 'index.html';
    
    const resolvedPath = path.resolve(__dirname, '..', cleanHref);
    targetExists = fs.existsSync(resolvedPath);
    status = targetExists ? 'EXISTS' : 'NOT FOUND (404)';
  }
  console.log(`href: "${href}" -> ${status} (Texts: "${texts.slice(0, 2).join('", "')}")`);
}
