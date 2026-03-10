// 山桜亭 - 高級老舗旅館サイト JavaScript
// 静謐で上質な動きを実現

document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面の制御
    initializeLoading();
    
    // 現在のスライドインデックス
    let currentSlide = 0;
    const slides = document.querySelectorAll('.room-slide');
    const dots = document.querySelectorAll('.dot');
    
    // スライダーが存在する場合のみスライダー機能を有効化
    const hasSlider = slides.length > 0 && dots.length > 0;
    
    // 初期化
    init();
    
    // ハンバーガーメニューの初期化
    setupHamburgerMenu();
    
    // ローディング画面の初期化
    function initializeLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        if (loadingScreen) {
            // 初回訪問かどうかをチェック（sessionStorageを使用）
            const hasVisited = sessionStorage.getItem('hasVisited');
            
            if (!hasVisited) {
                // 初回訪問の場合のみローディング表示
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    sessionStorage.setItem('hasVisited', 'true');
                    
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }, 3000); // 3秒後にフェードアウト開始
            } else {
                // 2回目以降はすぐに非表示
                loadingScreen.style.display = 'none';
            }
        }
    }
    
    function init() {
        // スムーズスクロール
        setupSmoothScroll();
        
        // ヘッダーの背景透明度制御
        setupHeaderScroll();
        
        // 要素の遅延表示
        setupScrollAnimations();
        
        // 予約フォームの日付制御
        setupReservationForm();
        
        // ページロード時のフェードイン
        fadeInOnLoad();
    }
    
    // スムーズスクロール設定
    function setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // 外部リンクや他のページへのリンクの場合は通常の動作を許可
                if (href.includes('.html') || href.startsWith('http')) {
                    return;
                }
                
                // 同ページ内のセクションへのリンクの場合のみスムーズスクロール
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ヘッダーのスクロール制御
    function setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const opacity = Math.min(scrolled / 200, 1);
            
            header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
        });
    }
    
    // スクロール時のアニメーション
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // アニメーション対象の要素
        const animatedElements = document.querySelectorAll(`
            .welcome-content,
            .room-slide,
            .cuisine-content,
            .spa-content,
            .reservation-content
        `);
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }
    
    // 予約フォームの日付制御
    function setupReservationForm() {
        const checkinDate = document.getElementById('checkin');
        const checkoutDate = document.getElementById('checkout');
        
        // 今日の日付を取得
        const today = new Date().toISOString().split('T')[0];
        
        // チェックイン日は今日以降
        checkinDate.min = today;
        
        // チェックイン日が変更されたらチェックアウト日の最小値を設定
        checkinDate.addEventListener('change', function() {
            const checkinValue = this.value;
            const nextDay = new Date(checkinValue);
            nextDay.setDate(nextDay.getDate() + 1);
            
            checkoutDate.min = nextDay.toISOString().split('T')[0];
            
            // チェックアウト日がチェックイン日より前の場合はリセット
            if (checkoutDate.value && checkoutDate.value <= checkinValue) {
                checkoutDate.value = '';
            }
        });
        
        // フォーム送信時の処理
        const form = document.querySelector('.booking-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォーム送信のフィードバック
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '確認中...';
            submitBtn.disabled = true;
            
            // 1.5秒後に元に戻す（実際の処理はここに実装）
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // 成功メッセージ（実際はサーバーサイドで処理）
                alert('ご予約のお問い合わせを受け付けました。\n確認のお電話をさせていただきます。');
            }, 1500);
        });
    }
    
    // ページロード時のフェードイン
    function fadeInOnLoad() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    }
    
    // スライダー機能
    function showSlide(index) {
        // すべてのスライドを非表示
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        // 指定されたスライドを表示
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // 次のスライドへ
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // 前のスライドへ
    function previousSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // 自動スライド再生
    function startAutoSlide() {
        return setInterval(nextSlide, 5000); // 5秒ごとに切り替え
    }
    
    // 自動スライドの制御（スライダーが存在する場合のみ）
    let autoSlideInterval;
    if (hasSlider) {
        autoSlideInterval = startAutoSlide();
        
        // マウスがスライダー上にある時は自動再生を停止
        const roomsSection = document.querySelector('.rooms-slider');
        
        if (roomsSection) {
            roomsSection.addEventListener('mouseenter', function() {
                clearInterval(autoSlideInterval);
            });
            
            roomsSection.addEventListener('mouseleave', function() {
                autoSlideInterval = startAutoSlide();
            });
        }
    }
    
    // グローバル関数として定義（HTML内のonclickから呼び出し）
    window.changeSlide = function(direction) {
        clearInterval(autoSlideInterval);
        
        if (direction === 1) {
            nextSlide();
        } else {
            previousSlide();
        }
        
        // 2秒後に自動再生を再開
        setTimeout(() => {
            autoSlideInterval = startAutoSlide();
        }, 2000);
    };
    
    window.currentSlide = function(index) {
        clearInterval(autoSlideInterval);
        showSlide(index - 1); // HTML側は1から始まる
        
        // 2秒後に自動再生を再開
        setTimeout(() => {
            autoSlideInterval = startAutoSlide();
        }, 2000);
    };
    
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            window.changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            window.changeSlide(1);
        }
    });
    
    // タッチ/スワイプ対応（スライダーが存在する場合のみ）
    if (hasSlider) {
        let touchStartX = 0;
        let touchEndX = 0;
        const roomsSection = document.querySelector('.rooms-slider');
        
        if (roomsSection) {
            roomsSection.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            roomsSection.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                window.changeSlide(-1); // 右スワイプで前へ
            } else {
                window.changeSlide(1); // 左スワイプで次へ
            }
        }
    }
    
    // スクロール時の要素の視差効果
    function setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // 視差効果を有効化
    setupParallaxEffect();
    
    // ハンバーガーメニューの設定
    function setupHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', function() {
            // ハンバーガーアイコンのアニメーション
            hamburger.classList.toggle('active');
            
            // メニューの表示/非表示
            if (navMenu.classList.contains('mobile-open')) {
                // メニューを閉じる
                navMenu.classList.remove('show');
                setTimeout(() => {
                    navMenu.classList.remove('mobile-open');
                    document.body.style.overflow = '';
                }, 300);
            } else {
                // メニューを開く
                navMenu.classList.add('mobile-open');
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    navMenu.classList.add('show');
                }, 10);
            }
        });
        
        // メニューリンクをクリックしたときにメニューを閉じる
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('mobile-open')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('show');
                    setTimeout(() => {
                        navMenu.classList.remove('mobile-open');
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
        
        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-open', 'show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 料理と温泉の静的なホバーエフェクト
    function setupHoverEffects() {
        // 浮き上がりアニメーションは削除し、
        // CSSのhoverエフェクトに任せる（色変化のみ）
    }
    
    // ホバーエフェクトを有効化
    setupHoverEffects();
    
    // フォーム要素のフォーカス効果（静的）
    function setupFormEffects() {
        // フォーカス効果はCSSの:focusスタイルに任せる
        // 浮き上がりアニメーションは削除
    }
    
    // フォーム効果を有効化
    setupFormEffects();
    
    // ページの可視性が変わった時の処理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // ページが非表示の時は自動スライドを停止
            clearInterval(autoSlideInterval);
        } else {
            // ページが表示された時は自動スライドを再開
            autoSlideInterval = startAutoSlide();
        }
    });
    
    // リサイズ時の処理
    window.addEventListener('resize', function() {
        // 必要に応じてレイアウトを調整
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // モバイル向けの調整
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000); // 少し早くする
        } else {
            // デスクトップ向けの調整
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    });
});

// パフォーマンス向上のためのユーティリティ関数
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

// スクロール処理のデバウンス
const debouncedScroll = debounce(function() {
    // 重い処理がある場合はここに
}, 16); // 60fps相当

window.addEventListener('scroll', debouncedScroll);