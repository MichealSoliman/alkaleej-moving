const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'areas', 'riyadh-to-qassim', 'index.html');
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== TEST REPORT FOR RIYADH TO QASSIM PAGE ===');

// 1. Check title, meta description, canonical, robots
const titleMatch = content.match(/<title>(.*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'MISSING');

const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/s);
console.log('Description:', descMatch ? descMatch[1].replace(/\s+/g, ' ').trim() : 'MISSING');

const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(.*?)"/);
console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'MISSING');

// 2. Check headings
const h1s = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log(`H1 count: ${h1s.length}`);
h1s.forEach(h => console.log('  H1 text:', h.replace(/<[^>]+>/g, '').trim()));

const h2s = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
console.log(`H2 count: ${h2s.length}`);
h2s.forEach(h => console.log('  H2:', h.replace(/<[^>]+>/g, '').trim()));

const h3s = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
console.log(`H3 count: ${h3s.length}`);

// 3. Check JSON-LD
const schemaMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
  try {
    const json = JSON.parse(schemaMatch[1]);
    console.log('JSON-LD valid! Graph types:', json['@graph'].map(item => item['@type']));
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

// 4. Word count (Arabic words)
const textOnly = content
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .trim();
const words = textOnly.split(/\s+/).filter(w => w.length > 0);
console.log(`Total words: ${words.length}`);

// 5. Check images existence
const imgMatches = content.match(/<img[^>]+src="([^">]+)"/gi) || [];
console.log(`Images found: ${imgMatches.length}`);
imgMatches.forEach(img => {
  const src = img.match(/src="([^">]+)"/)[1];
  const resolved = path.resolve(path.dirname(filePath), src);
  const exists = fs.existsSync(resolved);
  console.log(`  Img: ${src} -> exists? ${exists}`);
});

// 6. Check internal links
const linkMatches = content.match(/href="([^">#]+)"/gi) || [];
console.log(`Internal/External links found:`);
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
