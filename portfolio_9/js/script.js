document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Header Effects
    const header = document.querySelector('.main-header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Header scroll effect with enhanced visibility
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop effect
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction (desktop only)
        if (window.innerWidth > 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Parallax Effects for Crypto Symbols
    const cryptoSymbols = document.querySelectorAll('.crypto-symbol');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        cryptoSymbols.forEach((symbol, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            symbol.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
    
    // Interactive Market Cards with Real-time Updates
    const marketCards = document.querySelectorAll('.market-card');
    
    marketCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation on hover
            const icon = card.querySelector('.market-icon');
            const price = card.querySelector('.price');
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
            
            if (price) {
                price.style.color = '#fbbf24';
                price.style.transition = 'color 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.market-icon');
            const price = card.querySelector('.price');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (price) {
                price.style.color = 'var(--accent-color)';
            }
        });
    });
    
    // Enhanced Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.market-card, .featured-article, .category-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Apply to sections that need fade-in animation
    const animatedSections = document.querySelectorAll('.market-overview, .featured-articles, .categories, .analysis-section, .about-section, .newsletter');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeInObserver.observe(section);
    });
    
    // Typing Animation for Hero Title (disabled to prevent HTML tag display)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const text = heroTitle.textContent;
    //     heroTitle.innerHTML = '';
    //     
    //     let i = 0;
    //     const typeWriter = () => {
    //         if (i < text.length) {
    //             heroTitle.textContent += text.charAt(i);
    //             i++;
    //             setTimeout(typeWriter, 50);
    //         }
    //     };
    //     
    //     setTimeout(typeWriter, 1000);
    // }
    
    // Interactive Newsletter Form
    const subscriptionForm = document.querySelector('.subscription-form');
    const emailInput = document.querySelector('.subscription-form input[type="email"]');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading animation
            subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            subscribeBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                subscribeBtn.innerHTML = '<i class="fas fa-check"></i> 購読完了！';
                subscribeBtn.style.background = 'linear-gradient(45deg, #22c55e, #16a34a)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    subscribeBtn.innerHTML = '<span>購読開始</span><i class="fas fa-arrow-right"></i>';
                    subscribeBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                    subscribeBtn.disabled = false;
                    emailInput.value = '';
                }, 3000);
            }, 2000);
        });
        
        // Email validation with visual feedback
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (email.length > 0) {
                if (isValid) {
                    this.style.borderColor = '#22c55e';
                    this.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                } else {
                    this.style.borderColor = '#ef4444';
                    this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                }
            } else {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    // Interactive Chart Animation
    const chartLine = document.querySelector('.chart-line');
    if (chartLine) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartLine.style.animation = 'chartGrow 2s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        chartObserver.observe(chartLine);
    }
    
    // Fear & Greed Meter Animation
    const meterFill = document.querySelector('.meter-fill');
    if (meterFill) {
        const meterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    meterFill.style.animation = 'meterFill 2s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        meterObserver.observe(meterFill);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dynamic Background Particles
    function createParticles() {
        const heroBackground = document.querySelector('.hero-background');
        const particlesCount = window.innerWidth > 768 ? 20 : 10;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            heroBackground.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Update particles on window resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.particle').forEach(particle => particle.remove());
        createParticles();
    });
    
    // Interactive hover effects for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'pulse 2s infinite';
            }
        });
    });
    
    // Real-time price updates simulation
    function updatePrices() {
        const prices = document.querySelectorAll('.price');
        const changes = document.querySelectorAll('.change');
        
        prices.forEach((price, index) => {
            const currentPrice = parseFloat(price.textContent.replace('$', '').replace(',', ''));
            const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
            const newPrice = currentPrice * (1 + variation);
            
            price.textContent = `$${newPrice.toLocaleString('en-US', {
                minimumFractionDigits: currentPrice < 1 ? 3 : 0,
                maximumFractionDigits: currentPrice < 1 ? 3 : 0
            })}`;
            
            // Update change percentage
            const change = changes[index];
            if (change) {
                const changeValue = variation * 100;
                const isPositive = changeValue > 0;
                
                change.textContent = `${isPositive ? '+' : ''}${changeValue.toFixed(2)}%`;
                change.className = `change ${isPositive ? 'positive' : 'negative'}`;
            }
        });
    }
    
    // Update prices every 10 seconds
    setInterval(updatePrices, 10000);
});