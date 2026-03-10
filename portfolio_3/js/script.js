// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeForms();
    initializeAnimations();
    initializePortfolioFilters();
    initializeScrollToTop();
    initializeMouseEffects();
    initializeCyberEffects();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    if (themeIcon) {
        themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            }
        });
    }
}

// ROI Calculator
function initializeROICalculator() {
    window.calculateROI = function() {
        const laborCost = parseFloat(document.getElementById('labor-cost').value) || 0;
        const efficiency = parseFloat(document.getElementById('efficiency').value) || 0;
        
        if (laborCost > 0 && efficiency > 0) {
            const monthlySavings = laborCost * (efficiency / 100);
            const yearlyROI = monthlySavings * 12;
            const implementationCost = 500000; // Estimated implementation cost
            const paybackPeriod = Math.ceil(implementationCost / monthlySavings);
            
            const resultDiv = document.getElementById('roi-result');
            resultDiv.innerHTML = `
                <h4>ROI計算結果</h4>
                <p><strong>月間削減コスト:</strong> ¥${monthlySavings.toLocaleString()}</p>
                <p><strong>年間ROI:</strong> ¥${yearlyROI.toLocaleString()}</p>
                <p><strong>投資回収期間:</strong> ${paybackPeriod}ヶ月</p>
                <p><strong>投資効果:</strong> ${((yearlyROI / implementationCost) * 100).toFixed(1)}%</p>
            `;
            resultDiv.style.display = 'block';
        } else {
            alert('正しい数値を入力してください。');
        }
    };
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initializeForms() {
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'お問い合わせありがとうございます。担当者より3営業日以内にご連絡いたします。');
        });
    }

    // Trial Form
    const trialForm = document.querySelector('.trial-form');
    if (trialForm) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, '無料トライアルのお申し込みありがとうございます。アカウント情報をメールでお送りします。');
        });
    }
}

// Handle Form Submission
function handleFormSubmission(form, successMessage) {
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
            field.addEventListener('input', function() {
                this.style.borderColor = '#ddd';
            });
        }
    });
    
    if (!isValid) {
        alert('必須項目をすべて入力してください。');
        return;
    }

    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && !validateEmail(emailField.value)) {
        alert('正しいメールアドレスを入力してください。');
        emailField.style.borderColor = '#ff6b6b';
        return;
    }

    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '送信中...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(successMessage);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Animate Numbers
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        numberObserver.observe(number);
    });
}

function animateNumber(element) {
    const text = element.textContent;
    const numberMatch = text.match(/[\d.]+/);
    const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
    const suffix = text.replace(/[\d.\s]/g, '');
    
    if (isNaN(number)) return;
    
    const duration = 2500;
    const start = performance.now();
    const hasDecimal = text.includes('.');
    
    // Add glowing effect during animation
    element.style.textShadow = '0 0 20px rgba(49, 130, 206, 0.5)';
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentNumber = number * easeOutBounce(progress);
        const displayNumber = hasDecimal ? currentNumber.toFixed(1) : Math.floor(currentNumber);
        element.textContent = displayNumber + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Remove glow effect when animation completes
            setTimeout(() => {
                element.style.textShadow = 'none';
            }, 500);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing functions
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeOutBounce(t) {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop the click from propagating to the document
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Portfolio Filters
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Newsletter Subscription (if added)
function handleNewsletterSubscription(email) {
    if (!validateEmail(email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // Simulate subscription
    alert('ニュースレターの購読ありがとうございます！');
}

// Scroll to Top Functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollToTop();
});

// Performance monitoring
function trackPagePerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
        }, 0);
    });
}

// Initialize performance tracking
trackPagePerformance();

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Utility function for debouncing
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

// Resize handler with debouncing
window.addEventListener('resize', debounce(() => {
    // Handle resize events efficiently
    console.log('Window resized');
}, 250));

// Particle Effect for Hero Section
function initializeParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    hero.style.position = 'relative';
    hero.appendChild(canvas);
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.life = Math.random() * 100 + 100;
            this.maxLife = this.life;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillStyle = '#3182ce';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Remove dead particles and add new ones
        particles = particles.filter(p => p.life > 0);
        while (particles.length < 50) {
            particles.push(new Particle());
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(49, 130, 206, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}


// Parallax Effect
function initializeParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero, .achievements');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    window.addEventListener('scroll', debounce(updateParallax, 10));
}

// Enhanced Animation Function
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .blog-card, .team-member, .stat-item, .case-study, .trend-item'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Number counter animation for stats
    animateNumbers();
    
    // Text reveal animation
    initializeTextReveal();
}

// Text Reveal Animation
function initializeTextReveal() {
    const titles = document.querySelectorAll('.hero-title, .section-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.05}s`;
            span.className = 'char-reveal';
            title.appendChild(span);
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    
    .service-card,
    .testimonial-card,
    .blog-card,
    .team-member,
    .stat-item,
    .case-study,
    .trend-item {
        opacity: 0;
        transform: translateY(50px) rotateX(10deg);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .service-card.animate,
    .testimonial-card.animate,
    .blog-card.animate,
    .team-member.animate,
    .stat-item.animate,
    .case-study.animate,
    .trend-item.animate {
        opacity: 1;
        transform: translateY(0) rotateX(0);
    }
    
    .char-reveal {
        display: inline-block;
        opacity: 0;
        animation: charReveal 0.6s ease forwards;
    }
    
    @keyframes charReveal {
        from {
            opacity: 0;
            transform: translateY(20px) rotateX(90deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        .service-card,
        .testimonial-card,
        .blog-card,
        .team-member,
        .stat-item,
        .case-study,
        .trend-item,
        .char-reveal {
            opacity: 1;
            transform: none;
            transition: none;
            animation: none;
        }
        
    }
`;
document.head.appendChild(style);

// マウス追従効果
function initializeMouseEffects() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}%`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}%`);
    });
    
    // カードの3D効果
    const cards = document.querySelectorAll('.glass, .neon-glow');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// サイバー効果
function initializeCyberEffects() {
    // グリッチ効果
    const glitchElements = document.querySelectorAll('.hero-title');
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() < 0.1) {
                element.style.textShadow = `
                    ${Math.random() * 4 - 2}px 0 #ff3366,
                    ${Math.random() * 4 - 2}px 0 #00ffff
                `;
                setTimeout(() => {
                    element.style.textShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
                }, 100);
            }
        }, 3000);
    });
    
    // パーティクル効果
    createFloatingParticles();
}

// 浮遊パーティクル
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 136, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${10 + Math.random() * 20}s infinite linear;
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
        `;
        particleContainer.appendChild(particle);
    }
}

// パーティクルアニメーション
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);