const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'areas', 'riyadh-to-qassim', 'index.html');
const html = fs.readFileSync(filePath, 'utf8');

console.log('--- HTML & NAVIGATION INTEGRITY CHECK ---');

// Check that every nav link in sidebar matches an ID in the document
const navHrefs = [...html.matchAll(/<a\s+[^>]*href="#([^"]+)"[^>]*class="[^"]*nav-item[^"]*"/g)].map(m => m[1]);
console.log(`Sidebar navigation links count: ${navHrefs.length}`);
navHrefs.forEach(id => {
  const hasId = html.includes(`id="${id}"`);
  console.log(`  Anchor #${id} exists in page? ${hasId}`);
});

// Check that all 14 FAQ buttons exist and have content
const faqQuestions = [...html.matchAll(/<button class="faq-toggle[^>]*>\s*<span>(.*?)<\/span>/g)].map(m => m[1]);
console.log(`\nFAQ rendered buttons count: ${faqQuestions.length}`);
faqQuestions.forEach((q, i) => console.log(`  ${i + 1}. ${q}`));

// Verify schema FAQs match HTML FAQs
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const schema = JSON.parse(schemaMatch[1]);
const faqSchema = schema['@graph'].find(x => x['@type'] === 'FAQPage');
console.log(`\nFAQ schema count: ${faqSchema.mainEntity.length}`);
let matchCount = 0;
faqSchema.mainEntity.forEach((item, idx) => {
  const renderedQ = faqQuestions[idx];
  if (renderedQ && renderedQ.includes(item.name.replace(/^\d+\.\s*/, ''))) {
    matchCount++;
  }
});
console.log(`FAQ questions matching between Schema and HTML: ${matchCount}/${faqQuestions.length}`);

// Check mobile viewport and meta
console.log('\nViewport meta tag:', html.includes('name="viewport" content="width=device-width, initial-scale=1.0"'));
console.log('RTL dir set:', html.includes('dir="rtl"'));
console.log('Arabic lang set:', html.includes('lang="ar"'));

// Check for broken links (empty href or href="#")
const emptyHrefs = [...html.matchAll(/href="(#|)"/g)];
console.log(`Empty or dummy href="#" count: ${emptyHrefs.length}`);

// Check for unclosed divs or basic balance
const openDivs = (html.match(/<div\b/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;
console.log(`<div> tags balance: ${openDivs} opened, ${closeDivs} closed (Diff: ${openDivs - closeDivs})`);

const openSections = (html.match(/<section\b/g) || []).length;
const closeSections = (html.match(/<\/section>/g) || []).length;
console.log(`<section> tags balance: ${openSections} opened, ${closeSections} closed (Diff: ${openSections - closeSections})`);
