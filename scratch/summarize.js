const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/audit_results.json', 'utf8'));

data.forEach((item, i) => {
  console.log(`=== [${i+1}] ${item.url} ===`);
  console.log('Local File:', item.localFile);
  console.log('In Sitemap:', item.inSitemap);
  console.log('In .htaccess:', item.htaccessMatches.join(' | ') || 'None');
  console.log('Internal Links Count:', item.fileOccurrences.length);
  if (item.fileOccurrences.length > 0) {
    const files = [...new Set(item.fileOccurrences.map(o => o.file))];
    console.log('Found in files (' + files.length + '):', files.slice(0, 10).join(', ') + (files.length > 10 ? ` (+${files.length - 10} more)` : ''));
    item.fileOccurrences.slice(0, 5).forEach(o => {
      console.log(`   -> [${o.file}:${o.line}] ${o.snippet}`);
    });
  }
  console.log('--------------------------------------------------');
});
