// Parallax effect removed for cleaner design

// 物件の「もっと見る」機能
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenProperties = document.querySelectorAll('.hidden-property');
    let currentVisible = 0;
    const itemsPerLoad = 6;
    
    if (loadMoreBtn && hiddenProperties.length > 0) {
        loadMoreBtn.addEventListener('click', function() {
            const nextVisible = currentVisible + itemsPerLoad;
            
            for (let i = currentVisible; i < nextVisible && i < hiddenProperties.length; i++) {
                hiddenProperties[i].style.display = 'block';
                hiddenProperties[i].style.opacity = '0';
                hiddenProperties[i].style.transform = 'translateY(20px)';
                
                // アニメーション効果
                setTimeout(() => {
                    hiddenProperties[i].style.transition = 'all 0.3s ease';
                    hiddenProperties[i].style.opacity = '1';
                    hiddenProperties[i].style.transform = 'translateY(0)';
                }, 100 * (i - currentVisible));
            }
            
            currentVisible = nextVisible;
            
            // 全て表示したらボタンを非表示
            if (currentVisible >= hiddenProperties.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});

// フォーム送信処理（contact.htmlの場合）
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form-main');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const inquiryType = document.getElementById('inquiry-type');
            const message = document.getElementById('message');
            
            // 簡単なバリデーション
            if (!name.value.trim()) {
                alert('お名前を入力してください。');
                name.focus();
                return;
            }
            
            if (!email.value.trim()) {
                alert('メールアドレスを入力してください。');
                email.focus();
                return;
            }
            
            if (!inquiryType.value) {
                alert('お問い合わせ種類を選択してください。');
                inquiryType.focus();
                return;
            }
            
            if (!message.value.trim()) {
                alert('詳細・ご要望を入力してください。');
                message.focus();
                return;
            }
            
            // 成功メッセージ
            alert('お問い合わせありがとうございます。営業時間内にご連絡いたします。');
            this.reset();
        });
    }
});

// ハンバーガーメニュー機能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // モバイルメニューを動的に作成
    if (hamburger && navMenu && !mobileMenu) {
        const newMobileMenu = document.createElement('div');
        newMobileMenu.className = 'mobile-menu';
        
        const mobileMenuList = document.createElement('ul');
        mobileMenuList.className = 'mobile-menu-list';
        
        // ナビゲーションメニューをコピー
        const navItems = navMenu.querySelectorAll('li');
        navItems.forEach(item => {
            const newItem = item.cloneNode(true);
            mobileMenuList.appendChild(newItem);
        });
        
        newMobileMenu.appendChild(mobileMenuList);
        document.body.appendChild(newMobileMenu);
        
        // イベントリスナーを設定
        setupMobileMenu(hamburger, newMobileMenu);
    } else if (hamburger && mobileMenu) {
        setupMobileMenu(hamburger, mobileMenu);
    }
});

function setupMobileMenu(hamburger, mobileMenu) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // ボディのスクロールを制御
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // メニュー外をクリックした時にメニューを閉じる
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            if (mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // メニューリンクをクリックした時にメニューを閉じる
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 検索フォーム処理
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const propertyType = document.getElementById('property-type').value;
            const area = document.getElementById('area').value;
            const priceMin = document.getElementById('price-min').value;
            const priceMax = document.getElementById('price-max').value;
            
            // 検索処理のシミュレーション
            alert('検索条件：\n' + 
                  '物件種別: ' + (propertyType || 'すべて') + '\n' + 
                  'エリア: ' + (area || 'すべて') + '\n' + 
                  '価格帯: ' + (priceMin || '下限なし') + ' - ' + (priceMax || '上限なし'));
        });
    }
});