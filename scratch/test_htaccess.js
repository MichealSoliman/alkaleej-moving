const fs = require('fs');

const redirects = [
  { from: '/blogs/furniture-assembly-carpenter-riyadh/', to: 'https://alkaleej-moving.com/blogs/best-furniture-carpenter-in-riyadh/' },
  { from: '/blogs/cheapest-furniture-moving-company-in-riyadh/', to: 'https://alkaleej-moving.com/cheap-furniture-moving-riyadh/' },
  { from: '/services/bedroom-disassembly-installation/', to: 'https://alkaleej-moving.com/furniture-disassembly-assembly-riyadh/' },
  { from: '/services/furniture-moving-within-riyadh/', to: 'https://alkaleej-moving.com/best-furniture-moving-company-riyadh/' },
  { from: '/blogs/اسعار-نقل-العفش-في-الرياض/', to: 'https://alkaleej-moving.com/prices/' },
  { from: '/blogs/%D8%A7%D8%B3%D8%B9%D8%A7%D8%B1-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%B9%D9%81%D8%B4-%D9%81%D9%8A-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/', to: 'https://alkaleej-moving.com/prices/' },
  { from: '/blogs/furniture-moving-prices-in-riyadh/', to: 'https://alkaleej-moving.com/prices/' },
  { from: '/blogs/furniture-moving-prices-riyadh-2026/', to: 'https://alkaleej-moving.com/prices/' },
  { from: '/areas/south-riyadh/', to: 'https://alkaleej-moving.com/areas/' },
  { from: '/areas/east-riyadh/', to: 'https://alkaleej-moving.com/east-riyadh-moving/' },
  { from: '/blog/protect-the-furniture-during-transport/', to: 'https://alkaleej-moving.com/blogs/how-to-protect-your-furniture-during-transport/' },
  { from: '/warehouse-transportation-in-riyadh/', to: 'https://alkaleej-moving.com/warehouse-relocation-in-riyadh/' },
  { from: '/areas/hayu-almalaqa/', to: 'https://alkaleej-moving.com/areas/hayu-almalqa/' },
  { from: '/blogs/blogs/', to: 'https://alkaleej-moving.com/blogs/' },
  { from: '/areas/blogs/', to: 'https://alkaleej-moving.com/blogs/' },
  { from: '/articles/', to: 'https://alkaleej-moving.com/blogs/' },
  { from: '/areas/about/', to: 'https://alkaleej-moving.com/about/' }
];

console.log('Testing target destinations for 200 OK existence:');
redirects.forEach(r => {
  const targetPath = r.to.replace('https://alkaleej-moving.com/', '');
  let localFile = targetPath === '' ? 'index.html' : targetPath.replace(/\/$/, '') + '/index.html';
  if (!fs.existsSync(localFile)) {
    localFile = targetPath.replace(/\/$/, '') + '.html';
  }
  const exists = fs.existsSync(localFile);
  console.log(`- ${r.from} -> ${r.to} | Local: ${localFile} -> [${exists ? 'EXISTS' : 'MISSING'}]`);
});
