const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Extract all JSON-LD blocks
const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
let schemaQuestions = [];
jsonLdMatches.forEach(m => {
  try {
    const parsed = JSON.parse(m[1]);
    const items = parsed['@graph'] || [parsed];
    const faqItem = items.find(x => x['@type'] === 'FAQPage');
    if (faqItem && faqItem.mainEntity) {
      schemaQuestions = faqItem.mainEntity.map(q => q.name.trim());
    }
  } catch(e) {}
});

// Extract HTML FAQ questions
const htmlQuestions = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<span/gi)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

console.log('Schema questions count:', schemaQuestions.length);
console.log('HTML questions count:', htmlQuestions.length);

console.log('\n--- Comparing Questions ---');
schemaQuestions.forEach((sq, i) => {
  const hq = htmlQuestions[i] || 'MISSING IN HTML';
  const match = sq === hq.replace(/^\d+\.\s*/, '');
  console.log(`Q${i+1}: Schema="${sq}" | HTML="${hq}" | Match=${match}`);
});
