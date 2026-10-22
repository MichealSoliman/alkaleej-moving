const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MovingCompany", "LocalBusiness"],
      "@id": "https://alkaleej-moving.com/#movingcompany",
      "name": "شركة الخليج لنقل العفش بالرياض",
      "alternateName": "شركة الخليج لنقل وتغليف الأثاث بالرياض",
      "url": "https://alkaleej-moving.com/",
      "logo": "https://alkaleej-moving.com/assets/img/gulf.webp",
      "image": "https://alkaleej-moving.com/assets/img/furniture-moving-in-riyadh.webp",
      "telephone": "+966503430106",
      "priceRange": "SAR",
      "description": "شركة نقل عفش بالرياض متخصصة في نقل وتغليف وفك وتركيب الأثاث السكني والمكتبي داخل وخارج الرياض بسيارات دينا مغلقة ومجهزة بأيدي فنية خبيرة.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136,
        "longitude": 46.6753
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Riyadh"
        },
        {
          "@type": "AdministrativeArea",
          "name": "منطقة الرياض"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "خدمات نقل العفش بالرياض",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://alkaleej-moving.com/#service1",
              "name": "نقل عفش بالرياض",
              "serviceType": "نقل الأثاث والعفش السكني والمكتبي",
              "provider": { "@id": "https://alkaleej-moving.com/#movingcompany" },
              "areaServed": { "@type": "City", "name": "Riyadh" },
              "description": "خدمات نقل العفش والأثاث للمنازل والفلل والمكاتب داخل أحياء الرياض بسيارات دينا مغلقة."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://alkaleej-moving.com/#service2",
              "name": "فك وتركيب الأثاث بالرياض",
              "serviceType": "فك وتركيب الأثاث",
              "provider": { "@id": "https://alkaleej-moving.com/#movingcompany" },
              "areaServed": { "@type": "City", "name": "Riyadh" },
              "description": "فك وإعادة تركيب غرف النوم والمطابخ والمكاتب بأيدي نجارين محترفين."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://alkaleej-moving.com/#service3",
              "name": "تغليف العفش بالرياض",
              "serviceType": "تغليف الأثاث",
              "provider": { "@id": "https://alkaleej-moving.com/#movingcompany" },
              "areaServed": { "@type": "City", "name": "Riyadh" },
              "description": "تغليف وحماية الأثاث والمقتنيات الثمينة بالكرتون المقوى والفقاعات الهوائية والنايلون."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://alkaleej-moving.com/#service4",
              "name": "تخزين الأثاث بالرياض",
              "serviceType": "تخزين الأثاث",
              "provider": { "@id": "https://alkaleej-moving.com/#movingcompany" },
              "areaServed": { "@type": "City", "name": "Riyadh" },
              "description": "مستودعات تخزين أثاث آمنة ومعزولة ومراقبة بالكاميرات على مدار 24 ساعة."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://alkaleej-moving.com/#website",
      "url": "https://alkaleej-moving.com/",
      "name": "شركة الخليج لنقل العفش بالرياض",
      "description": "الموقع الرسمي لشركة الخليج لخدمات نقل وتغليف وتخزين الأثاث بالرياض",
      "publisher": {
        "@id": "https://alkaleej-moving.com/#movingcompany"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://alkaleej-moving.com/#webpage",
      "url": "https://alkaleej-moving.com/",
      "name": "نقل عفش الرياض | شركة الخليج لنقل وتغليف الأثاث بالرياض",
      "isPartOf": {
        "@id": "https://alkaleej-moving.com/#website"
      },
      "about": {
        "@id": "https://alkaleej-moving.com/#movingcompany"
      },
      "description": "شركة نقل عفش بالرياض تقدم خدمات فك وتركيب وتغليف الأثاث السكني والمكتبي بسيارات دينا مجهزة وعمالة مدربة بأسعار تنافسية. اتصل الآن 0503430106."
    },
    {
      "@type": "FAQPage",
      "@id": "https://alkaleej-moving.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "كم سعر نقل العفش بالرياض؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "تختلف الأسعار بناءً على كمية الأثاث، المسافة بين المنزلين، وحجم التغليف المطلوب. تبدأ أسعار دينا نقل العفش من 250 ريال، ونوفر معاينة مجانية لتحديد السعر الدقيق."
          }
        },
        {
          "@type": "Question",
          "name": "هل توفرون خدمة فك وتركيب المكيفات؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نوفر فنيين تكييف متخصصين لفك وتركيب المكيفات (الاسبليت والشباك) باحترافية عالية لضمان عدم حدوث تسريب للفريون."
          }
        },
        {
          "@type": "Question",
          "name": "هل تقومون بنقل العفش خارج الرياض؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نقدم خدمات الشحن والنقل البري للأثاث من الرياض إلى كافة مدن المملكة مثل جدة، الدمام، القصيم، وخميس مشيط بأسطول شاحنات مجهز."
          }
        },
        {
          "@type": "Question",
          "name": "ما هي المواد المستخدمة في تغليف الأثاث؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نستخدم الكرتون المقوى، رول الفقاعات (البابلز)، الاسترتش الحراري، والبطانيات لحماية الأثاث الحساس والتحف من الخدوش أو الكسر."
          }
        },
        {
          "@type": "Question",
          "name": "كم يستغرق نقل عفش الشقة بالكامل؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "غالباً ما تستغرق العملية من 3 إلى 6 ساعات، ويعتمد ذلك على كمية الأثاث والطابق الذي يتم النقل منه وإليه وتوفر المصعد."
          }
        },
        {
          "@type": "Question",
          "name": "هل يتم نقل العفش داخل جميع أحياء الرياض؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نغطي بخدماتنا كافة أحياء شمال، شرق، غرب، وجنوب الرياض، مع توفير سيارات مجهزة للوصول إلى أي موقع بسرعة."
          }
        },
        {
          "@type": "Question",
          "name": "كيف يمكنني حجز سيارة دينا لنقل العفش؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يمكنك الحجز بسهولة عبر الاتصال المباشر برقم خدمة العملاء أو إرسال تفاصيل منقولاتك عبر واتساب ليتم تنسيق الموعد وتحديد السعر مباشرة."
          }
        },
        {
          "@type": "Question",
          "name": "هل يوجد ضمان على العفش أثناء النقل؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نقدم ضماناً شاملاً ضد الخدش والكسر أثناء عمليات النقل والتحميل والتنزيل لضمان راحة بال العميل."
          }
        },
        {
          "@type": "Question",
          "name": "هل يمكنكم فك وتركيب المطابخ؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، لدينا نجارين متخصصين في فك المطابخ الخشبية وتعديلها وإعادة تركيبها في المنزل الجديد، وكذلك مطابخ الألمنيوم."
          }
        },
        {
          "@type": "Question",
          "name": "هل يجب علي ترتيب الملابس قبل النقل؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن نوفر كراتين مخصصة للملابس (دواليب كرتونية)، يمكننا ترتيب وتغليف الملابس بالكامل إذا طلبت خدمة التغليف الشامل."
          }
        },
        {
          "@type": "Question",
          "name": "كيف يتم التعامل مع التحف والزجاج والأشياء الثمينة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يتم تغليف الزجاج والتحف بخامات فوم وفقاعات هوائية قوية، ثم توضع في كراتين مقواة مبطنة لامتصاص الصدمات وتحمل ملصقات \"قابل للكسر\"."
          }
        },
        {
          "@type": "Question",
          "name": "هل العمالة لديكم مدربة؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "بالتأكيد، نمتلك عمالة محترفة ومدربة على أعلى المستويات للتعامل مع كافة أنواع الأثاث وطرق الحمل والنقل الصحيحة في الممرات الضيقة."
          }
        },
        {
          "@type": "Question",
          "name": "متى يجب حجز موعد لنقل العفش؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يفضل الحجز قبل موعد النقل بيوم أو يومين لضمان توفير الفريق المناسب والسيارة في الوقت الذي تفضله، خاصة في عطلات نهاية الأسبوع."
          }
        },
        {
          "@type": "Question",
          "name": "هل تقدمون خدمات نقل المكاتب والشركات بالرياض؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نقوم بنقل المكاتب، الشركات، المعارض والمستودعات مع الحفاظ على الأجهزة الإلكترونية والمستندات بسرية وأمان تام وتنظيم عالي."
          }
        },
        {
          "@type": "Question",
          "name": "هل سيارات النقل لديكم مغلقة (دينات مغلقة)؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، أسطولنا بالكامل عبارة عن دينا نقل عفش مغلقة لحماية الأثاث من أشعة الشمس، الغبار، والأمطار أثناء رحلة النقل."
          }
        },
        {
          "@type": "Question",
          "name": "ماذا أفعل إذا كان هناك أثاث غير مستخدم وأريد التخلص منه؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "يمكننا التنسيق لنقل الأثاث الفائض إلى الجمعيات الخيرية أو التخلص منه بطرق صديقة للبيئة بناءً على طلب العميل."
          }
        },
        {
          "@type": "Question",
          "name": "هل توفرون خدمة تخزين الأثاث بالرياض؟",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، نمتلك مستودعات آمنة، معزولة، ومراقبة بالكاميرات على مدار 24 ساعة لتخزين العفش لفترات قصيرة أو طويلة بأسعار مميزة."
          }
        }
      ]
    }
  ]
};

const jsonStr = JSON.stringify(schema, null, 2);
JSON.parse(jsonStr);
console.log('Schema JSON validation SUCCESS! Total characters:', jsonStr.length);
require('fs').writeFileSync('scratch/validated_schema.json', jsonStr);
