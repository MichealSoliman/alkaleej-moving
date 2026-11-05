const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const pageData = {};

dirs.forEach(d => {
  const file = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  // get title
  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  // get description
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  // get h1
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();

  // get all paragraphs > 50 chars
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 50);

  // check mentions of wrong directions or odd strings
  const text = html.replace(/<[^>]+>/g, ' ');

  pageData[d] = {
    title,
    desc,
    h1,
    pCount: paragraphs.length,
    paragraphs,
    text
  };
});

// Check duplicate paragraphs across different pages
const pMap = {};
for (const [dir, data] of Object.entries(pageData)) {
  data.paragraphs.forEach(p => {
    // normalize by removing neighborhood name
    const normalized = p.replace(/حي\s+[^\s,.]+/g, 'حي X')
                        .replace(/الرياض/g, 'Y')
                        .slice(0, 80);
    if (!pMap[normalized]) pMap[normalized] = [];
    pMap[normalized].push(dir);
  });
}

const highlyDuplicated = Object.entries(pMap).filter(([k, v]) => v.length >= 5);
console.log('Number of boilerplate paragraphs duplicated across 5+ area pages:', highlyDuplicated.length);

highlyDuplicated.slice(0, 10).forEach(([k, v]) => {
  console.log(`\nText snippet: "${k}..."`);
  console.log(`Used in ${v.length} pages:`, v);
});

