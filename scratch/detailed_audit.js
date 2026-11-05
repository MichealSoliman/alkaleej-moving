const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const audit = dirs.map(d => {
  const filePath = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');

  // Title
  const title = (html.match(/<title>(.*?)<\/title>/is) || [])[1] || '';
  // Meta description
  const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/is) || [])[1] || '';
  // Canonical
  const canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/is) || [])[1] || '';
  // H1
  const h1 = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
  
  // Schemas
  const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const schemaSummary = [];
  let schemaErrors = [];
  schemas.forEach((s, i) => {
    try {
      const parsed = JSON.parse(s);
      if (parsed['@graph']) {
        parsed['@graph'].forEach(item => schemaSummary.push(item['@type']));
      } else {
        schemaSummary.push(parsed['@type']);
      }
    } catch (e) {
      schemaErrors.push(`Schema ${i}: ${e.message}`);
    }
  });

  // Check landmarks or distinct localized keywords
  const text = html.replace(/<[^>]+>/g, ' ');
  const landmarkHits = [];
  const testTerms = [
    'طريق الملك فهد', 'طريق الملك سلمان', 'طريق الملك عبدالعزيز', 'طريق الملك عبد الله',
    'أنس بن مالك', 'التخصصي', 'خريص', 'الدائري الشمالي', 'الدائري الشرقي',
    'كافد', 'المركز المالي', 'البوليفارد', 'جامعة الإمام', 'جامعة الأميرة نورة',
    'مطار الملك خالد', 'طريق الثمامة', 'طريق الدمام', 'طريق مكة'
  ];
  testTerms.forEach(t => {
    if (text.includes(t)) landmarkHits.push(t);
  });

  // Check phone in title
  const hasPhoneInTitle = /050\d+/.test(title);
  // Check template desc
  const hasTemplateDesc = desc.includes('تقدم خدمات فك وتركيب وتغليف ونقل الأثاث والمكاتب');

  // Check breadcrumb
  const hasBreadcrumb = schemaSummary.includes('BreadcrumbList');
  const hasFAQSchema = schemaSummary.includes('FAQPage');

  return {
    dir: d,
    title,
    hasPhoneInTitle,
    desc,
    hasTemplateDesc,
    canonical,
    h1,
    schemaSummary,
    schemaErrors,
    hasBreadcrumb,
    hasFAQSchema,
    landmarkHits,
    htmlSize: html.length
  };
});

fs.writeFileSync(path.join(__dirname, 'neighborhoods_audit_detail.json'), JSON.stringify(audit, null, 2), 'utf8');
console.log('Audit completed. Total pages audited:', audit.length);

audit.forEach(a => {
  console.log(`\n[${a.dir}]`);
  console.log(`Title: ${a.title}`);
  console.log(`Phone in title: ${a.hasPhoneInTitle} | Template desc: ${a.hasTemplateDesc}`);
  console.log(`Breadcrumb Schema: ${a.hasBreadcrumb} | FAQ Schema: ${a.hasFAQSchema}`);
  console.log(`Landmarks mentioned: ${a.landmarkHits.join(', ') || 'NONE'}`);
  if (a.schemaErrors.length) console.log(`Schema Errors: ${a.schemaErrors.join('; ')}`);
});

