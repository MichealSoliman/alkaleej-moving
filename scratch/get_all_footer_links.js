const fs = require('fs');
if (fs.existsSync('components/footer.html')) {
  const footer = fs.readFileSync('components/footer.html', 'utf8');
  const hrefs = [...footer.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('All links in footer.html:');
  console.log([...new Set(hrefs)]);
}

