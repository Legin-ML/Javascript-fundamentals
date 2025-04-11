export class UIManager {
    constructor(productService, cartManager) {
        this.productService = productService;
        this.cartManager = cartManager;
    }

    init() {
        this.renderProducts(this.productService.getProducts());
        this.renderCart();
        this.loadCategories();
        this.setupEventListeners();
    }

    renderProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });
        
        this.setupAddToCartButtons();
    }

    createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">₹${product.price.toFixed(2)}</div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        return productCard;
    }

    setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const product = this.productService.getProductById(productId);
                if (product) {
                    this.cartManager.addToCart(product);
                    this.renderCart();
                }
            });
        });
    }

    renderCart() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const emptyCart = document.getElementById('empty-cart');
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const discount = document.getElementById('discount');
        const total = document.getElementById('total');
        
        const cart = this.cartManager.getCart();
        
        cartCount.textContent = `${this.cartManager.getCartCount()} items`;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message" id="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = '';
            cart.forEach(item => {
                const cartItemElement = this.createCartItemElement(item);
                cartItems.appendChild(cartItemElement);
            });
            this.setupCartItemEventListeners();
        }
        
        subtotal.textContent = `₹${this.cartManager.getSubtotal().toFixed(2)}`;
        tax.textContent = `₹${this.cartManager.calculateTax().toFixed(2)}`;
        discount.textContent = `-₹${this.cartManager.calculateDiscount().toFixed(2)}`;
        total.textContent = `₹${this.cartManager.getTotal().toFixed(2)}`;
    }

    createCartItemElement(item) {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease-qty" data-id="${item.id}">-</button>
                    <input type="number" class="item-quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                    <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">✕</button>
                </div>
            </div>
        `;
        return cartItemElement;
    }

    setupCartItemEventListeners() {
        document.querySelectorAll('.decrease-qty').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const item = this.cartManager.getCart().find(item => item.id === productId);
                if (item && item.quantity > 1) {
                    this.cartManager.updateQuantity(productId, item.quantity - 1);
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const item = this.cartManager.getCart().find(item => item.id === productId);
                if (item) {
                    this.cartManager.updateQuantity(productId, item.quantity + 1);
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.item-quantity').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const quantity = parseInt(e.target.value);
                if (!isNaN(quantity) && quantity > 0) {
                    this.cartManager.updateQuantity(productId, quantity);
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                this.cartManager.removeFromCart(productId);
                this.renderCart();
            });
        });
    }

    loadCategories() {
        const categoryFilter = document.getElementById('category-filter');
        const categories = this.productService.getCategories();
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    setupEventListeners() {
        const filterBtn = document.getElementById('filter-btn');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        
        filterBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            const category = categoryFilter.value;
            const filteredProducts = this.productService.filterProducts(searchTerm, category);
            this.renderProducts(filteredProducts);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filterBtn.click();
            }
        });

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value;
            const category = categoryFilter.value;
            const filteredProducts = this.productService.filterProducts(searchTerm, category);
            this.renderProducts(filteredProducts);

        });
        
        categoryFilter.addEventListener('change', () => {
            filterBtn.click();
        });

        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            if (this.cartManager.getCartCount() > 0) {
                alert('Thank you for your order! Total: ₹' + this.cartManager.getTotal().toFixed(2));
                this.cartManager.clearCart();
                this.renderCart();
            } else {
                alert('Your cart is empty. Please add items before checkout.');
            }
        });
    }
}