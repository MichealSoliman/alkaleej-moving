const fs = require('fs');
const path = require('path');

const hubFile = path.join(__dirname, '..', 'areas', 'index.html');
let html = fs.readFileSync(hubFile, 'utf8');

const allCards = [
  // Intercity
  {
    category: "intercity",
    name: "نقل عفش من الرياض إلى جدة",
    link: "/areas/riyadh-to-jeddah/",
    badge: "نقل بين المدن",
    icon: "fa-route",
    iconBg: "from-blue-600 to-indigo-700",
    summary: "شحن أثاث منزلك ومكتبك لمسافة 950 كم بسيارات دينا مقفلة مع الفك والتركيب والتغليف المزدوج وضمان وصول شامل."
  },
  {
    category: "intercity",
    name: "نقل عفش من الرياض إلى الدمام والخبر",
    link: "/areas/riyadh-to-dammam/",
    badge: "نقل بين المدن",
    icon: "fa-road",
    iconBg: "from-blue-600 to-indigo-700",
    summary: "شحن سريع لمسافة 400 كم عبر طريق الدمام السريع لكافة مدن الشرقية (الدمام، الخبر، الظهران، الجبيل) مع حماية ضد الرطوبة."
  },
  {
    category: "intercity",
    name: "نقل عفش من الرياض لمكة المكرمة",
    link: "/areas/riyadh-to-makkah/",
    badge: "نقل بين المدن",
    icon: "fa-kaaba",
    iconBg: "from-emerald-600 to-teal-700",
    summary: "خدمات شحن العفش من الرياض إلى مكة المكرمة مع تنظيم دقيق لفك وتغليف الأثاث الثقيل والأجهزة وضمان النقل الآمن."
  },
  {
    category: "intercity",
    name: "نقل عفش من الرياض إلى القصيم",
    link: "/areas/riyadh-to-qassim/",
    badge: "نقل بين المدن",
    icon: "fa-truck-arrow-right",
    iconBg: "from-amber-600 to-orange-700",
    summary: "نقل الأثاث المنزلي والمكتبي إلى بريدة وعنيزة وكافة محافظات القصيم بسيارات دينا مجهزة وأسعار اقتصادية تنافسية."
  },

  // North Riyadh Hub & Neighborhoods
  {
    category: "north",
    name: "نقل عفش شمال الرياض",
    link: "/areas/north-riyadh/",
    badge: "المركز اللوجستي",
    icon: "fa-compass",
    iconBg: "from-secondary to-amber-700",
    summary: "الدليل الشامل لنقل الأثاث في كافة أحياء شمال الرياض بأسطول دينا مقفل وفنيين متخصصين وتغطية سريعة خلال 30 دقيقة."
  },
  {
    category: "north",
    name: "نقل عفش حي الملقا",
    link: "/areas/hayu-almalqa/",
    badge: "أرقى الفلل",
    icon: "fa-gem",
    iconBg: "from-amber-500 to-yellow-600",
    summary: "نقل الفلل والقصور الفاخرة بطريقي الملك سلمان وأنس بن مالك، حماية التحف والأثاث المستورد وأوناش رفع هيدروليكية."
  },
  {
    category: "north",
    name: "نقل عفش حي الياسمين",
    link: "/areas/hayu-alyasamin/",
    badge: "كثافة عائلية",
    icon: "fa-building-user",
    iconBg: "from-cyan-600 to-blue-700",
    summary: "خدمات متكاملة للشقق الدوبلكس والفلل المودرن مع فك وتركيب المطابخ وغرف النوم وتغليف الأجهزة الحساسة."
  },
  {
    category: "north",
    name: "نقل عفش حي النرجس",
    link: "/areas/hayu-alnarjis/",
    badge: "مخططات جديدة",
    icon: "fa-house-chimney-window",
    iconBg: "from-green-600 to-emerald-700",
    summary: "نقل أثاث الفلل الجديدة وضاحية خزام، تغليف عازل للغبار وحماية الدهانات والسلالم والأرضيات الرخامية من الخدوش."
  },
  {
    category: "north",
    name: "نقل عفش حي الصحافة",
    link: "/areas/hayu-alsahafa/",
    badge: "سكني وإداري",
    icon: "fa-newspaper",
    iconBg: "from-slate-600 to-slate-800",
    summary: "طريق الملك فهد وشارع العليا، نقل أثاث المكاتب والمؤسسات والفلل العائلية مع سيارات دينا مجهزة وسرعة فائقة."
  },
  {
    category: "north",
    name: "نقل عفش حي حطين",
    link: "/areas/hayu-hatayn/",
    badge: "خدمة VIP",
    icon: "fa-crown",
    iconBg: "from-purple-600 to-indigo-800",
    summary: "محيط البوليفارد ومخرج 2، عناية فائقة بالثريات الكريستالية والمقتنيات الثمينة ونقل فاخر بأعلى درجات الأمان."
  },
  {
    category: "north",
    name: "نقل عفش حي العقيق",
    link: "/areas/hayu-aleaqiq/",
    badge: "قرب KAFD",
    icon: "fa-city",
    iconBg: "from-sky-600 to-blue-800",
    summary: "بجوار مركز الملك عبدالله المالي، نقل شقق الأبراج والمجمعات العصرية مع أوناش خارجية وتنسيق تصاريح التحميل."
  },
  {
    category: "north",
    name: "نقل عفش حي العارض",
    link: "/areas/hayu-alearid/",
    badge: "أقصى الشمال",
    icon: "fa-map-pin",
    iconBg: "from-teal-600 to-teal-800",
    summary: "امتداد طريقي الملك عبدالعزيز وأبو بكر، شاحنات دينا جامبو لنقل محتويات الفلل الكبيرة في رحلة واحدة."
  },
  {
    category: "north",
    name: "نقل عفش حي القيروان",
    link: "/areas/hayu-alqayrawan/",
    badge: "هدوء وفخامة",
    icon: "fa-tree",
    iconBg: "from-emerald-500 to-green-700",
    summary: "غرب طريق الملك فهد وصلبوخ، فلل هادئة ومعدات نقل صامتة ذات عجلات مطاطية لحماية ممرات ومداخل المنازل."
  },
  {
    category: "north",
    name: "نقل عفش حي الربيع",
    link: "/areas/hayu-alrabie/",
    badge: "أحياء عريقة",
    icon: "fa-shield-heart",
    iconBg: "from-rose-600 to-pink-700",
    summary: "قرب مستشفى المملكة وطريق التخصصي، فك وتركيب الأثاث الخشبي الكلاسيكي والتحف الثقيلة بعناية واحترافية."
  },

  // East & Central Riyadh
  {
    category: "east-central",
    name: "نقل عفش حي العليا",
    link: "/areas/hayu-aleulya/",
    badge: "عصب العاصمة",
    icon: "fa-building",
    iconBg: "from-blue-700 to-slate-900",
    summary: "برج المملكة والفيصلية، نقل مقرات الشركات والمكاتب والشقق الفاخرة بالأبراج مع تنسيق المصاعد ومواقف التحميل."
  },
  {
    category: "east-central",
    name: "نقل عفش حي الروضة",
    link: "/areas/hayu-alrawda/",
    badge: "عائلات عريقة",
    icon: "fa-house-user",
    iconBg: "from-orange-600 to-red-700",
    summary: "طريق خريص والدائري الشرقي، نقل الفلل العائلية الكبيرة والمجالس الواسعة بأسطول دينا مجهز وطواقم نجارين."
  },
  {
    category: "east-central",
    name: "نقل عفش حي الخليج",
    link: "/areas/hayu-alkhalij/",
    badge: "شرق الرياض",
    icon: "fa-arrows-split-up-and-left",
    iconBg: "from-cyan-600 to-teal-700",
    summary: "طريق الملك عبدالله والشيخ جابر، فك وتركيب غرف النوم وتغليف الأجهزة الكهربائية بأسعار منافسة وجودة معتمدة."
  },
  {
    category: "east-central",
    name: "نقل عفش حي إشبيلية",
    link: "/areas/hayu-ishbiliya/",
    badge: "مخططات منظمة",
    icon: "fa-table-cells-large",
    iconBg: "from-indigo-600 to-violet-700",
    summary: "قرب محطة قطار سار وطريق الدمام، نقل أثاث الفلل الدوبلكس والشقق العائلية بأيدي عمالة نظامية متمرسة."
  },
  {
    category: "east-central",
    name: "نقل عفش حي المونسية",
    link: "/areas/hayu-almonsiya/",
    badge: "شمال شرق",
    icon: "fa-train-subway",
    iconBg: "from-amber-600 to-yellow-700",
    summary: "طريق الدمام السريع والتخصصي، استجابة سريعة للفلل المودرن والتاون هاوس وتوفير كراتين تعبئة مجانية."
  },
  {
    category: "east-central",
    name: "نقل عفش حي الرمال",
    link: "/areas/hayu-alrimal/",
    badge: "مخططات فسيحة",
    icon: "fa-dune",
    iconBg: "from-yellow-600 to-amber-700",
    summary: "الجنادرية والواحة والتعمير، سيارات دينا مقفلة لحماية الأثاث من الغبار، ونقل الفلل والاستراحات الواسعة."
  },
  {
    category: "east-central",
    name: "نقل عفش حي النسيم",
    link: "/areas/hayu-alnasim/",
    badge: "باقات اقتصادية",
    icon: "fa-hand-holding-dollar",
    iconBg: "from-green-600 to-emerald-800",
    summary: "النسيم الغربي والشرقي وشارع سعد بن أبي وقاص، نقل سريع وأسعار اقتصادية تناسب ميزانيتك مع الحفاظ التام على الأثاث."
  },
  {
    category: "east-central",
    name: "نقل عفش شرق الرياض",
    link: "/east-riyadh-moving/",
    badge: "تغطية الشرق",
    icon: "fa-compass-drafting",
    iconBg: "from-blue-600 to-cyan-700",
    summary: "خدمة متكاملة تغطي كافة أحياء شرق الرياض (الروضة، الخليج، إشبيلية، النسيم، المونسية، الرمال، واليرموك)."
  },
  {
    category: "east-central",
    name: "نقل عفش غرب الرياض",
    link: "/west-riyadh-moving/",
    badge: "تغطية الغرب",
    icon: "fa-map",
    iconBg: "from-slate-700 to-slate-900",
    summary: "خدمات نقل الأثاث في أحياء غرب الرياض (البديعة، السويدي، ظهرة لبن، وطويق) بسيارات دينا وعمالة ماهرة."
  }
];

// Generate static HTML for all cards
const staticCardsHTML = allCards.map(c => `
    <div class="area-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary flex flex-col justify-between group" data-category="${c.category}">
        <div>
            <!-- Header: Icon & Category Badge -->
            <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${c.iconBg} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <i class="fas ${c.icon}"></i>
                </div>
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                    ${c.badge}
                </span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-primary mb-2.5 group-hover:text-secondary transition-colors">
                <a href="${c.link}" class="hover:text-secondary transition-colors">${c.name}</a>
            </h3>

            <!-- Summary -->
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
                ${c.summary}
            </p>
        </div>

        <!-- Footer: Features & Read More Button -->
        <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span class="text-xs text-gray-400 font-medium">
                <i class="fas fa-check-circle text-green-500 ml-1"></i> فك • تغليف • نقل
            </span>
            <a href="${c.link}" 
                class="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-amber-700 group-hover:translate-x-[-4px] transition-all">
                قراءة المزيد <i class="fas fa-arrow-left text-xs"></i>
            </a>
        </div>
    </div>
`).join('\n');

// Replace cardsGrid content in html
const cardsGridRegex = /<div id="cardsGrid"[^>]*>[\s\S]*?<\/div>/i;
const newCardsGrid = `<div id="cardsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">\n${staticCardsHTML}\n            </div>`;
html = html.replace(cardsGridRegex, newCardsGrid);

// Update BreadcrumbList schema inside JSON-LD
const hubSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": "https://alkaleej-moving.com/#movingcompany",
      "name": "شركة الخليج لنقل العفش بين المدن وأحياء الرياض",
      "url": "https://alkaleej-moving.com/areas/",
      "telephone": "+966503430106",
      "logo": "https://alkaleej-moving.com/assets/img/gulf.webp",
      "image": "https://alkaleej-moving.com/assets/img/furniture-moving-in-riyadh.webp",
      "description": "شركة رائدة في نقل العفش بين المدن وجميع أحياء الرياض، توفر خدمات فك وتركيب وتغليف الأثاث وشحنه بسيارات دينا مجهزة.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "الرياض",
        "addressLocality": "الرياض",
        "addressRegion": "منطقة الرياض",
        "addressCountry": "SA"
      },
      "areaServed": [
        "الرياض", "حي النرجس", "حي الياسمين", "حي الملقا", "حي الصحافة",
        "حي حطين", "حي العقيق", "حي العارض", "حي القيروان", "حي الربيع",
        "حي العليا", "حي الروضة", "حي الخليج", "حي إشبيلية", "حي الرمال",
        "حي النسيم", "حي المونسية", "جدة", "الدمام", "الخبر", "القصيم", "مكة المكرمة"
      ],
      "priceRange": "$$"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "الرئيسية",
          "item": "https://alkaleej-moving.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "دليل الأحياء ومناطق الخدمة",
          "item": "https://alkaleej-moving.com/areas/"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://alkaleej-moving.com/areas/#webpage",
      "url": "https://alkaleej-moving.com/areas/",
      "name": "نقل العفش بين المدن وأحياء الرياض | شركة الخليج",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://alkaleej-moving.com/#website",
        "url": "https://alkaleej-moving.com/",
        "name": "شركة الخليج لنقل العفش بالرياض"
      },
      "description": "دليل خدمات نقل العفش بين المدن وكافة أحياء الرياض من شركة الخليج لنقل وتغليف الأثاث."
    }
  ]
};

html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
  `<script type="application/ld+json">\n${JSON.stringify(hubSchema, null, 2)}\n    </script>`);

// Update client-side filter function to simply toggle visibility of static cards
const filterScriptRegex = /function filterAreas\(category\)[\s\S]*?renderAreaCards\(category\);[\s\S]*?}/i;
const newFilterScript = `function filterAreas(category) {
            activeFilter = category;
            
            // تحديث تصميم أزرار الفلترة
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                btn.classList.remove('bg-secondary', 'text-white', 'shadow-md');
                btn.classList.add('bg-white', 'text-gray-700');
            });

            if (event && event.target) {
                const targetBtn = event.target.closest('.filter-btn');
                if (targetBtn) {
                    targetBtn.classList.remove('bg-white', 'text-gray-700');
                    targetBtn.classList.add('bg-secondary', 'text-white', 'shadow-md');
                }
            }

            // إظهار وإخفاء الكروت المعروضة في الصفحة
            const cards = document.querySelectorAll('.area-card');
            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }`;

html = html.replace(filterScriptRegex, newFilterScript);

fs.writeFileSync(hubFile, html, 'utf8');
console.log('Successfully updated areas/index.html with pre-rendered crawlable cards and schema!');

