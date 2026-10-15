const fs = require('fs');

const files = [
  'areas/hayu-alearid/index.html',
  'areas/hayu-alkhalij/index.html',
  'areas/hayu-almalqa/index.html',
  'areas/hayu-alnarjis/index.html',
  'areas/hayu-alqayrawan/index.html',
  'areas/hayu-alrimal/index.html',
  'areas/hayu-alsahafa/index.html',
  'areas/hayu-hatayn/index.html',
  'areas/hayu-ishbiliya/index.html',
  'areas/riyadh-to-jeddah/index.html',
  'blogs/professional-vs-regular-moving/index.html',
  'east-riyadh-moving/index.html',
  'furniture-storage-in-riyadh/index.html',
  'index.html',
  'office-transportation-in-riyadh/index.html',
  'services/villa-furniture-moving-in-riyadh/index.html',
  'warehouse-relocation-in-riyadh/index.html',
  'west-riyadh-moving/index.html'
];

let totalReplacements = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // We only replace inside href="..."
  // 1. https://alkaleej-moving.com/services/bedroom-disassembly-installation/
  const p1 = 'https://alkaleej-moving.com/services/bedroom-disassembly-installation/';
  // 2. ../../services/bedroom-disassembly-installation/
  const p2 = '../../services/bedroom-disassembly-installation/';
  // 3. ../services/bedroom-disassembly-installation/
  const p3 = '../services/bedroom-disassembly-installation/';
  // 4. ./services/bedroom-disassembly-installation/
  const p4 = './services/bedroom-disassembly-installation/';
  // 5. /services/bedroom-disassembly-installation/
  const p5 = '/services/bedroom-disassembly-installation/';

  [p1, p2, p3, p4, p5].forEach(p => {
    let count = content.split(p).length - 1;
    if (count > 0) {
      content = content.replaceAll(p, '/furniture-disassembly-assembly-riyadh/');
      totalReplacements += count;
    }
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
  }
});

console.log(`Finished Task 1: total link replacements = ${totalReplacements}`);
