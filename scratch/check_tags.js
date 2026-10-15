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

console.log('--- Checking Navbar Patterns ---');
allHtml.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/gi);
  const footerMatches = html.match(/<footer[\s\S]*?<\/footer>/gi);
  
  const navCount = navMatches ? navMatches.length : 0;
  const footerCount = footerMatches ? footerMatches.length : 0;
  
  if (navCount !== 1 || footerCount !== 1) {
    console.log(`${file}: Navs=${navCount}, Footers=${footerCount}`);
  }
});
