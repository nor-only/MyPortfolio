document.addEventListener('DOMContentLoaded', () => {

    // ヘッダーの背景色をスクロールで変更
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 予約モーダル
    const modal = document.getElementById('reservation-modal');
    const reservationButtons = document.querySelectorAll('.reservation-btn');
    const closeBtn = document.querySelector('.close-btn');

    reservationButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // 多言語対応
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-ja]');

    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang-switch');
            document.documentElement.setAttribute('data-lang', lang);

            translatableElements.forEach(el => {
                el.textContent = el.getAttribute(`data-${lang}`);
            });

            document.querySelectorAll('.lang-btn.active').forEach(activeBtn => activeBtn.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // フェードインアニメーション
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => observer.observe(el));

    // ページトップへ戻るボタン
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
