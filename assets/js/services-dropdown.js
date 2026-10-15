document.addEventListener("DOMContentLoaded", () => {
    // 1. Define all root-level services (files/folders next to index.html)
    const services = [
        { name: "نقل عفش بالرياض", path: "best-furniture-moving-company-riyadh/" },
        { name: "تغليف الأثاث بالرياض", path: "furniture-packing-in-riyadh/" },
        { name: "تخزين الأثاث بالرياض", path: "furniture-storage-in-riyadh/" },
        { name: "دينا نقل عفش بالرياض", path: "furniture-moving-truck-in-riyadh/" },
        { name: "تركيب أثاث ايكيا بالرياض", path: "ikea-furniture-assembly-in-riyadh/" },
        { name: "نقل شقق بالرياض", path: "moving-apartments-in-riyadh/" },
        { name: "نقل قصور بالرياض", path: "moving-palaces-in-riyadh/" },
        { name: "نقل مكاتب بالرياض", path: "office-transportation-in-riyadh/" },
        { name: "نقل مستودعات بالرياض", path: "warehouse-relocation-in-riyadh/" },
        { name: "أفضل شركة نقل عفش الرياض", path: "best-furniture-moving-company-riyadh/" },
        { name: "فك وتركيب غرف النوم", path: "furniture-disassembly-assembly-riyadh/" },
        { name: "نقل عفش فلل بالرياض", path: "services/villa-furniture-moving-in-riyadh/" },
        { name: " نقل عفش شرق الرياض", path: "east-riyadh-moving/" },
        { name: " نقل عفش غرب الرياض", path: "west-riyadh-moving/" }
    ];

    // 2. Detect path prefix using this script's path
    const currentScript = document.querySelector('script[src*="services-dropdown.js"]');
    let prefix = '';
    if (currentScript) {
        const src = currentScript.getAttribute('src');
        const index = src.indexOf('assets/js/services-dropdown.js');
        if (index >= 0) {
            prefix = src.substring(0, index);
        }
    }

    // 3. Find and replace all desktop & mobile "خدماتنا" links
    const links = Array.from(document.querySelectorAll('nav a, #navbar a')).filter(
        a => a.textContent.trim() === 'خدماتنا'
    );

    links.forEach(originalLink => {
        const isMobile = originalLink.closest('#mobile-menu') !== null;
        const originalClasses = originalLink.className;

        if (isMobile) {
            // Build Mobile Accordion
            const wrapper = document.createElement('div');
            wrapper.className = 'w-full px-2';

            const button = document.createElement('button');
            button.className = `${originalClasses} flex items-center justify-between w-full py-2 text-right focus:outline-none`;
            button.innerHTML = `
                <span>خدماتنا</span>
                <i class="fas fa-chevron-down text-xs transition-transform duration-200"></i>
            `;

            const submenu = document.createElement('div');
            submenu.className = 'hidden flex-col space-y-1 mt-1 pr-4 border-r border-gray-200';

            services.forEach(service => {
                const a = document.createElement('a');
                a.href = `${prefix}${service.path}`;
                a.className = `${originalClasses.replace('py-2', '').replace('block', '')} py-1.5 text-sm hover:text-secondary block`;
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
            originalLink.parentNode.replaceChild(wrapper, originalLink);
        } else {
            // Build Desktop Mega Dropdown
            const wrapper = document.createElement('div');
            wrapper.className = 'relative group inline-block services-dropdown-wrapper';

            const trigger = document.createElement('a');
            trigger.href = `${prefix}services/`;
            trigger.className = `${originalClasses} flex items-center gap-1 focus:outline-none py-2`;
            trigger.innerHTML = `
                <span>خدماتنا</span>
                <i class="fas fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
            `;

            const dropdown = document.createElement('div');
            dropdown.className = `services-dropdown-menu absolute right-0 mt-2 bg-white text-gray-800 rounded-2xl shadow-2xl p-4 z-50 border border-gray-100 grid grid-cols-2 gap-2 text-right`;
            dropdown.style.cssText = 'min-width: 480px; width: 480px; max-width: 90vw; right: 0; left: auto; display: none; opacity: 0; visibility: hidden; pointer-events: none;';

            services.forEach(service => {
                const a = document.createElement('a');
                a.href = `${prefix}${service.path}`;
                a.className = 'flex items-center justify-start px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-secondary hover:bg-orange-50 transition-all duration-200 whitespace-nowrap';
                a.innerHTML = `
                    <i class="fas fa-angle-double-left text-xs text-secondary ml-2 flex-shrink-0"></i>
                    <span class="whitespace-nowrap">${service.name}</span>
                `;
                dropdown.appendChild(a);
            });

            // Hover JS events with buffer timer & hover bridge
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
                }, 200); // 200ms buffer keeps menu open while cursor moves down!
            };

            wrapper.addEventListener('mouseenter', openMenu);
            wrapper.addEventListener('mouseleave', closeMenu);
            dropdown.addEventListener('mouseenter', openMenu);
            dropdown.addEventListener('mouseleave', closeMenu);

            wrapper.appendChild(trigger);
            wrapper.appendChild(dropdown);
            originalLink.parentNode.replaceChild(wrapper, originalLink);
        }
    });
});



