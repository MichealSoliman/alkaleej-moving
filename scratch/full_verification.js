const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());
// Also include areas/index.html
const allFiles = [...dirs.map(d => ({ name: d, file: path.join(areasDir, d, 'index.html'), isSub: true })),
                  { name: 'areas/index.html', file: path.join(areasDir, 'index.html'), isSub: false }];

console.log(`Auditing all ${allFiles.length} files...`);

const report = [];

allFiles.forEach(({ name, file, isSub }) => {
  const html = fs.readFileSync(file, 'utf8');

  // Title
  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  const phoneInTitle = /050\d+/.test(title);

  // Meta description
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  const phoneInDesc = /050\d+/.test(desc);
  const genericTemplateDesc = desc.includes('تقدم خدمات فك وتركيب وتغليف ونقل الأثاث والمكاتب والفلل والشقق');

  // Canonical
  const canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1] || '';
  const expectedCanonical = isSub ? `https://alkaleej-moving.com/areas/${name}/` : `https://alkaleej-moving.com/areas/`;
  const canonicalMatch = canonical === expectedCanonical;

  // H1
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

  // Schemas
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  let schemaErrors = [];
  let schemaTypes = [];
  schemas.forEach((s, idx) => {
    try {
      const parsed = JSON.parse(s);
      if (parsed['@graph']) {
        parsed['@graph'].forEach(g => schemaTypes.push(g['@type']));
      } else {
        schemaTypes.push(parsed['@type']);
      }
    } catch (e) {
      schemaErrors.push(`Schema ${idx}: ${e.message}`);
    }
  });

  // HTML Tag Balance
  const openDivs = (html.match(/<div\b/gi) || []).length;
  const closeDivs = (html.match(/<\/div>/gi) || []).length;
  const openSections = (html.match(/<section\b/gi) || []).length;
  const closeSections = (html.match(/<\/section>/gi) || []).length;

  report.push({
    name,
    title: title.trim(),
    phoneInTitle,
    descLen: desc.length,
    phoneInDesc,
    genericTemplateDesc,
    canonicalMatch,
    canonical,
    h1,
    schemaTypes: [...new Set(schemaTypes)],
    schemaErrors,
    hasBreadcrumb: schemaTypes.includes('BreadcrumbList'),
    hasFAQ: schemaTypes.includes('FAQPage') || !isSub, // hub page has no FAQ accordion
    tagBalanceDiff: (openDivs - closeDivs) + (openSections - closeSections),
    fileSize: html.length
  });
});

console.log(JSON.stringify(report, null, 2));

const failed = report.filter(r => 
  r.phoneInTitle || 
  r.genericTemplateDesc || 
  !r.canonicalMatch || 
  r.schemaErrors.length > 0 || 
  !r.hasBreadcrumb || 
  r.tagBalanceDiff !== 0
);

console.log(`\n================ AUDIT SUMMARY ================`);
console.log(`Total audited: ${report.length}`);
console.log(`Failed checks: ${failed.length}`);
if (failed.length > 0) {
  console.log('Issues found in:');
  failed.forEach(f => console.log(`- ${f.name}: phoneInTitle=${f.phoneInTitle}, genericDesc=${f.genericTemplateDesc}, canonMatch=${f.canonicalMatch}, schemaErr=${f.schemaErrors.length}, breadcrumb=${f.hasBreadcrumb}, tagDiff=${f.tagBalanceDiff}`));
} else {
  console.log('ALL 22 PAGES PASSED 100% OF AUDIT CHECKS WITH ZERO ERRORS!');
}

