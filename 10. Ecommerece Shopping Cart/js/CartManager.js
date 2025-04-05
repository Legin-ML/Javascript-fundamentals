export class CartManager {
    constructor() {
        this.cart = [];
        this.loadCart();
    }

    loadCart() {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            this.cart = [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: quantity });
        }
        this.saveCart();
        return this.cart;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        return this.cart;
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
        }
        this.saveCart();
        return this.cart;
    }

    getCart() {
        return this.cart;
    }

    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    calculateTax(rate = 0.1) {
        return this.getSubtotal() * rate;
    }

    calculateDiscount() {
        const subtotal = this.getSubtotal();
        if (subtotal > 200) {
            return subtotal * 0.1;
        } else if (subtotal > 100) {
            return subtotal * 0.05;
        }
        return 0;
    }

    getTotal() {
        return this.getSubtotal() + this.calculateTax() - this.calculateDiscount();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        return this.cart;
    }
}