const fs = require('fs');

const files = [
  'areas/hayu-alearid/index.html',
  'areas/hayu-aleulya/index.html',
  'areas/hayu-alkhalij/index.html',
  'areas/hayu-almalqa/index.html',
  'areas/hayu-alnarjis/index.html',
  'areas/hayu-alqayrawan/index.html',
  'areas/hayu-alrimal/index.html',
  'areas/hayu-hatayn/index.html',
  'areas/hayu-ishbiliya/index.html',
  'areas/riyadh-to-jeddah/index.html',
  'blogs/best-ways-to-pack-furniture/index.html',
  'blogs/furniture-packing-materials/index.html',
  'blogs/how-to-choose-a-reliable-moving-company-in-riyadh/index.html',
  'blogs/how-to-protect-your-furniture-during-transport/index.html',
  'blogs/mistakes-when-moving-furniture/index.html',
  'blogs/professional-vs-regular-moving/index.html',
  'blogs/riyadh-neighborhoods-guide-for-furniture-moving/index.html',
  'blogs/the-best-time-to-move-furniture-in-riyadh/index.html',
  'blogs/tips-before-moving-furniture/index.html',
  'ikea-furniture-assembly-in-riyadh/index.html',
  'services/villa-furniture-moving-in-riyadh/index.html'
];

let totalReplacements = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // 1. https://alkaleej-moving.com/blogs/cheapest-furniture-moving-company-in-riyadh/
  const p1 = 'https://alkaleej-moving.com/blogs/cheapest-furniture-moving-company-in-riyadh/';
  // 2. /blogs/cheapest-furniture-moving-company-in-riyadh/
  const p2 = '/blogs/cheapest-furniture-moving-company-in-riyadh/';

  [p1, p2].forEach(p => {
    let count = content.split(p).length - 1;
    if (count > 0) {
      content = content.replaceAll(p, '/cheap-furniture-moving-riyadh/');
      totalReplacements += count;
    }
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
  }
});

console.log(`Finished Task 2: total link replacements = ${totalReplacements}`);
