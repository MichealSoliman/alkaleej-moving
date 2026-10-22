const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(filePath, 'utf8');

// Match sections
const sectionMatches = [...html.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gi)];

console.log(`Total sections found: ${sectionMatches.length}\n`);

sectionMatches.slice(0, 6).forEach((match, index) => {
  const attrs = match[1];
  const content = match[2];
  
  const idMatch = attrs.match(/id="([^"]+)"/i);
  const sectionId = idMatch ? idMatch[1] : 'no-id';

  // find h2 in this section
  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  const h3Matches = [...content.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

  // stripped text
  const cleanText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;

  console.log(`--- Section #${index + 1} [id="${sectionId}"] | Words: ${wordCount} ---`);
  if (h2Matches.length > 0) {
    console.log(`  H2: ${h2Matches.join(' | ')}`);
  } else {
    console.log(`  H2: [NONE]`);
  }
  if (h3Matches.length > 0) {
    console.log(`  H3s (${h3Matches.length}): ${h3Matches.slice(0, 4).join(' | ')}${h3Matches.length > 4 ? ' ...' : ''}`);
  }
  // Show a preview of the text
  console.log(`  Text preview: ${cleanText.slice(0, 180)}...\n`);
});
