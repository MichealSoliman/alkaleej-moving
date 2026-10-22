const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const detailsMatches = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)];

console.log(`Found ${detailsMatches.length} details items:\n`);
detailsMatches.forEach((m, i) => {
  const content = m[1];
  const summaryM = content.match(/<summary[^>]*>([\s\S]*?)<span/i);
  const qText = summaryM ? summaryM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'NO SUMMARY';
  
  const divM = content.match(/<div class="px-5 pb-5[^>]*>([\s\S]*?)<\/div>/i);
  const aText = divM ? divM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'NO ANSWER';

  console.log(`Item #${i + 1}:`);
  console.log(`  Q: ${qText}`);
  console.log(`  A: ${aText.slice(0, 100)}...`);
});
