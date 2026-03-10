// ===============================================
// 2026 MODERN PORTFOLIO - JAVASCRIPT
// ===============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===============================================
    // HEADER SCROLL EFFECT
    // ===============================================
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===============================================
    // MOBILE MENU
    // ===============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===============================================
    // SCROLL REVEAL ANIMATIONS
    // ===============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                // Optional: stop observing after reveal
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const revealElements = document.querySelectorAll(`
        .about-section,
        .works-section,
        .about-detailed,
        .works-detailed,
        .portfolio-item-detailed,
        .value-item,
        .team-member
    `);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ===============================================
    // STATS COUNTER ANIMATION
    // ===============================================
    const statItems = document.querySelectorAll('.stat-item h4');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));

                if (!isNaN(numericValue) && numericValue > 0) {
                    let currentValue = 0;
                    const increment = numericValue / 60;
                    const duration = 1500;
                    const stepTime = duration / 60;

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            const suffix = finalValue.includes('%') ? '%' :
                                          finalValue.includes('+') ? '+' :
                                          finalValue.includes('年') ? '年' : '';
                            target.textContent = Math.floor(currentValue) + suffix;
                        }
                    }, stepTime);
                }

                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => statsObserver.observe(item));

    // ===============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===============================================
    // SCROLL PROGRESS INDICATOR
    // ===============================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: #000000;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ===============================================
    // LAZY LOADING IMAGES
    // ===============================================
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';

                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });

                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===============================================
    // PERFORMANCE OPTIMIZATION
    // ===============================================
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===============================================
    // Focus management for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // Add focus-visible class for better keyboard navigation styling
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (this.matches(':focus-visible')) {
                this.classList.add('keyboard-focus');
            }
        });

        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });

    // ===============================================
    // PREFERS REDUCED MOTION
    // ===============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable all animations and transitions for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===============================================
    // CONSOLE LOG (OPTIONAL - REMOVE IN PRODUCTION)
    // ===============================================
    console.log('%c✨ OKUDA Design 2026', 'font-size: 20px; font-weight: bold; color: #000;');
    console.log('%cWhite & Black Portfolio', 'font-size: 14px; color: #666;');
});
