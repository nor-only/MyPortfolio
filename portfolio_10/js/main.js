// OKUDAYAMA CAMP - Enhanced JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile Navigation
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20; // Extra padding
                
                // Close mobile menu if open
                closeMobileMenu();
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.replaceState(null, null, targetId);
            }
        });
    });

    // Header scroll effects with enhanced styling
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (!header) return;

        // Background opacity based on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 22, 18, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottomColor = 'rgba(139, 117, 85, 0.4)';
        } else {
            header.style.background = 'rgba(26, 22, 18, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.borderBottomColor = 'rgba(139, 117, 85, 0.2)';
        }

        // Hide/show header on scroll (only on desktop)
        if (window.innerWidth > 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add specific animations for different elements
                if (entry.target.classList.contains('qa-item')) {
                    entry.target.style.animationDelay = '0.1s';
                } else if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animationDelay = '0.2s';
                } else if (entry.target.classList.contains('staff-card')) {
                    entry.target.style.animationDelay = '0.15s';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation with updated selectors
    const animateElements = document.querySelectorAll('.qa-item, .feature-card, .plan-card, .staff-card, .contact-item');
    animateElements.forEach(el => {
        // Only apply animation if element is not in initial viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        
        if (!isInViewport) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });

    // Enhanced form handling with better validation
    const contactForm = document.querySelector('.reservation-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Enhanced validation
            const errors = [];
            
            if (!data.name || data.name.trim().length < 2) {
                errors.push('お名前は2文字以上で入力してください。');
            }
            
            if (!data.email) {
                errors.push('メールアドレスは必須項目です。');
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    errors.push('正しいメールアドレスを入力してください。');
                }
            }
            
            if (!data.phone || data.phone.trim().length < 10) {
                errors.push('電話番号は10桁以上で入力してください。');
            }
            
            if (!data.plan) {
                errors.push('ご希望プランを選択してください。');
            }
            
            if (!data.guests) {
                errors.push('人数を選択してください。');
            }
            
            if (!data.date1) {
                errors.push('第1希望日を入力してください。');
            } else {
                const selectedDate = new Date(data.date1);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    errors.push('第1希望日は今日以降の日付を選択してください。');
                }
            }
            
            if (errors.length > 0) {
                alert('以下の項目を確認してください：\n\n' + errors.join('\n'));
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('ご予約リクエストを受け付けました。\n\n24時間以内に担当者よりご連絡いたします。\n\n1日1組限定のため、お早めの確定をおすすめいたします。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top of form
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 2000);
        });
    }

    // Set minimum date for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.setAttribute('min', today);
        });
    }

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        let parallaxTicking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.05)`;
            }
            
            parallaxTicking = false;
        }
        
        function requestParallaxTick() {
            if (!parallaxTicking) {
                requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        }
        
        window.addEventListener('scroll', requestParallaxTick);
    }

    // Counter animation for statistics and prices
    function animateCounter(element, target, duration = 2000, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString() + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }
        
        updateCounter();
    }

    // Animate statistics when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                
                // Extract number and suffix
                const matches = text.match(/^(\d+)(.*)$/);
                if (matches) {
                    const targetNumber = parseInt(matches[1]);
                    const suffix = matches[2];
                    statNumber.textContent = '0' + suffix;
                    animateCounter(statNumber, targetNumber, 1500, suffix);
                }
                
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animate price numbers when they come into view
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const targetPrice = parseInt(priceElement.textContent.replace(/,/g, ''));
                priceElement.textContent = '0';
                animateCounter(priceElement, targetPrice, 1800);
                priceObserver.unobserve(priceElement);
            }
        });
    }, { threshold: 0.5 });

    const priceNumbers = document.querySelectorAll('.price-number');
    priceNumbers.forEach(price => {
        priceObserver.observe(price);
    });

    // Enhanced image lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Check if image is already loaded
                    if (img.complete && img.naturalHeight !== 0) {
                        img.style.opacity = '1';
                        img.style.transition = 'opacity 0.3s ease';
                    } else {
                        // Set initial state only if not loaded
                        img.style.opacity = '0.1';
                        img.style.transition = 'opacity 0.5s ease';
                        
                        img.addEventListener('load', function() {
                            img.style.opacity = '1';
                        });
                        
                        // Add error handling
                        img.addEventListener('error', function() {
                            img.style.opacity = '0.7';
                            img.alt = '画像を読み込めませんでした';
                        });
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            // Don't hide images that are already visible
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
            }
            imageObserver.observe(img);
        });
    }

    // Enhanced button interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip for anchor links and form submit buttons
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                return;
            }
            
            if (this.type === 'submit') {
                return;
            }
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = size + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.position = 'fixed';
    scrollProgress.style.top = '0';
    scrollProgress.style.left = '0';
    scrollProgress.style.width = '0%';
    scrollProgress.style.height = '4px';
    scrollProgress.style.background = 'linear-gradient(135deg, #8b7555 0%, #b5886f 100%)';
    scrollProgress.style.zIndex = '9999';
    scrollProgress.style.transition = 'width 0.1s ease';
    scrollProgress.style.boxShadow = '0 2px 10px rgba(139, 117, 85, 0.3)';
    document.body.appendChild(scrollProgress);

    let progressTicking = false;

    function updateScrollProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        
        scrollProgress.style.width = scrollPercent + '%';
        progressTicking = false;
    }

    function requestProgressTick() {
        if (!progressTicking) {
            requestAnimationFrame(updateScrollProgress);
            progressTicking = true;
        }
    }

    window.addEventListener('scroll', requestProgressTick);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .qa-item:nth-child(even) {
            animation-delay: 0.1s;
        }
        
        .qa-item:nth-child(odd) {
            animation-delay: 0.2s;
        }
        
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        
        .staff-card:nth-child(1) { animation-delay: 0.1s; }
        .staff-card:nth-child(2) { animation-delay: 0.2s; }
        
        /* Wood texture loading effect */
        .loading-wood {
            background: linear-gradient(90deg, transparent 0%, rgba(139, 117, 85, 0.1) 50%, transparent 100%);
            background-size: 200% 100%;
            animation: woodShimmer 2s infinite;
        }
        
        @keyframes woodShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);

    // Keyboard accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Focus management for mobile menu
        if (e.key === 'Tab' && navMenu && navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // Performance optimization: debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Reset mobile menu on resize
            if (window.innerWidth > 768) {
                closeMobileMenu();
                if (header) {
                    header.style.transform = 'translateY(0)';
                }
            }
        }, 250);
    });

    console.log('OKUDAYAMA CAMP - サイト初期化完了 🏕️');
});