const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(filePath, 'utf8');

console.log('=== FULL AUDIT OF INDEX.HTML ===\n');

// 1. Meta / Head
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1].trim() : 'MISSING');
console.log('Title Length:', titleMatch ? titleMatch[1].trim().length : 0);

const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i);
console.log('Description:', descMatch ? descMatch[1].trim() : 'MISSING');
console.log('Description Length:', descMatch ? descMatch[1].trim().length : 0);

const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"/i);
console.log('Canonical:', canonicalMatch ? canonicalMatch[1].trim() : 'MISSING');

const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([\s\S]*?)"/i);
console.log('Robots:', robotsMatch ? robotsMatch[1].trim() : 'MISSING');

// 2. Headings Analysis
const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('\nH1 Count:', h1s.length);
h1s.forEach((h, i) => console.log(`  H1 #${i+1}: ${h}`));

const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('\nH2 Count:', h2s.length);
h2s.forEach((h, i) => console.log(`  H2 #${i+1}: ${h}`));

const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('\nH3 Count:', h3s.length);

const h4s = [...html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('H4 Count:', h4s.length);

// 3. Duplicate IDs
const idMatches = [...html.matchAll(/\bid="([^"]+)"/gi)].map(m => m[1]);
const idCounts = {};
idMatches.forEach(id => { idCounts[id] = (idCounts[id] || 0) + 1; });
const duplicateIds = Object.entries(idCounts).filter(([id, count]) => count > 1);
console.log('\nDuplicate IDs:', duplicateIds);

// 4. Images audit
const imgTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
console.log('\nTotal <img> tags:', imgTags.length);
let missingAlt = 0;
let missingWidthHeight = 0;
let brokenImgPaths = [];
imgTags.forEach((m, idx) => {
  const attrs = m[1];
  const srcM = attrs.match(/src="([^"]+)"/i);
  const altM = attrs.match(/alt="([^"]*)"/i);
  const widthM = attrs.match(/width="([^"]+)"/i);
  const heightM = attrs.match(/height="([^"]+)"/i);
  const loadingM = attrs.match(/loading="([^"]+)"/i);
  const priorityM = attrs.match(/fetchpriority="([^"]+)"/i);

  if (!altM || !altM[1].trim()) missingAlt++;
  if (!widthM || !heightM) missingWidthHeight++;

  if (srcM) {
    const src = srcM[1];
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      const cleanSrc = src.startsWith('/') ? src.substring(1) : src.replace(/^\.\//, '');
      const absPath = path.join(__dirname, '..', cleanSrc);
      if (!fs.existsSync(absPath)) {
        brokenImgPaths.push({ index: idx + 1, src, absPath });
      }
    }
  }
});
console.log('Images missing alt:', missingAlt);
console.log('Images missing width or height:', missingWidthHeight);
console.log('Broken image paths:', brokenImgPaths);

// 5. Links audit
const linkTags = [...html.matchAll(/<a\b([^>]*)>/gi)];
console.log('\nTotal <a> tags:', linkTags.length);
let brokenInternalLinks = [];
let emptyHrefs = [];
let relativeNavLinks = [];
linkTags.forEach((m, idx) => {
  const attrs = m[1];
  const hrefM = attrs.match(/href="([^"]*)"/i);
  if (!hrefM || hrefM[1] === '#' || hrefM[1] === '') {
    emptyHrefs.push({ index: idx + 1, tag: m[0] });
  } else {
    const href = hrefM[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Internal URL
      const cleanHref = href.split('?')[0].split('#')[0];
      const targetPath = path.join(__dirname, '..', cleanHref.endsWith('/') ? cleanHref + 'index.html' : cleanHref);
      const isDir = fs.existsSync(path.join(__dirname, '..', cleanHref)) && fs.statSync(path.join(__dirname, '..', cleanHref)).isDirectory();
      const isFile = fs.existsSync(targetPath);
      if (!isDir && !isFile) {
        brokenInternalLinks.push({ href, cleanHref, tag: m[0].substring(0, 100) });
      }
    }
  }
});
console.log('Empty / dummy href="#" count:', emptyHrefs.length);
console.log('Broken internal links count:', brokenInternalLinks.length);
if (brokenInternalLinks.length > 0) {
  console.log('Broken internal links details:', brokenInternalLinks);
}

// 6. JSON-LD Schemas
const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
console.log('\nJSON-LD blocks count:', jsonLdMatches.length);
jsonLdMatches.forEach((m, i) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Block #${i+1} parse: SUCCESS`);
    if (parsed['@graph']) {
      console.log(`  Graph types:`, parsed['@graph'].map(x => x['@type']));
    } else {
      console.log(`  Type:`, parsed['@type']);
    }
  } catch(e) {
    console.log(`Block #${i+1} parse: FAILED ->`, e.message);
  }
});

// 7. Word count & keyword density
const cleanText = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const words = cleanText.split(/\s+/).filter(w => w.length > 0);
console.log('\nTotal words in page:', words.length);

const keywordCheck = [
  'نقل عفش بالرياض',
  'نقل عفش الرياض',
  'شركة نقل عفش بالرياض',
  'شركة نقل عفش الرياض',
  'نقل اثاث بالرياض',
  'نقل أثاث بالرياض',
  'دينا نقل عفش بالرياض',
  'دينا نقل عفش',
  'تغليف الاثاث',
  'تغليف الأثاث',
  'فك وتركيب'
];
console.log('\nKeyword occurrences:');
keywordCheck.forEach(kw => {
  const regex = new RegExp(kw, 'gi');
  const count = (html.match(regex) || []).length;
  console.log(`  "${kw}": ${count}`);
});
