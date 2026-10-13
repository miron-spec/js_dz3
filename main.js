const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 800 },
    { id: 3, name: "Headphones", price: 200 }
];

let cart = [];

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const searchInput = document.getElementById('search-input');
const cartCountDisplay = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total');
const emptyCartBtn = document.getElementById('empty-cart-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// 1
function renderProducts(itemsToRender) {
    productList.innerHTML = ''; 
    
    if (itemsToRender.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'Товари не знайдено.';
        productList.appendChild(msg);
        return;
    }

    itemsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const info = document.createElement('span');
        info.textContent = `${product.name} — $${product.price}`;

        // 2,3
        const btn = document.createElement('button');
        btn.textContent = 'Add to cart';
        btn.dataset.productId = product.id; 
        btn.className = 'add-to-cart-btn';

        card.appendChild(info);
        card.appendChild(btn);
        productList.appendChild(card);
    });
}

// 4,5,6
function renderCart() {
    cartList.innerHTML = ''; 
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartList.textContent = 'Кошик порожній.';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';

            const info = document.createElement('span');
            info.textContent = `${item.name} ($${item.price}) x ${item.quantity}`;

            // 8
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.dataset.productId = item.id;
            removeBtn.className = 'remove-btn';

            cartItemEl.appendChild(info);
            cartItemEl.appendChild(removeBtn);
            cartList.appendChild(cartItemEl);
        });
    }

    cartCountDisplay.textContent = totalItems;
    cartTotalDisplay.textContent = totalPrice;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.productId, 10);
        addToCart(productId);
    }
});

cartList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const productId = parseInt(e.target.dataset.productId, 10);
        removeFromCart(productId);
    }
});

// 7
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
});

// 9
emptyCartBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
});

// 10
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

renderProducts(products);
renderCart();