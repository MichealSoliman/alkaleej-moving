const fs = require('fs');

function checkRelativeHrefs(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/href="([^"]+)"/g) || [];
  const srcMatches = content.match(/src="([^"]+)"/g) || [];
  console.log('=== Checking:', filePath, '===');
  matches.forEach(m => {
    const val = m.replace('href="', '').replace('"', '');
    if (val.includes('about') || val.includes('blogs') || val.includes('logo') || val.includes('east-riyadh') || val.includes('articles')) {
      console.log('  HREF:', val);
    }
  });
  srcMatches.forEach(m => {
    const val = m.replace('src="', '').replace('"', '');
    if (val.includes('logo')) {
      console.log('  SRC:', val);
    }
  });
}

checkRelativeHrefs('areas/index.html');
checkRelativeHrefs('blogs/index.html');
checkRelativeHrefs('index.html');
checkRelativeHrefs('components/navbar.html');
checkRelativeHrefs('components/footer.html');
