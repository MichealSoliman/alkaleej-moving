const fs = require('fs');
const path = require('path');

const targets = [
  "/blogs/furniture-assembly-carpenter-riyadh/",
  "/warehouse-transportation-in-riyadh/",
  "/blogs/cheapest-furniture-moving-company-in-riyadh/",
  "/areas/about/",
  "/areas/east-riyadh/",
  "/blogs/blogs/",
  "/areas/blogs/",
  "/areas/logo.webp/",
  "/blog/protect-the-furniture-during-transport/",
  "/blogs/furniture-moving-prices-in-riyadh/",
  "/furniture-moving-within-riyadh/",
  "/cdn-cgi/l/email-protection",
  "/areas/hayu-almalaqa/",
  "/blogs/air-conditioner-dismantling-and-installation/",
  "/ac-services/air-conditioning-copper-extension/",
  "/articles/",
  "/areas/south-riyadh/",
  "/services/bedroom-disassembly-installation/",
  "/blogs/furniture-moving-dismantling-and-assembly-in-riyadh/",
  "/services/furniture-moving-within-riyadh/",
  "/blogs/اسعار-نقل-العفش-في-الرياض/"
];

// Let's examine:
// 1. All relative links in areas/ or blogs/ that might produce /areas/about/, /areas/blogs/, /blogs/blogs/, /areas/logo.webp/
function getAllHtmlFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(full, list);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js')) {
      list.push(full);
    }
  }
  return list;
}

const allFiles = getAllHtmlFiles('.');

console.log('=== Checking possible relative links that resolve to odd 404s ===');

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // check for href="about" or href="blogs" or href="logo.webp"
  const patterns = [
    'about', 'blogs', 'logo.webp', 'east-riyadh', 'hayu-almalaqa', 
    'protect-the-furniture', 'email-protection', 'air-conditioning-copper',
    'articles', 'south-riyadh', 'bedroom-disassembly', 'furniture-moving-within-riyadh'
  ];
  
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    patterns.forEach(p => {
      if (line.includes(p)) {
        // Only print if it looks like a link or schema or src
        if (line.includes('href=') || line.includes('src=') || line.includes('url') || line.includes('@id')) {
          // Filter out normal clean links to keep output readable
          if (p === 'about' && (line.includes('href="about') || line.includes('href="./about') || line.includes('areas/about'))) {
            console.log(`[ABOUT] ${file}:${idx+1} -> ${line.trim()}`);
          }
          if (p === 'blogs' && (line.includes('href="blogs') || line.includes('href="./blogs') || line.includes('/blogs/blogs') || line.includes('areas/blogs'))) {
            console.log(`[BLOGS] ${file}:${idx+1} -> ${line.trim()}`);
          }
          if (p === 'logo.webp' && (line.includes('areas') || line.includes('href="logo.webp') || line.includes('src="logo.webp'))) {
            console.log(`[LOGO] ${file}:${idx+1} -> ${line.trim()}`);
          }
          if (p === 'articles' && (line.includes('href="/articles') || line.includes('href="articles') || line.includes('articles/'))) {
            console.log(`[ARTICLES] ${file}:${idx+1} -> ${line.trim()}`);
          }
          if (p === 'protect-the-furniture' && (line.includes('/blog/') && !line.includes('/blogs/'))) {
            console.log(`[PROTECT] ${file}:${idx+1} -> ${line.trim()}`);
          }
          if (p === 'east-riyadh' && (line.includes('/areas/east-riyadh') || line.includes('east-riyadh-moving'))) {
            if (line.includes('/areas/east-riyadh')) {
              console.log(`[EAST-RIYADH] ${file}:${idx+1} -> ${line.trim()}`);
            }
          }
          if (p === 'south-riyadh' && line.includes('/areas/south-riyadh')) {
            console.log(`[SOUTH-RIYADH] ${file}:${idx+1} -> ${line.trim()}`);
          }
        }
      }
    });
  });
});

