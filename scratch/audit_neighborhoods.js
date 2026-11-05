const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const items = fs.readdirSync(areasDir);

const results = [];

items.forEach(item => {
  const fullPath = path.join(areasDir, item);
  const isDir = fs.statSync(fullPath).isDirectory();
  const file = isDir ? path.join(fullPath, 'index.html') : (item === 'index.html' ? fullPath : null);
  if (!file || !fs.existsSync(file)) return;

  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/is);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is);
  const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const schemas = [...content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

  // check FAQ schema
  let hasFAQ = false;
  let hasLocalBusiness = false;
  let hasBreadcrumb = false;
  let jsonErrors = [];

  schemas.forEach((s, idx) => {
    try {
      const parsed = JSON.parse(s);
      const type = parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown');
      if (JSON.stringify(parsed).includes('FAQPage')) hasFAQ = true;
      if (JSON.stringify(parsed).includes('LocalBusiness') || JSON.stringify(parsed).includes('MovingCompany')) hasLocalBusiness = true;
      if (JSON.stringify(parsed).includes('BreadcrumbList')) hasBreadcrumb = true;
    } catch (e) {
      jsonErrors.push(`Schema ${idx}: ${e.message}`);
    }
  });

  // Body text word count approximation
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const wordCount = bodyText.split(/\s+/).length;

  results.push({
    name: item,
    isDir,
    title: titleMatch ? titleMatch[1].trim() : 'MISSING',
    desc: descMatch ? descMatch[1].trim() : 'MISSING',
    canonical: canonicalMatch ? canonicalMatch[1].trim() : 'MISSING',
    h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'MISSING',
    h2Count: h2Matches.length,
    h2Sample: h2Matches.slice(0, 5),
    schemaCount: schemas.length,
    hasFAQ,
    hasLocalBusiness,
    hasBreadcrumb,
    jsonErrors,
    wordCount,
    contentLength: content.length
  });
});

console.log(JSON.stringify(results, null, 2));

