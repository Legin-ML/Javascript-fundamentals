import { ProductService } from './js/ProductService.js';
import { CartManager } from './js/CartManager.js';
import { UIManager } from './js/UIManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const productService = new ProductService();
    const cartManager = new CartManager();
    const uiManager = new UIManager(productService, cartManager);
    uiManager.init();
});