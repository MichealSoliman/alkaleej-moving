/**
 * شركة الخليج لنقل العفش بالرياض
 * Components Loader & Navigation Manager
 * Centralized Navbar & Footer Management
 */

(function () {
  'use strict';

  // Define Services list for the Mega Dropdown & Mobile Menu
  const SERVICES_LIST = [
    { name: "نقل عفش بالرياض", path: "/best-furniture-moving-company-riyadh/" },
    { name: "تغليف الأثاث بالرياض", path: "/furniture-packing-in-riyadh/" },
    { name: "تخزين الأثاث بالرياض", path: "/furniture-storage-in-riyadh/" },
    { name: "دينا نقل عفش بالرياض", path: "/furniture-moving-truck-in-riyadh/" },
    { name: "تركيب أثاث ايكيا بالرياض", path: "/ikea-furniture-assembly-in-riyadh/" },
    { name: "نقل شقق بالرياض", path: "/moving-apartments-in-riyadh/" },
    { name: "نقل قصور بالرياض", path: "/moving-palaces-in-riyadh/" },
    { name: "نقل مكاتب بالرياض", path: "/office-transportation-in-riyadh/" },
    { name: "نقل مستودعات بالرياض", path: "/warehouse-relocation-in-riyadh/" },
    { name: "أفضل شركة نقل عفش الرياض", path: "/best-furniture-moving-company-riyadh/" },
    { name: "فك وتركيب غرف النوم", path: "/furniture-disassembly-assembly-riyadh/" },
    { name: "نقل عفش فلل بالرياض", path: "/services/villa-furniture-moving-in-riyadh/" },
    { name: "نقل عفش شرق الرياض", path: "/east-riyadh-moving/" },
    { name: "نقل عفش غرب الرياض", path: "/west-riyadh-moving/" }
  ];

  // Resolve root prefix based on script location or directory depth
  function getRootPrefix() {
    const script = document.querySelector('script[src*="components.js"]');
    if (script) {
      const src = script.getAttribute('src');
      const idx = src.indexOf('assets/js/components.js');
      if (idx >= 0) {
        const prefix = src.substring(0, idx);
        return prefix || './';
      }
    }

    // Fallback: directory depth from pathname
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const parts = path ? path.split('/') : [];
    if (parts.length > 0 && parts[parts.length - 1].includes('.')) {
      parts.pop();
    }
    if (parts.length > 0) {
      return '../'.repeat(parts.length);
    }
    return './';
  }

  const rootPrefix = getRootPrefix();

  // Adjust an individual path by prefixing it with rootPrefix
  function adjustPath(p, prefix) {
    if (!p) return p;
    if (
      p.startsWith('http://') ||
      p.startsWith('https://') ||
      p.startsWith('//') ||
      p.startsWith('tel:') ||
      p.startsWith('mailto:') ||
      p.startsWith('javascript:') ||
      p.startsWith('#')
    ) {
      return p;
    }
    let norm = prefix || './';
    if (!norm.endsWith('/')) norm += '/';
    if (p === '/') return norm;
    if (p.startsWith('/')) return norm + p.substring(1);
    return norm + p;
  }

  // Adjust all internal paths in component HTML (href and src) according to page depth
  function adjustComponentPaths(html, prefix) {
    if (!html) return html;
    let norm = prefix || './';
    if (!norm.endsWith('/')) norm += '/';

    return html
      // 1. href="/" or href="/#hash"
      .replace(/href="\/(#[^"]*)?"/g, (match, hash) => {
        return `href="${norm}${hash || ''}"`;
      })
      // 2. href="/something" (excluding external protocols, mailto, tel, etc.)
      .replace(/href="\/([^\/"][^"]*)"/g, (match, path) => {
        return `href="${norm}${path}"`;
      })
      // 3. src="/something" (images, icons, etc.)
      .replace(/src="\/([^\/"][^"]*)"/g, (match, path) => {
        return `src="${norm}${path}"`;
      });
  }

  // Helper to fetch component with fallback
  async function fetchComponent(componentName) {
    const urls = [
      `${rootPrefix}components/${componentName}`,
      `/components/${componentName}`,
      `../../components/${componentName}`,
      `../components/${componentName}`,
      `components/${componentName}`
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return await response.text();
        }
      } catch (e) {
        // Try next URL
      }
    }
    console.warn(`[Components] Could not load ${componentName} from standard paths.`);
    return null;
  }

  // Load Navbar
  async function loadNavbar() {
    const container = document.getElementById('site-navbar');
    if (!container) return;

    let html = await fetchComponent('navbar.html');
    if (html) {
      // Adjust all links & assets according to current page's location
      html = adjustComponentPaths(html, rootPrefix);
      container.innerHTML = html;
      initNavbarInteractions();
      initServicesDropdown();
      initActiveNavigation();
    }
  }

  // Load Footer
  async function loadFooter() {
    const container = document.getElementById('site-footer');
    if (!container) return;

    let html = await fetchComponent('footer.html');
    if (html) {
      // Adjust all links & assets according to current page's location
      html = adjustComponentPaths(html, rootPrefix);
      container.innerHTML = html;
    }
  }

  // Initialize Navbar Scroll & Mobile Menu
  function initNavbarInteractions() {
    const navbar = document.getElementById('navbar');
    let menuBtn = document.getElementById('mobile-menu-btn') || document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar) return;

    // Ensure solid dark navbar by default
    navbar.style.backgroundColor = '#0f172a';

    function handleScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Menu Toggle with pristine event binding
    if (menuBtn && mobileMenu) {
      // Clone button to strip any legacy or conflicting external event listeners
      const freshBtn = menuBtn.cloneNode(true);
      if (menuBtn.parentNode) {
        menuBtn.parentNode.replaceChild(freshBtn, menuBtn);
        menuBtn = freshBtn;
      }

      function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'block';
        mobileMenu.style.maxHeight = 'none';
        menuBtn.setAttribute('aria-expanded', 'true');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-times';
      }

      function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }

      menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'none';
        if (isHidden) {
          openMobileMenu();
        } else {
          closeMobileMenu();
        }
      });

      // Close menu on navigation link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close menu on click outside
      document.addEventListener('click', function (e) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
          if (!mobileMenu.classList.contains('hidden') && mobileMenu.style.display !== 'none') {
            closeMobileMenu();
          }
        }
      });

      // Close menu on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && (!mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'block')) {
          closeMobileMenu();
        }
      });
    }
  }

  // Initialize Desktop & Mobile Services Mega Menu
  function initServicesDropdown() {
    const serviceLinks = Array.from(document.querySelectorAll('#navbar a, #site-navbar a')).filter(
      a => a.textContent.trim() === 'خدماتنا'
    );

    serviceLinks.forEach(originalLink => {
      const isMobile = originalLink.closest('#mobile-menu') !== null;
      const originalClasses = originalLink.className;

      if (isMobile) {
        // Build Mobile Accordion
        const wrapper = document.createElement('div');
        wrapper.className = 'w-full';

        const button = document.createElement('button');
        button.className = `${originalClasses} flex items-center justify-between w-full py-2 text-right focus:outline-none border-b border-white/5`;
        button.innerHTML = `
          <span>خدماتنا</span>
          <i class="fas fa-chevron-down text-xs transition-transform duration-200"></i>
        `;

        const submenu = document.createElement('div');
        submenu.className = 'hidden flex-col space-y-1 mt-1 pr-4 border-r-2 border-secondary/40';

        SERVICES_LIST.forEach(service => {
          const a = document.createElement('a');
          a.href = adjustPath(service.path, rootPrefix);
          a.className = 'py-1.5 text-sm text-gray-300 hover:text-secondary block no-underline transition-colors';
          a.textContent = service.name;
          submenu.appendChild(a);
        });

        button.addEventListener('click', (e) => {
          e.preventDefault();
          const isHidden = submenu.classList.contains('hidden');
          const chevron = button.querySelector('i');
          if (isHidden) {
            submenu.classList.remove('hidden');
            submenu.classList.add('flex');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
          } else {
            submenu.classList.add('hidden');
            submenu.classList.remove('flex');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
          }
        });

        wrapper.appendChild(button);
        wrapper.appendChild(submenu);
        if (originalLink.parentNode) {
          originalLink.parentNode.replaceChild(wrapper, originalLink);
        }
      } else {
        // Build Desktop Mega Dropdown
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group inline-block services-dropdown-wrapper';

        const trigger = document.createElement('a');
        trigger.href = adjustPath('/services/', rootPrefix);
        trigger.className = `${originalClasses} flex items-center gap-1.5 focus:outline-none py-2 cursor-pointer`;
        trigger.innerHTML = `
          <span>خدماتنا</span>
          <i class="fas fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180 text-white/80"></i>
        `;

        const dropdown = document.createElement('div');
        dropdown.className = 'services-dropdown-menu absolute right-0 mt-2 text-white rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-2 gap-2 text-right';
        dropdown.style.cssText = 'background-color: #0f172a !important; background: #0f172a !important; border: 1px solid #334155 !important; min-width: 480px; width: 480px; max-width: 90vw; right: 0; left: auto; display: none; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.2s ease, visibility 0.2s ease; box-shadow: 0 20px 30px rgba(0, 0, 0, 0.7) !important;';

        SERVICES_LIST.forEach(service => {
          const a = document.createElement('a');
          a.href = adjustPath(service.path, rootPrefix);
          a.className = 'flex items-center justify-start px-3 py-2 rounded-lg text-sm font-medium text-slate-100 hover:text-white transition-all duration-200 whitespace-nowrap no-underline';
          a.style.cssText = 'background-color: transparent; transition: background-color 0.15s ease, color 0.15s ease;';
          a.innerHTML = `
            <i class="fas fa-angle-double-left text-xs text-orange-400 ml-2 flex-shrink-0"></i>
            <span class="whitespace-nowrap">${service.name}</span>
          `;
          a.addEventListener('mouseenter', () => {
            a.style.backgroundColor = '#ea580c';
            a.style.color = '#ffffff';
          });
          a.addEventListener('mouseleave', () => {
            a.style.backgroundColor = 'transparent';
            a.style.color = '#f1f5f9';
          });
          dropdown.appendChild(a);
        });

        let hideTimeout;
        const openMenu = () => {
          clearTimeout(hideTimeout);
          dropdown.style.display = 'grid';
          requestAnimationFrame(() => {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.pointerEvents = 'auto';
          });
        };

        const closeMenu = () => {
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.pointerEvents = 'none';
            setTimeout(() => {
              if (dropdown.style.opacity === '0') {
                dropdown.style.display = 'none';
              }
            }, 200);
          }, 200);
        };

        wrapper.addEventListener('mouseenter', openMenu);
        wrapper.addEventListener('mouseleave', closeMenu);
        dropdown.addEventListener('mouseenter', openMenu);
        dropdown.addEventListener('mouseleave', closeMenu);

        wrapper.appendChild(trigger);
        wrapper.appendChild(dropdown);
        if (originalLink.parentNode) {
          originalLink.parentNode.replaceChild(wrapper, originalLink);
        }
      }
    });
  }

  // Active Navigation Highlighter
  function initActiveNavigation() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const navLinks = document.querySelectorAll('#navbar a[href]');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }

      const cleanHref = href.replace(/\/$/, '') || '/';

      let isActive = false;

      if (cleanHref === '/' && (path === '/' || path === '/index.html' || path === '')) {
        isActive = true;
      } else if (cleanHref !== '/' && (path === cleanHref || path.startsWith(cleanHref + '/'))) {
        isActive = true;
      }

      if (isActive) {
        link.classList.add('text-secondary', 'font-bold', 'active-nav-link');
        link.classList.remove('text-white');
      }
    });
  }

  // Initialize immediately or on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadNavbar();
      loadFooter();
    });
  } else {
    loadNavbar();
    loadFooter();
  }

  // Expose global methods for manual re-init if needed
  window.GulfComponents = {
    loadNavbar,
    loadFooter,
    initNavbarInteractions,
    initServicesDropdown,
    initActiveNavigation
  };
})();
