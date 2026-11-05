const fs = require('fs');
const html = fs.readFileSync('areas/hayu-aleaqiq/index.html', 'utf8');

// print lines between <main and </main>
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  console.log('Main tag length:', mainMatch[1].length);
  // find all section tags inside main
  const sections = [...mainMatch[1].matchAll(/<section\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi)];
  console.log('Total sections in main:', sections.length);
  sections.forEach((s, idx) => {
    const id = s[1];
    const h2 = (s[2].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '';
    console.log(`${idx + 1}. #${id} -> H2: ${h2.replace(/<[^>]+>/g, '').trim()}`);
  });
}

