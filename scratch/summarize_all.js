const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const pageSummaries = dirs.map(d => {
  const file = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  const canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1] || '';
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gis)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

  return {
    dir: d,
    title: title.trim(),
    desc: desc.trim(),
    canonical: canonical.trim(),
    h1,
    h2s
  };
});

fs.writeFileSync(path.join(__dirname, 'all_areas_summary.json'), JSON.stringify(pageSummaries, null, 2), 'utf8');
console.log('Saved all_areas_summary.json. Items:', pageSummaries.length);
pageSummaries.forEach(p => {
  console.log(`\n=== [${p.dir}] ===`);
  console.log(`Title: ${p.title}`);
  console.log(`Desc: ${p.desc}`);
  console.log(`H1: ${p.h1}`);
  console.log(`H2s (${p.h2s.length}):`, p.h2s.slice(0, 8));
});

