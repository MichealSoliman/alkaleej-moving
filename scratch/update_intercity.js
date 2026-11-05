const fs = require('fs');
const path = require('path');

// 1. Update riyadh-to-jeddah
const jeddahPath = path.join(__dirname, '..', 'areas', 'riyadh-to-jeddah', 'index.html');
let jeddahHtml = fs.readFileSync(jeddahPath, 'utf8');

// Title
jeddahHtml = jeddahHtml.replace(/<title>[\s\S]*?<\/title>/i, 
  `<title>نقل عفش من الرياض إلى جدة | دينا نقل أثاث وشحن آمن | شركة الخليج</title>`);

// Meta description
jeddahHtml = jeddahHtml.replace(/<meta[^>]*name=["']description["'][^>]*content=["'][\s\S]*?["']/i,
  `<meta name="description" content="أفضل شركة نقل عفش من الرياض إلى جدة بأسعار تبدأ من 2000 ريال. شحن أثاث منزلك ومكتبك بأمان لمسافة 950 كم مع فك وتركيب وتغليف احترافي وضمان وصول شامل.">`);

// H1
jeddahHtml = jeddahHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i,
  `<h1 class="text-3xl md:text-4xl font-bold mb-4">نقل عفش من الرياض إلى جدة – شحن آمن واحترافي بأسعار تبدأ من 2000 ريال</h1>`);

// Schemas: Inject BreadcrumbList and FAQPage into JSON-LD
const jeddahSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "نقل عفش من الرياض إلى جدة",
      "serviceType": "Intercity Moving and Shipping",
      "description": "شركة نقل عفش من الرياض إلى جدة تقدم خدمات فك وتركيب وتغليف ونقل الأثاث بسيارات دينا مجهزة للمسافات الطويلة مع ضمان سلامة المنقولات.",
      "provider": {
        "@type": "MovingCompany",
        "@id": "https://alkaleej-moving.com/#movingcompany",
        "name": "شركة الخليج لنقل العفش",
        "url": "https://alkaleej-moving.com/",
        "logo": "https://alkaleej-moving.com/assets/img/gulf.webp",
        "image": "https://alkaleej-moving.com/assets/img/riyadh-to-jeddah.webp",
        "telephone": "+966503430106",
        "priceRange": "SAR 2000 - SAR 7500",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "الرياض",
          "addressLocality": "الرياض",
          "addressRegion": "منطقة الرياض",
          "addressCountry": "SA"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "الرياض" },
        { "@type": "City", "name": "جدة" }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://alkaleej-moving.com/areas/riyadh-to-jeddah/"
      }
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
          "name": "دليل النقل بين المدن والأحياء",
          "item": "https://alkaleej-moving.com/areas/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "نقل عفش من الرياض إلى جدة",
          "item": "https://alkaleej-moving.com/areas/riyadh-to-jeddah/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "كم سعر نقل العفش من الرياض إلى جدة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تبدأ أسعار نقل العفش من الرياض إلى جدة من 2000 ريال للشقة الصغيرة وتصل إلى 3,500 - 4,500 ريال للشقق الكبيرة والفلل، شاملة الفك والتغليف المزدوج والشحن بأسطول دينا مقفل ومجهز للمسافات الطويلة."
          }
        },
        {
          "@type": "Question",
          "name": "كم تستغرق رحلة نقل الأثاث من الرياض إلى جدة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تستغرق الرحلة البرية للشاحنة من 10 إلى 14 ساعة عبر طريق الحجاز السريع (طريق 40)، ويتم عادة تسليم وتركيب العفش داخل منزلك بجدة خلال 24 إلى 48 ساعة من موعد التحميل."
          }
        },
        {
          "@type": "Question",
          "name": "هل تقدمون خدمة فك وتركيب الأثاث في جدة أيضاً؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، تتضمن الخدمة فك الأثاث بالرياض وإعادة تركيبه بالكامل في مسكنك بجدة بواسطة طاقم نجارين وفنيين متخصصين لضمان تسليم المنزل جاهزاً للسكن."
          }
        },
        {
          "@type": "Question",
          "name": "كيف تحمون الأثاث الخشبي والمفروشات من رطوبة جدة الساحلية؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نستخدم تقنيات التغليف الثلاثي العازل للرطوبة والغبار (نايلون استرتش حراري محكم، رولات فقاعات سميكة، وبطانيات عازلة) لمنع أي تأثير للرطوبة أو اهتزازات الطريق السريع."
          }
        },
        {
          "@type": "Question",
          "name": "هل توفرون عقداً رسمياً وضماناً شاملاً ضد الكسر أو الفقدان؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، يتم توقيع عقد نقل رسمي يتضمن قائمة حصر المنقولات مع ضمان معتمد يغطي سلامة كافة القطع والأجهزة طوال مسار الشحن والتسليم."
          }
        }
      ]
    }
  ]
};

jeddahHtml = jeddahHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
  `<script type="application/ld+json">\n${JSON.stringify(jeddahSchema, null, 2)}\n    </script>`);

fs.writeFileSync(jeddahPath, jeddahHtml, 'utf8');
console.log('Successfully updated riyadh-to-jeddah/index.html');

// 2. Update riyadh-to-dammam
const dammamPath = path.join(__dirname, '..', 'areas', 'riyadh-to-dammam', 'index.html');
let dammamHtml = fs.readFileSync(dammamPath, 'utf8');

// Schemas: Add BreadcrumbList to riyadh-to-dammam JSON-LD
const dammamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": "https://alkaleej-moving.com/#movingcompany",
      "name": "شركة الخليج لنقل العفش",
      "url": "https://alkaleej-moving.com/areas/riyadh-to-dammam/",
      "telephone": "+966503430106",
      "logo": "https://alkaleej-moving.com/assets/img/gulf.webp",
      "image": "https://alkaleej-moving.com/assets/img/furniture-moving-in-riyadh.webp",
      "description": "نقل عفش من الرياض للدمام، ونقل أثاث من الرياض للخبر، مع إمكانية تنسيق دينا نقل عفش الرياض الشرقية.",
      "areaServed": [
        { "@type": "City", "name": "الرياض" },
        { "@type": "City", "name": "الدمام" },
        { "@type": "City", "name": "الخبر" },
        { "@type": "City", "name": "الظهران" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "الرياض",
        "addressRegion": "منطقة الرياض",
        "addressCountry": "SA"
      }
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
          "name": "دليل النقل بين المدن والأحياء",
          "item": "https://alkaleej-moving.com/areas/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "نقل عفش من الرياض للدمام",
          "item": "https://alkaleej-moving.com/areas/riyadh-to-dammam/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "كم يستغرق نقل العفش من الرياض إلى الدمام أو الخبر؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تستغرق رحلة الطريق بين الرياض والدمام حوالي 4 إلى 5 ساعات عبر طريق الدمام السريع، ويتم التوصيل والتركيب في نفس اليوم أو خلال 24 ساعة كحد أقصى."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي أسعار دينا نقل عفش الرياض الدمام؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تبدأ الأسعار من 1,500 ريال للشقق الصغيرة وتتراوح بين 2,200 إلى 3,200 ريال للشقق العائلية والفلل حسب حجم الأثاث ومستوى التغليف والتركيب المطلوب."
          }
        },
        {
          "@type": "Question",
          "name": "هل تغطون مدن الخبر والظهران والجبيل أيضاً؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، تشمل خدمتنا حاضرة الدمام بالكامل: مدينة الدمام، الخبر، الظهران، الجبيل، والقطيف بسيارات دينا مقفلة ومجهزة."
          }
        },
        {
          "@type": "Question",
          "name": "كيف يتم حماية الأثاث من الرطوبة والرياح على طريق الدمام السريع؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نقوم بتغليف الأثاث بالبلاستيك الفقاعي والاسترتش المحكم العازل للأتربة والرطوبة، ونقله داخل دينا بصندوق مقفل معزول تماماً ومزود بأحزمة تثبيت."
          }
        }
      ]
    }
  ]
};

dammamHtml = dammamHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
  `<script type="application/ld+json">\n${JSON.stringify(dammamSchema, null, 2)}\n    </script>`);

fs.writeFileSync(dammamPath, dammamHtml, 'utf8');
console.log('Successfully updated riyadh-to-dammam/index.html');

