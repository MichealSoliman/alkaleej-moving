const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents' && file !== 'scratch' && file !== 'components') {
        getHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allHtml = getHtmlFiles('.');

allHtml.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="mobile-menu"')) {
    const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch) {
      const isInside = navMatch[0].includes('id="mobile-menu"');
      if (!isInside) {
        console.log(`[OUTSIDE NAV] ${file}`);
      }
    }
  }
});
console.log('Check completed.');
