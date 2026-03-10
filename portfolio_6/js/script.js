/**
 * 桜ヶ丘耳鼻咽喉科クリニック - メインJavaScript
 * リッチでフラットな親しみやすいデザインのインタラクション
 */

// DOM要素が読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('桜ヶ丘耳鼻咽喉科クリニック - ウェブサイト初期化');
    
    // 各機能を初期化
    initNavigation();
    initScrollEffects();
    initTreatmentTabs();
    initAnimations();
    initSmoothScroll();
    initIntersectionObserver();
    initFormInteractions();
});

// ===== ナビゲーション機能 =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    
    // モバイルメニューの開閉
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // アニメーション効果
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ナビゲーションリンクのアクティブ状態管理
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // アクティブクラスを削除
            navLinks.forEach(l => l.classList.remove('active'));
            // クリックされたリンクにアクティブクラスを追加
            this.classList.add('active');
            
            // モバイルメニューを閉じる
            if (navMenu) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // スクロール時のヘッダー背景変更
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== スムーズスクロール =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== スクロールエフェクト =====
function initScrollEffects() {
    // パララックス効果を削除
    
    // アクティブセクションの検出
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 治療・検査タブ機能 =====
function initTreatmentTabs() {
    const tabs = document.querySelectorAll('.treatment__tab');
    const panels = document.querySelectorAll('.treatment__panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // すべてのタブとパネルから active クラスを削除
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // クリックされたタブと対応するパネルに active クラスを追加
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // アニメーション削除
            }
        });
    });
}

// ===== アニメーション効果 (簡素化) =====
function initAnimations() {
    // 簡素なホバーエフェクトのみ残す
    const cards = document.querySelectorAll('.medical-card, .specialty-card, .info-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 24px rgba(74, 144, 226, 0.15)';
            this.style.transition = 'box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// ===== Intersection Observer（簡素化） =====
function initIntersectionObserver() {
    // アニメーションを削除し、基本的な可視性チェックのみ残す
    console.log('Intersection Observer initialized (animations removed)');
}

// ===== フォームインタラクション =====
function initFormInteractions() {
    // 電話番号のクリック時の動作
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', function() {
            // 電話アプリを起動
            window.location.href = `tel:${this.textContent.replace(/[^0-9]/g, '')}`;
        });
        
        // ホバーエフェクト削除
    });
    
    // オンライン予約ボタンのモーダル（実装例）
    const reservationBtns = document.querySelectorAll('a[href="#"]:not([href="#home"]):not([href="#about"])');
    reservationBtns.forEach(btn => {
        if (btn.textContent.includes('予約')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('お電話またはご来院にてご予約をお取りください', 'info');
            });
        }
    });
}

// ===== ユーティリティ関数 =====

// 数値アニメーション
function animateNumber(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 通知表示
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // 通知のスタイル
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#FF6B8A' : type === 'success' ? '#4CAF50' : '#4A90E2'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // アニメーション
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動削除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// デバウンス関数（パフォーマンス最適化）
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

// スロットル関数（スクロールイベント最適化）
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// パフォーマンス最適化されたスクロールイベント
const optimizedScrollHandler = throttle(function() {
    // スクロール関連の処理
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // プリローダーがある場合の処理
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
    
    // 初期アニメーションの開始
    document.body.classList.add('loaded');
    
    console.log('桜ヶ丘耳鼻咽喉科クリニック - ウェブサイト読み込み完了');
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // 本番環境では適切なエラーログ送信を実装
});

// タッチデバイス対応
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // タッチイベントの最適化
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // 上下スワイプ検出（必要に応じて処理を追加）
        if (Math.abs(touchDiff) > 50) {
            // スワイプ処理
        }
    }, { passive: true });
}

// ブラウザ互換性チェック
function checkBrowserCompatibility() {
    const isModernBrowser = 'fetch' in window && 'Promise' in window;
    
    if (!isModernBrowser) {
        showNotification('より良い体験のため、最新のブラウザをご利用ください', 'warning', 10000);
    }
}

checkBrowserCompatibility();

// アクセシビリティ対応
document.addEventListener('keydown', function(e) {
    // Escキーでモーダルを閉じる
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
        
        // モバイルメニューを閉じる
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});