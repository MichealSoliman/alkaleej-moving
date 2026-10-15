/**
 * الخليج لنقل العفش والمكيفات - Main JavaScript File
 * ملف JavaScript الرئيسي للتفاعلات والأنيميشن
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initNavbar();
    initIntersectionObserver();
    initContactForm();
    initMobileMenu();
    initCardToggles();
    initLazyLoading();
    initFeatureCards();
    initTestimonials();
    
    // Analytics tracking
    trackPageView();
    
    console.log('✨ شركة الخليج - تم تهيئة الموقع بنجاح');
}

// ========================================
// 1. Sticky Navbar with Scroll Effect
// ========================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.remove('show');
                        mobileMenu.style.display = 'none';
                    }
                }
            }
        });
    });
}

// ========================================
// 2. Mobile Menu Toggle (Handled primarily by components.js)
// ========================================

function initMobileMenu() {
    // If components.js is present, it handles mobile menu bindings directly
    if (window.GulfComponents) {
        return;
    }
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.hasAttribute('data-initialized')) {
        mobileMenuBtn.setAttribute('data-initialized', 'true');
        mobileMenuBtn.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'none';
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
            }
        });
    }
}

// ========================================
// 3. Intersection Observer for Animations
// ========================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// 4. Contact Modal Controls
// ========================================

function openContactModal(serviceName = '') {
    const modal = document.getElementById('contact-modal');
    const serviceSelect = document.getElementById('modal-service');
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        if (serviceName && serviceSelect) {
            serviceSelect.value = serviceName;
        }
        
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
        
        trackEvent('contact_modal_opened', { service: serviceName });
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Close modal on backdrop click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactModal();
            }
        });
    }
});

// ========================================
// 5. Contact Form Submission & Validation
// ========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('modal-name').value,
                phone: document.getElementById('modal-phone').value,
                address: document.getElementById('modal-address').value,
                service: document.getElementById('modal-service').value,
                details: document.getElementById('modal-details').value,
                timestamp: new Date().toISOString()
            };
            
            if (!validateForm(formData)) {
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                closeContactModal();
                showSuccessToast();
                form.reset();
                trackEvent('form_submitted', formData);
            }, 1500);
        });
    }
}

function validateForm(formData) {
    if (formData.name.trim().length < 2) {
        alert('الرجاء إدخال اسم صحيح');
        return false;
    }
    
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        alert('الرجاء إدخال رقم جوال سعودي صحيح (05xxxxxxxx)');
        return false;
    }
    
    if (formData.address.trim().length < 5) {
        alert('الرجاء إدخال عنوان صحيح');
        return false;
    }
    
    if (!formData.service) {
        alert('الرجاء اختيار نوع الخدمة');
        return false;
    }
    
    return true;
}

function showSuccessToast() {
    const toast = document.getElementById('success-toast');
    if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.add('hidden');
            toast.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// 6. Analytics Tracking (GA / Facebook)
// ========================================

function trackPageView() {
    if (typeof gtag === 'function') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
        });
    }
    if (typeof fbq === 'function') {
        fbq('track', 'PageView');
    }
}

function trackEvent(eventName, eventData = {}) {
    console.log('Track Event:', eventName, eventData);
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventName, eventData);
    }
    if (window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...eventData
        });
    }
}

// ========================================
// 7. FAQ Accordion Handler
// ========================================

function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isActive = button.classList.contains('active');
    
    document.querySelectorAll('.faq-question').forEach(q => {
        if (q !== button) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('show');
            const qIcon = q.querySelector('i');
            if (qIcon) {
                qIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    if (isActive) {
        button.classList.remove('active');
        answer.classList.remove('show');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        button.setAttribute('aria-expanded', 'false');
    } else {
        button.classList.add('active');
        answer.classList.add('show');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        button.setAttribute('aria-expanded', 'true');
    }
}

// ========================================
// 8. Card Toggles & Lazy Loading
// ========================================

function initCardToggles() {
    document.querySelectorAll(".group").forEach((card) => {
        card.addEventListener("click", function (e) {
            if (!e.target.closest("a") && !e.target.closest("button")) {
                this.classList.toggle("active");
            }
        });
    });
}

function initLazyLoading() {
    document.querySelectorAll("img").forEach((img) => {
        const alreadySet = img.hasAttribute("loading");
        const shouldSkip = img.hasAttribute("data-priority") || img.getAttribute("loading") === "eager" || img.getAttribute("loading") === "auto";
        if (!alreadySet && !shouldSkip) {
            img.setAttribute("loading", "lazy");
        }
        if (!img.hasAttribute("decoding")) {
            img.setAttribute("decoding", "async");
        }
    });
}

function initFeatureCards() {
    const features = document.querySelectorAll(".feature-card");
    if (features.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                    }
                });
            },
            { threshold: 0.1 }
        );
        features.forEach((feature) => observer.observe(feature));
        features.forEach((card) => {
            card.addEventListener("click", function () {
                this.classList.toggle("active");
            });
        });
    }
}

function initTestimonials() {
    const testimonialCards = document.querySelectorAll("#testimonials .group");
    if (testimonialCards.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("animate-fade-in-up");
                        }, index * 100);
                    }
                });
            },
            { threshold: 0.1 }
        );
        testimonialCards.forEach((card) => observer.observe(card));

        const starContainers = document.querySelectorAll(".text-yellow-400, .text-yellow-300");
        starContainers.forEach((container) => {
            const stars = container.querySelectorAll("i");
            stars.forEach((star, index) => {
                star.addEventListener("mouseenter", () => {
                    stars.forEach((s, i) => {
                        if (i <= index) {
                            s.classList.add("text-yellow-500");
                        }
                    });
                });
                star.addEventListener("mouseleave", () => {
                    stars.forEach((s) => {
                        s.classList.remove("text-yellow-500");
                    });
                });
            });
        });

        testimonialCards.forEach((card) => {
            card.addEventListener("click", function (e) {
                if (!e.target.closest("a") && !e.target.closest("button")) {
                    const text = this.querySelector("p.text-white, p.text-gray-600");
                    if (text) {
                        text.classList.toggle("line-clamp-3");
                    }
                }
            });
        });
    }
}

console.log('%c✨ شركة الخليج لنقل العفش والمكيفات بالرياض', 'color: #F59E0B; font-size: 16px; font-weight: bold;');
