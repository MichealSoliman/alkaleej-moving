const fs = require('fs');

if (fs.existsSync('components/navbar.html')) {
  console.log('--- navbar.html ---');
  console.log(fs.readFileSync('components/navbar.html', 'utf8').slice(0, 1500));
} else {
  console.log('No components/navbar.html');
}

if (fs.existsSync('assets/js/components.js')) {
  console.log('--- components.js ---');
  const comp = fs.readFileSync('assets/js/components.js', 'utf8');
  const hrefs = [...comp.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('Links inside components.js:', [...new Set(hrefs)]);
}

