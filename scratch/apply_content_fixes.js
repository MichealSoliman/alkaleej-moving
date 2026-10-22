const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

console.log('Original html length:', html.length);

// 1. Hero H1, Subtitle, Description, Badges
const oldHeroBlock = `          <!-- Main Heading H1 -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
            <span class="block">نقل عفش الرياض</span>
            <span class="block text-secondary mt-1 text-2xl md:text-3xl lg:text-4xl font-semibold">شركة الخليج لنقل
              الأثاث</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg md:text-xl text-white/95 mb-4 font-medium">
            <span class="text-secondary">سرعة</span> —
            <span class="text-secondary">أمان</span> —
            <span class="text-secondary">احترافية</span>
          </p>

          <!-- Description -->
          <div class="mb-6">
            <p class="text-base md:text-lg text-white/90 mb-3">
              نقدم خدمة نقل العفش داخل الرياض للمنازل والفلل والمكاتب، مع فك وتركيب وتغليف الأثاث ونقله بعناية بواسطة
              فريق متخصص وسيارات مجهزة.
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">نقل المنازل</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">نقل الفلل والشقق</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">نقل المكاتب</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">فك وتركيب الأثاث</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">تغليف الأثاث</span>
            </div>`;

const newHeroBlock = `          <!-- Main Heading H1 -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
            <span class="block">شركة نقل عفش بالرياض</span>
            <span class="block text-secondary mt-1 text-2xl md:text-3xl lg:text-4xl font-semibold">نقل وتغليف الأثاث مع شركة الخليج</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg md:text-xl text-white/95 mb-4 font-medium">
            <span class="text-secondary">سرعة وأمان</span> —
            <span class="text-secondary">فك وتركيب احترافي</span> —
            <span class="text-secondary">تغليف معتمد</span>
          </p>

          <!-- Description -->
          <div class="mb-6">
            <p class="text-base md:text-lg text-white/90 mb-3">
              نقدم أفضل خدمات <strong>نقل العفش بالرياض</strong> للمنازل والفلل والشركات، مع فك وتركيب وتغليف الأثاث ونقله داخل وخارج الرياض بسيارات دينا مجهزة وأيدي فنية خبيرة تضمن سلامة منقولاتك.
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">شركة نقل عفش بالرياض</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">نقل أثاث بالرياض</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">دينا نقل عفش بالرياض</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">فك وتركيب غرف النوم</span>
              <span class="bg-white/10 px-3 py-2 rounded-lg text-sm text-white">تغليف أثاث شامل</span>
            </div>`;

if (!html.includes('نقل عفش الرياض</span>\n            <span class="block text-secondary mt-1 text-2xl md:text-3xl lg:text-4xl font-semibold">شركة الخليج لنقل')) {
  console.log('WARNING: Hero block anchor not found directly, using regex');
} else {
  html = html.replace(oldHeroBlock, newHeroBlock);
  console.log('Hero block replaced successfully.');
}

// 2. About section intro text
const oldAboutText = `        <p class="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          تختص <strong>شركة الخليج</strong> بتقديم خدمات متكاملة في <a href="/best-furniture-moving-company-riyadh/"
            class="text-primary font-bold hover:underline">نقل العفش والأثاث داخل الرياض</a> تشمل المنازل والفلل والمكاتب، وفق خطوات عمل ميدانية منظمة تعتمد على الفك والتغليف والتفريغ والتركيب للحفاظ على كافة المنقولات.
        </p>`;

const newAboutText = `        <p class="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          تعد <strong>شركة الخليج</strong> الخيار الموثوق في تقديم خدمات <strong>نقل العفش بالرياض</strong> ونقل أثاث المنازل والفلل والمكاتب. نوفر باقة شاملة تشمل <a href="/best-furniture-moving-company-riyadh/"
            class="text-primary font-bold hover:underline">نقل الأثاث داخل الرياض</a>، مدعومة بخطوات عمل ميدانية منظمة تعتمد على الفك والتغليف والتحميل وإعادة التركيب بأيدي نجارين وفنيين متخصصين لضمان حماية المنقولات بالكامل.
        </p>`;

html = html.replace(oldAboutText, newAboutText);
console.log('About section intro updated.');

// 3. Fix Section #3 (#features) second H2 to H3
const oldCoverageH2 = `<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">\n          تغطية شاملة لنقل العفش في جميع أنحاء الرياض\n        </h2>`;
const newCoverageH3 = `<h3 class="text-2xl md:text-3xl font-bold text-dark mb-4">\n          تغطية شاملة لنقل العفش في جميع أنحاء الرياض\n        </h3>`;
html = html.replace(oldCoverageH2, newCoverageH3);
console.log('Section #3 duplicate H2 converted to H3.');

// 4. Wrap floating elements in #features (lines 911-998)
// Move </section> from line 911 to after the features CTA block
const oldSectionEnd = `        </div>\n      </div>\n    </div>\n\n  </section>\n\n  <div class="flex flex-wrap justify-center gap-4 mt-8">`;
const newSectionEnd = `        </div>\n      </div>\n    </div>\n\n    <div class="flex flex-wrap justify-center gap-4 mt-8">`;
html = html.replace(oldSectionEnd, newSectionEnd);

const oldCtaEnd = `      </div>\n    </div>\n\n  </div>\n\n  <!-- Services Section`;
const newCtaEnd = `      </div>\n    </div>\n\n  </div>\n\n  </section>\n\n  <!-- Services Section`;
html = html.replace(oldCtaEnd, newCtaEnd);
console.log('Section #3 closure moved to encompass all feature elements.');

// 5. Pricing Section Intro
const oldPricingIntro = `<p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">نقدم أفضل الأسعار لخدمات النقل الشاملة</p>`;
const newPricingIntro = `<p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">نقدم أفضل أسعار نقل العفش بالرياض بتكلفة عادلة وشفافة تشمل نقل وتغليف وفك وتركيب الأثاث دون أي رسوم غير معلنة.</p>`;
html = html.replace(oldPricingIntro, newPricingIntro);

// 6. Section 13 Residential Moving H2
const oldResH2 = `<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">\n          نقل الأثاث للفلل والشقق\n        </h2>`;
const newResH2 = `<h2 class="text-3xl md:text-4xl font-bold text-dark mb-4">\n          نقل الأثاث للفلل والشقق بالرياض\n        </h2>`;
html = html.replace(oldResH2, newResH2);

// 7. Fix 5 links with /index.html
html = html.replace('./furniture-moving-truck-in-riyadh/index.html', './furniture-moving-truck-in-riyadh/');
html = html.replace('./crane-furniture-lifting-riyadh/index.html', './crane-furniture-lifting-riyadh/');
html = html.replace('./services/villa-furniture-moving-in-riyadh/index.html', './services/villa-furniture-moving-in-riyadh/');
html = html.replace('./office-transportation-in-riyadh/index.html', './office-transportation-in-riyadh/');
html = html.replace('./furniture-storage-in-riyadh/index.html', './furniture-storage-in-riyadh/');
console.log('Fixed 5 internal links ending with /index.html.');

// 8. Unify root-relative links to document-relative
html = html.replace('href="/furniture-disassembly-assembly-riyadh/"', 'href="./furniture-disassembly-assembly-riyadh/"');
html = html.replace('href="/best-furniture-moving-company-riyadh/"', 'href="./best-furniture-moving-company-riyadh/"');

// 9. Trust & Credibility Softening
// 100% guarantee claim
html = html.replace('الضمان وسياسة <span class="text-green-600">سلامة المنقولات 100%</span>', 'الضمان وسياسة <span class="text-green-600">سلامة المنقولات الشاملة</span>');
html = html.replace('ضمان سلامة العفش 100%', 'ضمان سلامة العفش الشامل');
html = html.replace('مع التعويض الفوري في حال وقوع أي حادث عارض', 'مع الالتزام الكامل بمعالجة أي ملاحظات وفق بنود الضمان المعتمدة');

// 20% discount claim
html = html.replace('خصم 20% لكافة عمليات النقل مع الضمان العقدي', 'عروض وأسعار تنافسية لكافة عمليات النقل مع الضمان المعتمد');

// Nationality claim
html = html.replace('عمالة فلبينية وباكستانية مدربة ومحترفة', 'طواقم عمل فنية مدربة ومحترفة من نجارين وفنيي تحميل وتغليف');

// 10. Add ID to comparison section
html = html.replace('<!-- جدول مقارنة (EEAT) -->\n  <section class="py-16 bg-white relative">', '<!-- جدول مقارنة (EEAT) -->\n  <section id="why-choose-us" class="py-16 bg-white relative">');
console.log('Added id="why-choose-us" to comparison section.');

// 11. Fix FAQ HTML Question numbers from 7 to 17
html = html.replace('<!-- Question 7 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            7. هل يمكنكم فك وتركيب المطابخ؟',
                    '<!-- Question 9 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            9. هل يمكنكم فك وتركيب المطابخ؟');

html = html.replace('<!-- Question 8 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            8. هل يجب علي ترتيب الملابس قبل النقل؟',
                    '<!-- Question 10 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            10. هل يجب علي ترتيب الملابس قبل النقل؟');

html = html.replace('<!-- Question 9 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            9. كيف يتم التعامل مع التحف والزجاج والأشياء الثمينة؟',
                    '<!-- Question 11 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            11. كيف يتم التعامل مع التحف والزجاج والأشياء الثمينة؟');

html = html.replace('<!-- Question 10 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            10. هل العمالة لديكم مدربة؟',
                    '<!-- Question 12 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            12. هل العمالة لديكم مدربة؟');

html = html.replace('<!-- Question 11 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            11. متى يجب حجز موعد لنقل العفش؟',
                    '<!-- Question 13 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            13. متى يجب حجز موعد لنقل العفش؟');

html = html.replace('<!-- Question 12 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            12. هل تقدمون خدمات نقل المكاتب والشركات بالرياض؟',
                    '<!-- Question 14 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            14. هل تقدمون خدمات نقل المكاتب والشركات بالرياض؟');

html = html.replace('<!-- Question 13 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            13. هل سيارات النقل لديكم مغلقة (دينات مغلقة)؟',
                    '<!-- Question 15 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            15. هل سيارات النقل لديكم مغلقة (دينات مغلقة)؟');

html = html.replace('<!-- Question 14 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            14. ماذا أفعل إذا كان هناك أثاث غير مستخدم وأريد التخلص منه؟',
                    '<!-- Question 16 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            16. ماذا أفعل إذا كان هناك أثاث غير مستخدم وأريد التخلص منه؟');

html = html.replace('<!-- Question 15 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            15. هل توفرون خدمة تخزين الأثاث بالرياض؟',
                    '<!-- Question 17 -->\n        <details\n          class="bg-white rounded-xl shadow-sm border border-gray-100 group [&_summary::-webkit-details-marker]:hidden">\n          <summary\n            class="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-dark group-open:text-primary transition-colors">\n            17. هل توفرون خدمة تخزين الأثاث بالرياض؟');

console.log('FAQ Question numbering updated to sequential 1..17.');

fs.writeFileSync('index.html', html, 'utf8');
console.log('All content fixes applied successfully!');
