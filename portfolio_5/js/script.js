
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for arrow
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                const nextSection = heroSection.nextElementSibling;
                if (nextSection) {
                    window.scrollTo({
                        top: nextSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Hamburger menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on menu links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('is-visible');
            }
        });
    }

    // Initial check for elements already in view
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);

    // Blog Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        let currentlyVisible = 5; // Initially show 5 posts
        const postsPerLoad = 10; // Load 10 more posts each time after first load
        
        loadMoreBtn.addEventListener('click', function() {
            const hiddenPosts = document.querySelectorAll('.blog-post-hidden');
            const totalPosts = document.querySelectorAll('.blog-post-item').length;
            
            // Show next batch of posts (10 at a time)
            for (let i = 0; i < postsPerLoad && i < hiddenPosts.length; i++) {
                const post = hiddenPosts[i];
                post.classList.remove('blog-post-hidden');
                
                // Add staggered animation for newly revealed posts
                setTimeout(() => {
                    post.style.animation = 'slideInUp 0.6s ease-out forwards';
                }, i * 100);
                
                currentlyVisible++;
            }
            
            // Hide button if all posts are visible
            if (currentlyVisible >= totalPosts) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});
