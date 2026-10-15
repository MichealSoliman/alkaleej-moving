const fs = require('fs');
const content = fs.readFileSync('areas/hayu-almalqa/index.html', 'utf8');
const schemas = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
schemas.forEach((s, idx) => {
  console.log(`=== Schema ${idx + 1} ===`);
  console.log(s);
});

// Also check breadcrumb in HTML
const bc = content.match(/<nav[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/gi) || [];
bc.forEach((b, idx) => {
  console.log(`=== Breadcrumb HTML ${idx + 1} ===`);
  console.log(b);
});
