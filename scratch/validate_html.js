const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('=== HTML VALIDATION CHECKS ===');

// Check H1
const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
console.log(`H1 count: ${h1Matches.length}`);
h1Matches.forEach((m, i) => console.log(`  H1 #${i+1}: ${m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}`));

// Check section count and tags
const openSections = (html.match(/<section\b/gi) || []).length;
const closeSections = (html.match(/<\/section>/gi) || []).length;
console.log(`\nOpen <section> count: ${openSections}`);
console.log(`Close </section> count: ${closeSections}`);
if (openSections !== closeSections) {
  console.log('ERROR: Mismatched section tags!');
} else {
  console.log('SUCCESS: Section tags balanced perfectly.');
}

// Check details count and tags
const openDetails = (html.match(/<details\b/gi) || []).length;
const closeDetails = (html.match(/<\/details>/gi) || []).length;
console.log(`\nOpen <details> count: ${openDetails}`);
console.log(`Close </details> count: ${closeDetails}`);
if (openDetails !== closeDetails) {
  console.log('ERROR: Mismatched details tags!');
} else {
  console.log('SUCCESS: Details tags balanced perfectly.');
}

// Check tables
const openTables = (html.match(/<table\b/gi) || []).length;
const closeTables = (html.match(/<\/table>/gi) || []).length;
console.log(`\nOpen <table> count: ${openTables}`);
console.log(`Close </table> count: ${closeTables}`);

// Check div tags balance roughly
const openDivs = (html.match(/<div\b/gi) || []).length;
const closeDivs = (html.match(/<\/div>/gi) || []).length;
console.log(`\nOpen <div> count: ${openDivs}`);
console.log(`Close </div> count: ${closeDivs}`);

// Check schema
const jsonLdMatches = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
console.log(`\nJSON-LD blocks: ${jsonLdMatches.length}`);
jsonLdMatches.forEach((m, i) => {
  try {
    JSON.parse(m[1]);
    console.log(`  Block #${i+1}: VALID JSON`);
  } catch(e) {
    console.log(`  Block #${i+1}: INVALID JSON -> ${e.message}`);
  }
});
