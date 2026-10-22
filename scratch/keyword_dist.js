const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

const keywords = [
  'نقل عفش بالرياض',
  'نقل عفش الرياض',
  'شركة نقل عفش بالرياض',
  'شركة نقل عفش الرياض',
  'نقل اثاث بالرياض',
  'نقل أثاث بالرياض',
  'نقل الاثاث بالرياض',
  'نقل الأثاث بالرياض',
  'نقل أثاث الرياض',
  'نقل اثاث الرياض',
  'نقل الأثاث داخل الرياض',
  'خدمات نقل العفش بالرياض',
  'دينا نقل عفش بالرياض',
  'دينا نقل عفش',
  'افضل شركة نقل عفش بالرياض',
  'أفضل شركة نقل عفش بالرياض',
  'ارخص شركة نقل عفش بالرياض',
  'أسعار نقل العفش بالرياض',
  'اسعار نقل العفش بالرياض',
  'فك وتركيب العفش',
  'فك وتركيب الأثاث',
  'تغليف العفش',
  'تغليف الأثاث'
];

console.log('=== KEYWORD DENSITY IN VISIBLE TEXT ===\n');
keywords.forEach(kw => {
  const reg = new RegExp(kw, 'gi');
  const count = (text.match(reg) || []).length;
  console.log(`"${kw}": ${count}`);
});
