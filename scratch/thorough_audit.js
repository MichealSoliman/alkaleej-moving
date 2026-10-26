const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === 'dist' || file === '.agents') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(rootDir);
console.log(`Checking ${htmlFiles.length} HTML files...`);

const report = {
  brokenLinks: [],
  brokenImages: [],
  brokenScriptsAndStyles: [],
  jsonLdErrors: [],
  structureErrors: [],
  sitemapErrors: []
};

// Check sitemap.xml
if (fs.existsSync(path.join(rootDir, 'sitemap.xml'))) {
  const sitemapContent = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  
  // Check for duplicates
  const seenLocs = new Set();
  locMatches.forEach(loc => {
    const trimmed = loc.trim();
    if (loc !== trimmed) {
      report.sitemapErrors.push(`Whitespace in <loc>: "${loc}"`);
    }
    if (seenLocs.has(trimmed)) {
      report.sitemapErrors.push(`Duplicate <loc> in sitemap: ${trimmed}`);
    }
    seenLocs.add(trimmed);

    // Check if target page exists in workspace
    try {
      const u = new URL(trimmed);
      let p = u.pathname;
      if (p.endsWith('/')) p += 'index.html';
      const targetLocal = path.join(rootDir, p);
      if (!fs.existsSync(targetLocal)) {
        report.sitemapErrors.push(`Sitemap URL points to non-existent local file: ${trimmed} -> ${p}`);
      }
    } catch(e) {
      report.sitemapErrors.push(`Invalid URL in sitemap: ${trimmed}`);
    }
  });

  // Check if any real HTML page is missing from sitemap
  htmlFiles.forEach(file => {
    const rel = path.relative(rootDir, file).replace(/\\/g, '/');
    if (rel.startsWith('components/')) return;
    let expectedUrl = 'https://alkaleej-moving.com/' + rel.replace(/index\.html$/, '');
    if (!seenLocs.has(expectedUrl)) {
      report.sitemapErrors.push(`Page missing from sitemap.xml: ${expectedUrl} (${rel})`);
    }
  });
}

// Inspect each HTML file
htmlFiles.forEach(file => {
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  if (rel.startsWith('components/')) return; // ignore component snippets for page structure

  const content = fs.readFileSync(file, 'utf8');

  // 1. JSON-LD check
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  while ((jsonMatch = jsonLdRegex.exec(content)) !== null) {
    try {
      JSON.parse(jsonMatch[1]);
    } catch (e) {
      report.jsonLdErrors.push({
        file: rel,
        error: e.message,
        snippet: jsonMatch[1].substring(0, 100)
      });
    }
  }

  // 2. Check broken images <img ... src="..."
  const imgRegex = /<img\s+[^>]*?src=["']([^"']+)["']/gi;
  let im;
  while ((im = imgRegex.exec(content)) !== null) {
    const src = im[1].trim();
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      if (src.includes('alkaleej-moving.com')) {
        const u = new URL(src);
        checkTargetFile(u.pathname, rel, src, report.brokenImages);
      }
      continue;
    }
    // ignore templates
    if (src.includes('${')) continue;
    checkTargetFile(src, rel, src, report.brokenImages);
  }

  // 3. Check CSS / JS links
  const linkCssRegex = /<link\s+[^>]*?href=["']([^"']+)["']/gi;
  let lc;
  while ((lc = linkCssRegex.exec(content)) !== null) {
    const href = lc[1].trim();
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      if (href.includes('alkaleej-moving.com')) {
        try {
          const u = new URL(href);
          checkTargetFile(u.pathname, rel, href, report.brokenScriptsAndStyles);
        } catch(e) {}
      }
      continue;
    }
    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) continue;
    checkTargetFile(href, rel, href, report.brokenScriptsAndStyles);
  }

  const scriptRegex = /<script\s+[^>]*?src=["']([^"']+)["']/gi;
  let sc;
  while ((sc = scriptRegex.exec(content)) !== null) {
    const src = sc[1].trim();
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) continue;
    checkTargetFile(src, rel, src, report.brokenScriptsAndStyles);
  }

  // 4. Check hyperlinks <a ... href="..."
  const aRegex = /<a\s+[^>]*?href=["']([^"']+)["']/gi;
  let am;
  while ((am = aRegex.exec(content)) !== null) {
    const href = am[1].trim();
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes('alkaleej-moving.com') || href.includes('alkaleeg')) {
        try {
          const u = new URL(href);
          checkTargetFile(u.pathname, rel, href, report.brokenLinks);
        } catch(e) {}
      }
      continue;
    }
    if (href.includes('${')) continue;
    checkTargetFile(href, rel, href, report.brokenLinks);
  }
});

function checkTargetFile(targetUrl, fromFile, originalAttr, errorList) {
  let clean = targetUrl.split('?')[0].split('#')[0];
  if (!clean) return;

  let resolvedPath;
  if (clean.startsWith('/')) {
    resolvedPath = path.join(rootDir, clean);
  } else {
    resolvedPath = path.resolve(rootDir, path.dirname(fromFile), clean);
  }

  let exists = fs.existsSync(resolvedPath);
  if (exists) {
    if (fs.statSync(resolvedPath).isDirectory()) {
      exists = fs.existsSync(path.join(resolvedPath, 'index.html'));
    }
  } else {
    // try .html
    if (fs.existsSync(resolvedPath + '.html')) {
      exists = true;
    } else if (fs.existsSync(path.join(resolvedPath, 'index.html'))) {
      exists = true;
    }
  }

  if (!exists) {
    errorList.push({
      file: fromFile,
      target: originalAttr,
      resolved: path.relative(rootDir, resolvedPath).replace(/\\/g, '/')
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'thorough_report.json'), JSON.stringify(report, null, 2), 'utf8');
console.log('Thorough report generated:');
console.log(`- Broken Links: ${report.brokenLinks.length}`);
console.log(`- Broken Images: ${report.brokenImages.length}`);
console.log(`- Broken CSS/JS/Icons: ${report.brokenScriptsAndStyles.length}`);
console.log(`- JSON-LD Errors: ${report.jsonLdErrors.length}`);
console.log(`- Sitemap Errors: ${report.sitemapErrors.length}`);
