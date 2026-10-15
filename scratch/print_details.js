const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/audit_results.json', 'utf8'));

for (let i = 0; i < 5; i++) {
  const item = data[i];
  console.log('=== [' + (i+1) + '] ' + item.url + ' ===');
  console.log('Local File:', item.localFile);
  console.log('In Sitemap:', item.inSitemap);
  console.log('In .htaccess:', item.htaccessMatches.join(' | ') || 'None');
  console.log('Internal Links Count:', item.fileOccurrences.length);
  if (item.fileOccurrences.length > 0) {
    const files = [...new Set(item.fileOccurrences.map(o => o.file))];
    console.log('Found in files (' + files.length + '):', files.join(', '));
    item.fileOccurrences.slice(0, 5).forEach(o => {
      console.log('   -> [' + o.file + ':' + o.line + '] ' + o.snippet);
    });
  }
  console.log('--------------------------------------------------');
}
