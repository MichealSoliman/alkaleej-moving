const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');

// let's see sections
const sections = [...html.matchAll(/<section[^>]*>([\s\S]*?)<\/section>/gis)].map(m => {
  const h2 = (m[1].match(/<h2[^>]*>(.*?)<\/h2>/is) || [])[1] || '';
  const textSample = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  return { h2: h2.replace(/<[^>]+>/g, '').trim(), textSample };
});

console.log('Sections in hayu-aleaqiq:');
sections.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.h2}] -> ${s.textSample}`);
});

