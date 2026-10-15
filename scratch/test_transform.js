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

console.log('--- Inspecting Pages for Transformation ---');

allHtml.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  
  // Find site navbar: looks for <nav id="navbar" ...> ... </nav> or <nav class="fixed ..."> ... </nav>
  // or first <nav> before main content
  let hasSiteNavbar = false;
  let hasSiteFooter = false;
  
  if (html.includes('id="navbar"') || html.includes('<nav')) {
    hasSiteNavbar = true;
  }
  
  if (html.includes('<footer')) {
    hasSiteFooter = true;
  }
  
  const relDepth = file.split(path.sep).length - 1;
  const scriptSrc = relDepth === 0 ? './assets/js/components.js' : (relDepth === 1 ? '../assets/js/components.js' : '../../assets/js/components.js');
  
  console.log(`${file.padEnd(55)} | Depth: ${relDepth} | Nav: ${hasSiteNavbar} | Footer: ${hasSiteFooter} | Script: ${scriptSrc}`);
});
