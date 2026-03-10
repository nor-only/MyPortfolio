// 注文確認ページの機能
class Checkout {
    constructor() {
        this.cart = new Cart();
        this.init();
    }

    init() {
        this.displayOrderItems();
        this.bindEvents();
        this.updateOrderSummary();
    }

    // 注文商品一覧を表示
    displayOrderItems() {
        const orderItemsContainer = document.getElementById('order-items');
        if (!orderItemsContainer) return;

        if (this.cart.items.length === 0) {
            orderItemsContainer.innerHTML = `
                <div class="no-items">
                    <p>カートに商品がありません。</p>
                    <a href="shop.html" class="btn-primary">ショップに戻る</a>
                </div>
            `;
            return;
        }

        const itemsHTML = this.cart.items.map(item => `
            <div class="order-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h5>${item.name}</h5>
                    <p class="item-price">¥${item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
                <div class="item-total">
                    ¥${(item.price * item.quantity).toLocaleString()}
                </div>
            </div>
        `).join('');

        orderItemsContainer.innerHTML = itemsHTML;
    }

    // 注文合計を更新
    updateOrderSummary() {
        const subtotal = this.cart.getTotalPrice();
        const shipping = subtotal > 0 ? 500 : 0;
        const total = subtotal + shipping;

        const orderSubtotalElement = document.getElementById('order-subtotal');
        const orderShippingElement = document.getElementById('order-shipping');
        const orderTotalElement = document.getElementById('order-total');

        if (orderSubtotalElement) orderSubtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
        if (orderShippingElement) orderShippingElement.textContent = `¥${shipping.toLocaleString()}`;
        if (orderTotalElement) orderTotalElement.textContent = `¥${total.toLocaleString()}`;
    }

    // フォームバリデーション
    validateForm(formData) {
        const errors = [];

        // 必須フィールドのチェック
        const requiredFields = [
            { name: 'lastName', label: '姓' },
            { name: 'firstName', label: '名' },
            { name: 'email', label: 'メールアドレス' },
            { name: 'phone', label: '電話番号' },
            { name: 'zipCode', label: '郵便番号' },
            { name: 'prefecture', label: '都道府県' },
            { name: 'city', label: '市区町村' },
            { name: 'address', label: '番地・建物名' }
        ];

        requiredFields.forEach(field => {
            if (!formData.get(field.name) || formData.get(field.name).trim() === '') {
                errors.push(`${field.label}は必須項目です。`);
            }
        });

        // メールアドレスの形式チェック
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.push('正しいメールアドレスを入力してください。');
        }

        // 郵便番号の形式チェック
        const zipCode = formData.get('zipCode');
        const zipRegex = /^\d{3}-\d{4}$/;
        if (zipCode && !zipRegex.test(zipCode)) {
            errors.push('郵便番号は「123-4567」の形式で入力してください。');
        }

        // 電話番号の形式チェック
        const phone = formData.get('phone');
        const phoneRegex = /^[\d-]+$/;
        if (phone && !phoneRegex.test(phone)) {
            errors.push('正しい電話番号を入力してください。');
        }

        return errors;
    }

    // 注文データを作成
    createOrderData(formData) {
        return {
            customer: {
                lastName: formData.get('lastName'),
                firstName: formData.get('firstName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            },
            shipping: {
                zipCode: formData.get('zipCode'),
                prefecture: formData.get('prefecture'),
                city: formData.get('city'),
                address: formData.get('address')
            },
            payment: formData.get('payment'),
            notes: formData.get('notes'),
            items: this.cart.items,
            totals: {
                subtotal: this.cart.getTotalPrice(),
                shipping: this.cart.getTotalPrice() > 0 ? 500 : 0,
                total: this.cart.getTotalPrice() + (this.cart.getTotalPrice() > 0 ? 500 : 0)
            },
            orderDate: new Date().toISOString()
        };
    }

    // エラーメッセージを表示
    showErrors(errors) {
        // 既存のエラーメッセージを削除
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // エラーメッセージを作成
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <h4>入力内容に問題があります：</h4>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;

        // フォームの上に挿入
        const form = document.getElementById('checkout-form');
        form.parentNode.insertBefore(errorDiv, form);

        // スクロールしてエラーメッセージを表示
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 成功メッセージを表示
    showSuccessMessage() {
        const successHTML = `
            <div class="success-message">
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h2>ご注文ありがとうございました！</h2>
                    <p>ご注文を承りました。確認メールをお送りいたします。</p>
                    <p>商品の発送まで今しばらくお待ちください。</p>
                    <div class="success-actions">
                        <a href="index.html" class="btn-primary">ホームに戻る</a>
                        <a href="shop.html" class="btn-secondary">お買い物を続ける</a>
                    </div>
                </div>
            </div>
        `;

        document.body.innerHTML = successHTML;
    }

    // イベントリスナーを設定
    bindEvents() {
        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(e);
            });
        }

        // 都道府県選択による送料計算（将来の拡張用）
        const prefectureSelect = document.getElementById('prefecture');
        if (prefectureSelect) {
            prefectureSelect.addEventListener('change', () => {
                this.updateOrderSummary();
            });
        }
    }

    // フォーム送信処理
    handleSubmit(e) {
        const formData = new FormData(e.target);
        
        // カートが空の場合
        if (this.cart.items.length === 0) {
            alert('カートに商品がありません。');
            window.location.href = 'shop.html';
            return;
        }

        // バリデーション
        const errors = this.validateForm(formData);
        if (errors.length > 0) {
            this.showErrors(errors);
            return;
        }

        // 注文データを作成
        const orderData = this.createOrderData(formData);

        // 注文を処理（実際のアプリケーションではサーバーに送信）
        this.processOrder(orderData);
    }

    // 注文処理
    processOrder(orderData) {
        // ローカルストレージに注文履歴を保存（デモ用）
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push({
            ...orderData,
            orderId: 'ORD' + Date.now(),
            status: 'pending'
        });
        localStorage.setItem('orders', JSON.stringify(orders));

        // カートをクリア
        this.cart.clearCart();

        // 成功メッセージを表示
        this.showSuccessMessage();
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('checkout-form')) {
        new Checkout();
    }
});