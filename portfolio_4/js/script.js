// ローディングアニメーション
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});

// カウントアップアニメーション
const countUp = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let count = 0;
    const duration = 2000; // 2秒
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        count = Math.round(target * progress);

        if (frame === totalFrames) {
            count = target;
            clearInterval(counter);
        }

        el.textContent = count;
    }, frameRate);
};

const countUpElements = document.querySelectorAll('.count-up');

const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

countUpElements.forEach(el => {
    countUpObserver.observe(el);
});

// ハンバーガーメニューの機能
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-header nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // メニュー項目をクリックしたときにメニューを閉じる
        const navLinks = document.querySelectorAll('.main-header nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // ウィンドウサイズが変更されたときの処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});