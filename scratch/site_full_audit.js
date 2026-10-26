const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to get all HTML files recursively
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === 'dist') continue;
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
console.log(`Found ${htmlFiles.length} HTML files.`);

// 1. Check tag closures (basic stack check for key tags: div, section, main, article, nav, header, footer, p, a, span)
const pairedTags = ['div', 'section', 'main', 'article', 'nav', 'header', 'footer', 'ul', 'ol', 'table', 'form', 'script', 'style'];
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype']);

const issues = [];

htmlFiles.forEach(file => {
  const relFile = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  // Check DOCTYPE
  if (!content.trim().toLowerCase().startsWith('<!doctype html>')) {
    issues.push({ file: relFile, type: 'doctype', msg: 'Missing or invalid <!DOCTYPE html>' });
  }

  // Check <html>, <head>, <body>, </html>, </body>
  ['<html', '</html>', '<head', '</head>', '<body', '</body>'].forEach(tag => {
    if (!content.includes(tag)) {
      issues.push({ file: relFile, type: 'structure', msg: `Missing ${tag}` });
    }
  });

  // Check <title>
  if (!content.includes('<title>') && !content.includes('<title ')) {
    issues.push({ file: relFile, type: 'seo', msg: 'Missing <title>' });
  }

  // Check H1
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    issues.push({ file: relFile, type: 'seo', msg: 'Missing <h1> tag' });
  } else if (h1Matches.length > 1) {
    // Note if multiple H1s
    issues.push({ file: relFile, type: 'warning_seo', msg: `Multiple <h1> tags found (${h1Matches.length})` });
  }

  // Simple tag balance check for pairedTags
  pairedTags.forEach(tag => {
    const openRegex = new RegExp(`<${tag}(\\s[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`<\/${tag}>`, 'gi');
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      issues.push({
        file: relFile,
        type: 'tag_mismatch',
        msg: `Tag mismatch for <${tag}>: opened ${openCount} times, closed ${closeCount} times`
      });
    }
  });

  // Check hrefs and srcs
  const linkRegex = /(?:href|src)=["']([^"']+)["']/gi;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[1].trim();
    if (!target || target.startsWith('#') || target.startsWith('tel:') || target.startsWith('mailto:') || target.startsWith('javascript:')) {
      continue;
    }
    if (target.startsWith('http://') || target.startsWith('https://')) {
      // Check if it's the site's own domain
      const siteUrl = 'https://alkhaleejmoving.com'; // or similar, let's see what domain is used
      if (target.includes('alkhaleej') || target.includes('alkaleeg')) {
        // internal full url
        try {
          const u = new URL(target);
          const pathname = u.pathname;
          // check if target exists locally
          checkLocalPath(pathname, relFile, target);
        } catch (e) {}
      }
      continue;
    }

    // Relative or absolute path
    checkLocalPath(target, relFile, target);
  }
});

function checkLocalPath(targetPath, relFile, fullAttr) {
  // Strip query & hash
  let cleanPath = targetPath.split('?')[0].split('#')[0];
  if (!cleanPath) return;

  let candidate;
  if (cleanPath.startsWith('/')) {
    candidate = path.join(rootDir, cleanPath);
  } else {
    candidate = path.resolve(rootDir, path.dirname(relFile), cleanPath);
  }

  // If candidate is a directory, check for candidate/index.html
  let exists = fs.existsSync(candidate);
  if (exists && fs.statSync(candidate).isDirectory()) {
    exists = fs.existsSync(path.join(candidate, 'index.html'));
  } else if (!exists) {
    // maybe it lacks .html
    if (fs.existsSync(candidate + '.html')) {
      exists = true;
    } else if (fs.existsSync(path.join(candidate, 'index.html'))) {
      exists = true;
    }
  }

  if (!exists) {
    // Filter out common external or template strings
    issues.push({
      file: relFile,
      type: 'broken_link',
      msg: `Broken resource or link: "${fullAttr}" -> resolved to non-existent: ${path.relative(rootDir, candidate)}`
    });
  }
}

console.log(`Total issues found: ${issues.length}`);
const grouped = {};
issues.forEach(iss => {
  grouped[iss.type] = (grouped[iss.type] || 0) + 1;
});
console.log('Issues by type:', grouped);

// Print detailed issues
fs.writeFileSync(path.join(__dirname, 'audit_summary.json'), JSON.stringify(issues, null, 2));
console.log('Saved detailed audit to scratch/audit_summary.json');
