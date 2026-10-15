const fs = require('fs');

const filesToInspect = [
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
  'ikea-furniture-assembly-in-riyadh/index.html',
  'services/index.html'
];

filesToInspect.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  console.log(`=== ${f} ===`);
  lines.forEach((l, idx) => {
    if (l.includes('furniture-moving-within-riyadh')) {
      console.log(`Line ${idx + 1}: ${l.trim().substring(0, 160)}`);
    }
  });
});
