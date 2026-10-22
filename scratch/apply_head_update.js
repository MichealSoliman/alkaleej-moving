const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Read validated schema
const schemaJson = fs.readFileSync('scratch/validated_schema.json', 'utf8');
const newScriptTag = `<script type="application/ld+json">\n${schemaJson}\n  </script>`;

// 2. Replace head schema block (between lines 49 and 163)
const headSchemaRegex = /<!-- Structured Data JSON-LD -->\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i;
if (!headSchemaRegex.test(html)) {
  console.error('Head schema regex did not match!');
  process.exit(1);
}
html = html.replace(headSchemaRegex, `<!-- Structured Data JSON-LD (Unified LocalBusiness, WebSite, Services & FAQ) -->\n  ${newScriptTag}`);

// 3. Update Title, Meta Description, OG, Twitter
const oldTitle = '<title>نقل عفش الرياض | شركة الخليج لنقل وتغليف الأثاث بالرياض</title>';
const newTitle = '<title>شركة نقل عفش بالرياض | شركة الخليج لنقل وتغليف الأثاث</title>';
html = html.replace(oldTitle, newTitle);

const oldDescRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i;
const newDesc = '<meta name="description"\n    content="شركة الخليج أفضل شركة نقل عفش بالرياض لخدمات نقل وتغليف الأثاث السكني والمكتبي مع الفك والتركيب بسيارات دينا مجهزة وكوادر مدربة. اتصل الآن 0503430106." />';
html = html.replace(oldDescRegex, newDesc);

html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, '<meta property="og:title" content="شركة نقل عفش بالرياض | شركة الخليج لنقل وتغليف الأثاث" />');
html = html.replace(/<meta property="og:description"[\s\S]*?content="[^"]*"\s*\/>/i, '<meta property="og:description"\n    content="شركة الخليج أفضل شركة نقل عفش بالرياض لخدمات نقل وتغليف الأثاث السكني والمكتبي مع الفك والتركيب بسيارات دينا مجهزة وكوادر مدربة. اتصل الآن 0503430106." />');

html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, '<meta name="twitter:title" content="شركة نقل عفش بالرياض | شركة الخليج لنقل وتغليف الأثاث" />');
html = html.replace(/<meta name="twitter:description"[\s\S]*?content="[^"]*"\s*\/>/i, '<meta name="twitter:description"\n    content="شركة الخليج أفضل شركة نقل عفش بالرياض لخدمات نقل وتغليف الأثاث السكني والمكتبي مع الفك والتركيب بسيارات دينا مجهزة وكوادر مدربة." />');

// 4. Remove the orphan FAQ schema around line 1704
const orphanFaqRegex = /<!-- JSON-LD FAQ Schema Markup -->\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/i;
if (orphanFaqRegex.test(html)) {
  html = html.replace(orphanFaqRegex, '');
  console.log('Orphan FAQ schema removed successfully.');
} else {
  console.log('WARNING: Orphan FAQ schema not found via regex.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Head tags & Schema update SUCCESS!');
