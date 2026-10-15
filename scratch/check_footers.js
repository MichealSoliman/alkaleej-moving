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
  if (html.includes('<footer')) {
    const footerCount = (html.match(/<footer\b/gi) || []).length;
    const footerCloseCount = (html.match(/<\/footer>/gi) || []).length;
    if (footerCount !== 1 || footerCloseCount !== 1) {
      console.log(`[FOOTER MISMATCH] ${file}: <footer=${footerCount}, </footer=${footerCloseCount}`);
    }
  }
});
console.log('Footer check completed.');
