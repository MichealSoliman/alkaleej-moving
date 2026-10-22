const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'areas', 'riyadh-to-makkah', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== TEST REPORT FOR RIYADH TO MAKKAH PAGE ===\n');

// 1. Check title, meta description, canonical, robots
const titleMatch = content.match(/<title>(.*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'MISSING');

const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/s);
console.log('Description:', descMatch ? descMatch[1].replace(/\s+/g, ' ').trim() : 'MISSING');

const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/);
console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'MISSING');

// 2. Check headings
const h1s = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log(`\nH1 count: ${h1s.length}`);
h1s.forEach(h => console.log('  H1 text:', h.replace(/<[^>]+>/g, '').trim()));

const h2s = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
console.log(`\nH2 count: ${h2s.length}`);
h2s.forEach((h, i) => console.log(`  H2 #${i+1}:`, h.replace(/<[^>]+>/g, '').trim()));

const h3s = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
console.log(`\nH3 count: ${h3s.length}`);

// 3. Check JSON-LD
const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
  try {
    const json = JSON.parse(schemaMatch[1]);
    console.log('\nJSON-LD valid! Graph types:', json['@graph'].map(item => item['@type']));
    const faq = json['@graph'].find(item => item['@type'] === 'FAQPage');
    if (faq) {
      console.log(`FAQ questions count in Schema: ${faq.mainEntity.length}`);
    }
  } catch (e) {
    console.error('JSON-LD PARSE ERROR:', e.message);
  }
} else {
  console.log('JSON-LD MISSING');
}

// 4. Word count
const textOnly = content
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .trim();
const words = textOnly.split(/\s+/).filter(w => w.length > 0);
console.log(`\nTotal Arabic words in page: ${words.length}`);

// 5. Check images existence
const imgMatches = content.match(/<img[^>]+src="([^">]+)"/gi) || [];
console.log(`\nImages found: ${imgMatches.length}`);
imgMatches.forEach(img => {
  const src = img.match(/src="([^">]+)"/)[1];
  const resolved = path.resolve(path.dirname(filePath), src);
  const exists = fs.existsSync(resolved);
  console.log(`  Img: ${src} -> exists? ${exists}`);
});

// 6. Check internal links & assets
const linkMatches = content.match(/href="([^">#]+)"/gi) || [];
console.log(`\nInternal/External links verification:`);
const uniqueLinks = [...new Set(linkMatches.map(l => l.match(/href="([^">]+)"/)[1]))];
uniqueLinks.forEach(l => {
  if (l.startsWith('tel:') || l.startsWith('https://wa.me')) {
    console.log(`  Contact Link: ${l}`);
  } else if (l.startsWith('http')) {
    console.log(`  External Link: ${l}`);
  } else if (l.startsWith('../../')) {
    const resolved = path.resolve(path.dirname(filePath), l);
    console.log(`  Asset: ${l} -> exists? ${fs.existsSync(resolved)}`);
  } else if (l.startsWith('/')) {
    const rootPath = path.join(__dirname, '..', l);
    const exists = fs.existsSync(rootPath);
    console.log(`  Internal Link: ${l} -> exists in root? ${exists}`);
  }
});

// 7. Check Sidebar Navigation Items match IDs
const navHrefs = [...content.matchAll(/<a\s+[^>]*href="#([^"]+)"[^>]*class="[^"]*nav-item[^"]*"/g)].map(m => m[1]);
console.log(`\nSidebar navigation links count: ${navHrefs.length}`);
navHrefs.forEach(id => {
  const hasId = content.includes(`id="${id}"`);
  console.log(`  Anchor #${id} exists in page? ${hasId}`);
});

// 8. Check FAQ HTML vs Schema match
const faqQuestions = [...content.matchAll(/<button class="faq-toggle[^>]*>\s*<span>(.*?)<\/span>/g)].map(m => m[1]);
console.log(`\nFAQ rendered buttons in HTML: ${faqQuestions.length}`);
const schemaObj = JSON.parse(schemaMatch[1]);
const faqEntity = schemaObj['@graph'].find(x => x['@type'] === 'FAQPage');
let matchCount = 0;
faqEntity.mainEntity.forEach((item, idx) => {
  const renderedQ = faqQuestions[idx];
  if (renderedQ && renderedQ.includes(item.name.replace(/^\d+\.\s*/, ''))) {
    matchCount++;
  }
});
console.log(`FAQ questions matching between Schema and HTML: ${matchCount}/${faqQuestions.length}`);

// 9. Tag balance
const openDivs = (content.match(/<div\b/g) || []).length;
const closeDivs = (content.match(/<\/div>/g) || []).length;
console.log(`\n<div> balance: ${openDivs} opened, ${closeDivs} closed (Diff: ${openDivs - closeDivs})`);

const openSections = (content.match(/<section\b/g) || []).length;
const closeSections = (content.match(/<\/section>/g) || []).length;
console.log(`<section> balance: ${openSections} opened, ${closeSections} closed (Diff: ${openSections - closeSections})`);

// 10. Check empty hrefs
const emptyHrefs = [...content.matchAll(/href="(#|)"/g)];
console.log(`Empty/dummy href="#" count: ${emptyHrefs.length}`);
