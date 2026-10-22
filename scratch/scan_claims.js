const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const patterns = [
  /ضمان/i,
  /100%/i,
  /خصم/i,
  /خبرة/i,
  /عميل/i,
  /تقييم/i,
  /ريال/i,
  /فوري/i,
  /أفضل/i
];

lines.forEach((line, idx) => {
  patterns.forEach(pat => {
    if (pat.test(line)) {
      const clean = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean.length > 10 && clean.length < 200) {
        console.log(`L${idx+1} [${pat}]: ${clean}`);
      }
    }
  });
});
