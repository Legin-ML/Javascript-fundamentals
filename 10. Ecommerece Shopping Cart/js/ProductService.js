export class ProductService {
    constructor() {
        this.products = [
            { id: 1, title: "Purple Gaming Headset", price: 79.99, description: "High-quality gaming headset with noise cancellation and RGB lighting", category: "Electronics", image: "placeholder.jpg" },
            { id: 2, title: "Mechanical Keyboard", price: 129.99, description: "RGB mechanical keyboard with custom switches for gaming and typing", category: "Electronics", image: "placeholder.jpg" },
            { id: 3, title: "Purple Hoodie", price: 49.99, description: "Comfortable cotton hoodie with purple design and front pocket", category: "Clothing", image: "placeholder.jpg" },
            { id: 4, title: "Wireless Mouse", price: 39.99, description: "Ergonomic wireless mouse with high precision and programmable buttons", category: "Electronics", image: "placeholder.jpg" },
            { id: 5, title: "Gaming Monitor", price: 299.99, description: "27-inch gaming monitor with high refresh rate and low response time", category: "Electronics", image: "placeholder.jpg" },
            { id: 6, title: "Purple Sneakers", price: 89.99, description: "Stylish and comfortable sneakers in purple color with cushioned soles", category: "Footwear", image: "placeholder.jpg" },
            { id: 7, title: "Bluetooth Speaker", price: 59.99, description: "Portable Bluetooth speaker with deep bass and long battery life", category: "Audio", image: "placeholder.jpg" },
            { id: 8, title: "Smartphone Case", price: 19.99, description: "Durable and stylish purple smartphone case with shock absorption", category: "Accessories", image: "placeholder.jpg" },
            { id: 9, title: "Laptop Backpack", price: 65.99, description: "Stylish purple backpack with padded laptop compartment and multiple pockets", category: "Accessories", image: "placeholder.jpg" },
            { id: 10, title: "Fitness Tracker", price: 89.95, description: "Waterproof fitness tracker with heart rate monitor and sleep tracking", category: "Electronics", image: "placeholder.jpg" },
            { id: 11, title: "Graphic T-Shirt", price: 24.99, description: "Cotton t-shirt with purple geometric design and comfortable fit", category: "Clothing", image: "placeholder.jpg" },
            { id: 12, title: "Desk Lamp", price: 45.50, description: "Adjustable LED desk lamp with touch control and multiple color modes", category: "Home", image: "placeholder.jpg" }
        ];
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getCategories() {
        return [...new Set(this.products.map(product => product.category))];
    }

    filterProducts(searchTerm, category) {
        return this.products.filter(product => {
            const matchesSearch = searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const matchesCategory = category ? product.category === category : true;
            return matchesSearch && matchesCategory;
        });
    }
}