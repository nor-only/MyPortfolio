// カート機能
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartDisplay();
        this.bindEvents();
    }

    // ローカルストレージからカートデータを読み込み
    loadCart() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    // ローカルストレージにカートデータを保存
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // 商品をカートに追加
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddedMessage(product.name);
    }

    // 商品をカートから削除
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.displayCartItems();
    }

    // 商品の数量を更新
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
                this.displayCartItems();
            }
        }
    }

    // カート表示を更新
    updateCartDisplay() {
        const cartCount = this.getTotalItems();
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
            element.style.display = cartCount > 0 ? 'flex' : 'none';
        });
    }

    // カート内の総商品数を取得
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // カート内の合計金額を取得
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // カートページの商品一覧を表示
    displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartEmptyContainer = document.getElementById('cart-empty');
        const cartSummaryContainer = document.getElementById('cart-summary');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartEmptyContainer.style.display = 'block';
            cartSummaryContainer.style.display = 'none';
            cartItemsContainer.innerHTML = '';
            return;
        }

        cartEmptyContainer.style.display = 'none';
        cartSummaryContainer.style.display = 'block';

        const itemsHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-price">¥${item.price.toLocaleString()}</p>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">
                    ¥${(item.price * item.quantity).toLocaleString()}
                </div>
                <button class="remove-btn" onclick="cart.removeItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        cartItemsContainer.innerHTML = itemsHTML;
        this.updateSummary();
    }

    // カート合計を更新
    updateSummary() {
        const subtotal = this.getTotalPrice();
        const shipping = subtotal > 0 ? 500 : 0;
        const total = subtotal + shipping;

        const subtotalElement = document.getElementById('subtotal');
        const shippingElement = document.getElementById('shipping');
        const totalElement = document.getElementById('total');

        if (subtotalElement) subtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
        if (shippingElement) shippingElement.textContent = `¥${shipping.toLocaleString()}`;
        if (totalElement) totalElement.textContent = `¥${total.toLocaleString()}`;

        // 注文確認ページの合計も更新
        const orderSubtotalElement = document.getElementById('order-subtotal');
        const orderShippingElement = document.getElementById('order-shipping');
        const orderTotalElement = document.getElementById('order-total');

        if (orderSubtotalElement) orderSubtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
        if (orderShippingElement) orderShippingElement.textContent = `¥${shipping.toLocaleString()}`;
        if (orderTotalElement) orderTotalElement.textContent = `¥${total.toLocaleString()}`;
    }

    // 商品追加メッセージを表示
    showAddedMessage(productName) {
        // 既存のメッセージを削除
        const existingMessage = document.querySelector('.cart-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 新しいメッセージを作成
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            「${productName}」をカートに追加しました
        `;

        // ページの上部に追加
        document.body.insertBefore(message, document.body.firstChild);

        // 3秒後に非表示
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // イベントリスナーを設定
    bindEvents() {
        // カートに追加ボタンのイベント
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                e.preventDefault();
                
                const productElement = e.target.closest('.product-item') || e.target.closest('.featured-item');
                if (productElement) {
                    const product = {
                        id: productElement.dataset.id,
                        name: productElement.dataset.name,
                        price: parseInt(productElement.dataset.price),
                        image: productElement.dataset.image,
                        quantity: 1
                    };
                    this.addItem(product);
                }
            }
        });
        
        // DOMContentLoadedイベントでカート表示を更新
        document.addEventListener('DOMContentLoaded', () => {
            this.updateCartDisplay();
            if (document.getElementById('cart-items')) {
                this.displayCartItems();
                this.updateSummary();
            }
        });
    }

    // カートをクリア
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.displayCartItems();
    }
}

// グローバルカートインスタンス
const cart = new Cart();

// ページ読み込み時にカート表示を更新
document.addEventListener('DOMContentLoaded', () => {
    // カートアイコンの表示を更新
    cart.updateCartDisplay();
    
    // カートページの場合のみ商品一覧と合計を表示
    if (document.getElementById('cart-items')) {
        cart.displayCartItems();
        cart.updateSummary();
    }
});