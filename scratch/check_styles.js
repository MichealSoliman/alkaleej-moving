const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, '..', 'areas');
const dirs = fs.readdirSync(areasDir).filter(f => fs.statSync(path.join(areasDir, f)).isDirectory());

const styles = {};

dirs.forEach(d => {
  const file = path.join(areasDir, d, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  // Check characteristics
  const hasOldHero = html.includes('شركة نقل عفش حي') && html.includes('– نقل سريع وآمن لجميع أنواع الأثاث');
  const hasAleaqiqStyle = html.includes('ما الذي يجب مراعاته؟') || html.includes('أفضل أوقات نقل العفش');
  const hasPhoneInTitle = /050\d+/.test((html.match(/<title>(.*?)<\/title>/is) || [])[1] || '');

  let pageType = 'other';
  if (hasOldHero) pageType = 'old_boilerplate';
  else if (hasAleaqiqStyle) pageType = 'aleaqiq_style_comprehensive';
  else if (d.startsWith('riyadh-to-')) pageType = 'intercity';
  else if (d === 'north-riyadh') pageType = 'north_hub';

  styles[d] = {
    pageType,
    hasPhoneInTitle,
    len: html.length
  };
});

console.log(JSON.stringify(styles, null, 2));

