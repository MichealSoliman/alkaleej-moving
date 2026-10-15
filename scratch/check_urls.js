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

function getAllFiles(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', '.agents', 'scratch'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

const files = getAllFiles('.');
console.log(`Found ${files.length} project files.`);

const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
const htaccessContent = fs.readFileSync('.htaccess', 'utf8');

const report = targets.map(target => {
  // Check exact string or encoded
  const rawTarget = target;
  const encodedTarget = encodeURI(target);
  const cleanTarget = target.replace(/^\/|\/$/g, '');
  const encodedClean = encodeURI(cleanTarget);

  // Check if exists as a directory / index.html
  let localFile = null;
  const directPath = path.join('.', cleanTarget, 'index.html');
  const fileDirect = path.join('.', cleanTarget);
  if (fs.existsSync(directPath)) {
    localFile = directPath;
  } else if (fs.existsSync(fileDirect) && !fs.statSync(fileDirect).isDirectory()) {
    localFile = fileDirect;
  }

  // Check occurrences in sitemap
  const inSitemap = sitemapContent.includes(cleanTarget) || (target !== '/' && sitemapContent.includes(encodedClean));

  // Check occurrences in .htaccess
  const htaccessMatches = [];
  htaccessContent.split('\n').forEach((line, idx) => {
    if (line.includes(cleanTarget) || (cleanTarget.includes('اسعار') && (line.includes('اسعار') || line.includes(encodedClean)))) {
      htaccessMatches.push(`Line ${idx + 1}: ${line.trim()}`);
    }
  });

  // Check occurrences in all other files
  const fileOccurrences = [];
  files.forEach(f => {
    if (f === 'sitemap.xml' || f === '.htaccess') return;
    const content = fs.readFileSync(f, 'utf8');
    // Search exact patterns
    if (content.includes(rawTarget) || 
        content.includes(encodedTarget) || 
        (cleanTarget.length > 3 && content.includes(cleanTarget)) ||
        (cleanTarget.includes('اسعار') && (content.includes('اسعار') || content.includes(encodedClean)))) {
      
      // Let's find specific lines
      const lines = content.split('\n');
      lines.forEach((l, lIdx) => {
        if (l.includes(rawTarget) || l.includes(encodedTarget) || (cleanTarget.length > 5 && l.includes(cleanTarget))) {
          fileOccurrences.push({ file: f, line: lIdx + 1, snippet: l.trim().substring(0, 150) });
        }
      });
    }
  });

  return {
    url: target,
    localFile,
    inSitemap,
    htaccessMatches,
    fileOccurrences
  };
});

fs.writeFileSync('scratch/audit_results.json', JSON.stringify(report, null, 2), 'utf8');
console.log('Results written to scratch/audit_results.json');

