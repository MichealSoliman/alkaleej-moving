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

// Pages to skip (stubs/custom non-standard pages with no nav or 1 line)
const skipPages = [
  'areas/hayu-almonsiya/index.html',
  'areas/south-riyadh/index.html',
  'services/bedroom-disassembly-installation/index.html',
  'services/furniture-moving-within-riyadh/index.html',
  'privacy-policy/index.html',
  'terms/index.html'
];

const allHtml = getHtmlFiles('.');
let transformedCount = 0;
let skippedCount = 0;

allHtml.forEach(filePath => {
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  if (skipPages.includes(normalizedPath)) {
    console.log(`[SKIPPED] ${normalizedPath}`);
    skippedCount++;
    return;
  }
  
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 1. Replace Site Navbar
  // The site navbar is either <nav id="navbar"...>...</nav> or the first <nav> before main/section
  const navRegex = /<!--\s*Navigation\s*-->\s*<nav[\s\S]*?<\/nav>|<nav\s+id="navbar"[\s\S]*?<\/nav>|<nav\s+class="fixed[\s\S]*?<\/nav>|<nav[\s\S]*?<\/nav>/i;
  
  // Make sure we only match the site navbar and NOT breadcrumb nav
  const match = html.match(navRegex);
  if (match) {
    if (!match[0].includes('aria-label="مسار التصفح"') && !match[0].includes('aria-label="Breadcrumb"')) {
      html = html.replace(match[0], '<div id="site-navbar"></div>');
      modified = true;
    }
  }
  
  // 2. Replace Site Footer
  const footerRegex = /<!--\s*Footer[\s\S]*?-->\s*<footer[\s\S]*?<\/footer>|<footer[\s\S]*?<\/footer>/i;
  const footerMatch = html.match(footerRegex);
  if (footerMatch) {
    html = html.replace(footerMatch[0], '<div id="site-footer"></div>');
    modified = true;
  } else if (normalizedPath === 'services/index.html') {
    // Insert before scripts in services/index.html
    html = html.replace('<!-- Scripts -->', '<div id="site-footer"></div>\n\n  <!-- Scripts -->');
    modified = true;
  }
  
  // 3. Add components.js script before </body> if not already present
  if (!html.includes('components.js')) {
    const relDepth = filePath.split(path.sep).length - 1;
    const scriptSrc = relDepth === 0 ? './assets/js/components.js' : (relDepth === 1 ? '../assets/js/components.js' : '../../assets/js/components.js');
    
    // Add before </body>
    if (html.includes('</body>')) {
      html = html.replace('</body>', `  <script src="${scriptSrc}" defer></script>\n</body>`);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[TRANSFORMED] ${normalizedPath}`);
    transformedCount++;
  }
});

console.log(`\nTransformation Summary:`);
console.log(`Total HTML files found: ${allHtml.length}`);
console.log(`Successfully transformed: ${transformedCount}`);
console.log(`Skipped (stubs/custom non-standard): ${skippedCount}`);
