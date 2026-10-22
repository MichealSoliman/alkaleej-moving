const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// H2 #7
html = html.replace(
  '<h2 class="text-3xl font-bold text-dark mb-4">فك وتركيب <span class="text-primary">الأثاث باحترافية</span></h2>',
  '<h2 class="text-3xl font-bold text-dark mb-4">فك وتركيب <span class="text-primary">الأثاث بالرياض باحترافية</span></h2>'
);

// H2 #8
html = html.replace(
  '<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">احترافية <span class="text-primary">تغليف العفش</span> لحماية مضمونة</h2>',
  '<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">خدمات <span class="text-primary">تغليف الأثاث والعفش بالرياض</span> لحماية مضمونة</h2>'
);

// H2 #13
html = html.replace(
  '<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">\n          نقل الأثاث المكتبي والتجاري\n        </h2>',
  '<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">\n          نقل الأثاث المكتبي والتجاري بالرياض\n        </h2>'
);

// Card 1 in Services Section
html = html.replace(
  'خدمة الشحن والنقل المباشر للمنازل والفلل والشقق بسيارات مجهزة وعمالة مدربة على تحميل وتفريغ الأثاث بسلامة.',
  'خدمة الشحن والنقل المباشر لنقل أثاث المنازل والفلل والشقق بالرياض بسيارات دينا مجهزة وعمالة متخصصة على تحميل وتفريغ العفش بسلامة.'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Sub-headings and card copy tuned with local terms.');
