const fs = require('fs');
const html = fs.readFileSync('areas/riyadh-to-jeddah/index.html', 'utf8');
const faqIdx = html.indexOf('الأسئلة الشائعة');
if (faqIdx !== -1) {
  console.log(html.slice(faqIdx, faqIdx + 2000));
} else {
  console.log('No "الأسئلة الشائعة" found in jeddah');
}

