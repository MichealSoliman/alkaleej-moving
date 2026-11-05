const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

// Check each neighborhood
console.log('Total dirs:', dirs.length);

const reports = [];

dirs.forEach(d => {
  const file = path.join(areasDir, d, 'index.html');
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');

  // Title
  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  // Meta description
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  // Canonical
  const canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1] || '';
  // H1
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  // Schemas
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

  // Extract paragraphs
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(p => p.length > 30);

  reports.push({
    dir: d,
    title: title.trim(),
    desc: desc.trim(),
    canonical: canonical.trim(),
    h1: h1.replace(/\s+/g, ' ').trim(),
    pCount: paragraphs.length,
    sampleP: paragraphs.slice(0, 2),
    schemasCount: schemas.length
  });
});

console.log(JSON.stringify(reports, null, 2));

