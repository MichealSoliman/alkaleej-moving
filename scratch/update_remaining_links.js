const fs = require('fs');

const files = [
  'areas/hayu-alearid/index.html',
  'areas/hayu-alkhalij/index.html',
  'areas/hayu-almalqa/index.html',
  'areas/hayu-alnarjis/index.html',
  'areas/hayu-alrimal/index.html',
  'areas/hayu-alsahafa/index.html',
  'areas/hayu-hatayn/index.html',
  'areas/hayu-ishbiliya/index.html',
  'blogs/best-ways-to-pack-furniture/index.html',
  'crane-furniture-lifting-riyadh/index.html',
  'furniture-packing-in-riyadh/index.html',
  'ikea-furniture-assembly-in-riyadh/index.html'
];

let totalChanges = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Pattern 1: https://alkaleej-moving.com/services/furniture-moving-within-riyadh/
  content = content.replaceAll(
    'https://alkaleej-moving.com/services/furniture-moving-within-riyadh/',
    '/best-furniture-moving-company-riyadh/'
  );

  // Pattern 2: ../services/furniture-moving-within-riyadh/
  content = content.replaceAll(
    '../services/furniture-moving-within-riyadh/',
    '/best-furniture-moving-company-riyadh/'
  );

  // Pattern 3: ./services/furniture-moving-within-riyadh/
  content = content.replaceAll(
    './services/furniture-moving-within-riyadh/',
    '/best-furniture-moving-company-riyadh/'
  );

  // Pattern 4: /services/furniture-moving-within-riyadh/
  content = content.replaceAll(
    '/services/furniture-moving-within-riyadh/',
    '/best-furniture-moving-company-riyadh/'
  );

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
    totalChanges++;
  }
});

console.log(`Total files updated: ${totalChanges}`);
