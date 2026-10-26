const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Copy hay-hatayn.webp to hayu-hatayn.webp if needed
const hataynSrc = path.join(rootDir, 'assets', 'img', 'hay-hatayn.webp');
const hataynDst = path.join(rootDir, 'assets', 'img', 'hayu-hatayn.webp');
if (fs.existsSync(hataynSrc) && !fs.existsSync(hataynDst)) {
  fs.copyFileSync(hataynSrc, hataynDst);
  console.log('Copied hay-hatayn.webp to hayu-hatayn.webp');
}

// 2. Create favicon.png, apple-touch-icon.png, icon.png
// We have gulf.webp which is 64x64/rounded logo. Let's create favicon.png from gulf.webp or favicon.ico
const gulfImg = path.join(rootDir, 'assets', 'img', 'gulf.webp');
const favIco = path.join(rootDir, 'favicon.ico');

const favPng = path.join(rootDir, 'assets', 'img', 'favicon.png');
const appleIcon = path.join(rootDir, 'apple-touch-icon.png');
const iconPng = path.join(rootDir, 'assets', 'img', 'icon.png');

if (!fs.existsSync(favPng) && fs.existsSync(gulfImg)) {
  fs.copyFileSync(gulfImg, favPng);
  console.log('Created assets/img/favicon.png');
}
if (!fs.existsSync(appleIcon) && fs.existsSync(gulfImg)) {
  fs.copyFileSync(gulfImg, appleIcon);
  console.log('Created apple-touch-icon.png');
}
if (!fs.existsSync(iconPng) && fs.existsSync(gulfImg)) {
  fs.copyFileSync(gulfImg, iconPng);
  console.log('Created assets/img/icon.png');
}

// 3. For riyadh-to-dammam.webp, kitchen-moving-riyadh.webp, hayu-almonsiya.webp:
// If they do not exist, copy from similar high quality images to avoid 404
const dammamImg = path.join(rootDir, 'assets', 'img', 'riyadh-to-dammam.webp');
const jeddahImg = path.join(rootDir, 'assets', 'img', 'riyadh-to-jeddah.webp');
if (!fs.existsSync(dammamImg) && fs.existsSync(jeddahImg)) {
  fs.copyFileSync(jeddahImg, dammamImg);
  console.log('Created assets/img/riyadh-to-dammam.webp');
}

const kitchenImg = path.join(rootDir, 'assets', 'img', 'kitchen-moving-riyadh.webp');
const dismantleImg = path.join(rootDir, 'assets', 'img', 'furniture-moving-dismantling-and-assembly-in-riyadh.webp');
if (!fs.existsSync(kitchenImg) && fs.existsSync(dismantleImg)) {
  fs.copyFileSync(dismantleImg, kitchenImg);
  console.log('Created assets/img/kitchen-moving-riyadh.webp');
}

const monsiyaImg = path.join(rootDir, 'assets', 'img', 'hayu-almonsiya.webp');
const rimalImg = path.join(rootDir, 'assets', 'img', 'hayu-alrimal.webp');
if (!fs.existsSync(monsiyaImg) && fs.existsSync(rimalImg)) {
  fs.copyFileSync(rimalImg, monsiyaImg);
  console.log('Created assets/img/hayu-almonsiya.webp');
}

// 4. Update all HTML files for link replacements
function getAllHtml(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'scratch' || f === 'dist') continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      getAllHtml(p, list);
    } else if (f.endsWith('.html')) {
      list.push(p);
    }
  }
  return list;
}

const htmlFiles = getAllHtml(rootDir);
let updatedFiles = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace ac blog links with /furniture-disassembly-assembly-riyadh/
  content = content.replace(/https:\/\/alkaleej-moving\.com\/blogs\/moving-furniture-with-ac-installation-riyadh\/?/g, '/furniture-disassembly-assembly-riyadh/');
  content = content.replace(/["']\/blogs\/moving-furniture-with-ac-installation-riyadh\/?["']/g, '"/furniture-disassembly-assembly-riyadh/"');
  content = content.replace(/["']\.\.\/blogs\/moving-furniture-with-ac-installation-riyadh\/?["']/g, '"/furniture-disassembly-assembly-riyadh/"');

  // Replace old blog slug in riyadh-to-jeddah
  content = content.replace(/https:\/\/alkaleej-moving\.com\/blogs\/professional-vs-regular-furniture-moving-company-in-riyadh\/?/g, '/blogs/professional-vs-regular-moving/');
  content = content.replace(/https:\/\/alkaleej-moving\.com\/riyadh-to-jeddah\/?/g, '/areas/riyadh-to-jeddah/');

  // Replace deleted hayu-qurtuba
  content = content.replace(/["']\.\.\/areas\/hayu-qurtuba\/?["']/g, '"/areas/hayu-almonsiya/"');
  content = content.replace(/https:\/\/alkaleej-moving\.com\/areas\/hayu-qurtuba\/?/g, '/areas/hayu-almonsiya/');

  // Replace non-existent south-riyadh
  content = content.replace(/["']\.\.\/areas\/south-riyadh\/?["']/g, '"/areas/"');
  content = content.replace(/["']\.\.\/areas\/south-riyadh-moving\/?["']/g, '"/areas/"');
  content = content.replace(/["']\.\.\/south-riyadh-moving\/?["']/g, '"/areas/"');
  content = content.replace(/https:\/\/alkaleej-moving\.com\/areas\/south-riyadh\/?/g, '/areas/');

  // Replace non-existent central-riyadh-moving
  content = content.replace(/["']\.\.\/central-riyadh-moving\/?["']/g, '"/areas/"');

  // Replace non-existent north-riyadh-moving
  content = content.replace(/["']\.\.\/north-riyadh-moving\/?["']/g, '"/areas/north-riyadh/"');

  // Replace non-existent /areas/west-riyadh/ with /west-riyadh-moving/
  content = content.replace(/["']\.\.\/areas\/west-riyadh\/?["']/g, '"/west-riyadh-moving/"');
  content = content.replace(/https:\/\/alkaleej-moving\.com\/areas\/west-riyadh\/?/g, '/west-riyadh-moving/');

  // In areas/hayu-almonsiya/index.html: fix icon.png link
  if (file.endsWith(path.join('areas', 'hayu-almonsiya', 'index.html'))) {
    content = content.replace(/href=["']\.\.\/\.\.\/assets\/img\/icon\.png["']/g, 'href="/favicon.ico"');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFiles++;
    console.log(`Updated links in: ${path.relative(rootDir, file)}`);
  }
});

console.log(`Updated ${updatedFiles} files.`);

// 5. Clean and Fix sitemap.xml
const sitemapPath = path.join(rootDir, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Fix whitespace in <loc> tags
sitemap = sitemap.replace(/<loc>([^<]+)\s+<\/loc>/g, '<loc>$1</loc>');

// Check duplicates and remove them
const entries = sitemap.split('  <url>');
const header = entries[0];
const seen = new Set();
const cleanUrls = [];

for (let i = 1; i < entries.length; i++) {
  const block = '<url>' + entries[i];
  const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
  if (locMatch) {
    const loc = locMatch[1].trim();
    if (!seen.has(loc)) {
      seen.add(loc);
      cleanUrls.push('  ' + block.trim());
    } else {
      console.log(`Removed duplicate from sitemap: ${loc}`);
    }
  }
}

// Add missing pages to sitemap
const missing = [
  'https://alkaleej-moving.com/areas/hayu-almonsiya/',
  'https://alkaleej-moving.com/blogs/best-furniture-carpenter-in-riyadh/'
];

missing.forEach(m => {
  if (!seen.has(m)) {
    const newEntry = `  <url>\n    <loc>${m}</loc>\n    <lastmod>2026-10-22</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`;
    cleanUrls.push(newEntry);
    console.log(`Added missing page to sitemap: ${m}`);
  }
});

const newSitemap = header + cleanUrls.join('\n\n') + '\n\n</urlset>\n';
fs.writeFileSync(sitemapPath, newSitemap, 'utf8');
console.log('sitemap.xml successfully updated and cleaned.');
