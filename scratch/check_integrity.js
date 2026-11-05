const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const report = [];

dirs.forEach(d => {
  const filePath = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  // Check canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;
  const expectedCanonical = `https://alkaleej-moving.com/areas/${d}/`;

  // Check open/close tags balance
  const openDivs = (html.match(/<div\b/gi) || []).length;
  const closeDivs = (html.match(/<\/div>/gi) || []).length;
  const openSections = (html.match(/<section\b/gi) || []).length;
  const closeSections = (html.match(/<\/section>/gi) || []).length;

  // Check CSS and JS assets
  const assets = [...html.matchAll(/(?:href|src)=["']([^"']+\.(?:css|js|webp|png|jpg|ico))["']/gi)].map(m => m[1]);
  const missingAssets = [];
  assets.forEach(a => {
    if (a.startsWith('http://') || a.startsWith('https://')) return;
    let localPath = a.startsWith('/') ? path.join(__dirname, '..', a) : path.join(areasDir, d, a);
    if (!fs.existsSync(localPath)) {
      missingAssets.push(a);
    }
  });

  report.push({
    dir: d,
    canonicalMatches: canonical === expectedCanonical,
    canonical,
    divDiff: openDivs - closeDivs,
    sectionDiff: openSections - closeSections,
    missingAssets: [...new Set(missingAssets)]
  });
});

console.log(JSON.stringify(report, null, 2));

