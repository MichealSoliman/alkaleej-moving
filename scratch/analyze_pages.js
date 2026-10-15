const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.agents' && file !== 'scratch') {
        getHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allHtml = getHtmlFiles('.');
console.log('Total HTML files:', allHtml.length);
allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasNav = content.includes('<nav') || content.includes('id="navbar"');
  const hasFooter = content.includes('<footer');
  console.log(f.padEnd(55), 'Nav:', hasNav, 'Footer:', hasFooter, 'Lines:', content.split('\n').length);
});
