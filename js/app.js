const products = [
    // Skincare
    {
        id: 1,
        name: "Radiance Vitamin C Serum",
        category: "Skincare",
        price: 15500,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        description: "A potent Vitamin C serum that brightens and evens skin tone. Infused with botanical extracts for a mature, healthy glow.",
        combos: ["Glow Duo", "Daily Shield"]
    },
    {
        id: 2,
        name: "Emerald Detox Mask",
        category: "Skincare",
        price: 12500,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
        description: "A deep-cleansing mask with green tea and clay. Perfect for mature skin looking for a refresh.",
        combos: ["Clear Skin Bundle"]
    },
    // Watches
    {
        id: 3,
        name: "Marvin Elite Chrono",
        category: "Watches",
        price: 85000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        description: "Sophisticated craftsmanship meeting modern precision. The definitive statement for the modern man.",
        combos: ["Gentleman's Set"]
    },
    {
        id: 4,
        name: "Midnight Classic",
        category: "Watches",
        price: 65000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        description: "Black leather strap with a matte finish. Sleek, minimalist, and timeless.",
        combos: ["Executive Pack"]
    },
    // Perfumes
    {
        id: 5,
        name: "Signature Noir",
        category: "Perfumes",
        price: 45000,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        description: "An intoxicating blend of woody notes and citrus. A scent for the confident and mature.",
        combos: ["Scent Duo"]
    },
    {
        id: 6,
        name: "Velvet Oud",
        category: "Perfumes",
        price: 55000,
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800",
        description: "Deep, mysterious, and long-lasting. Marvin's most requested premium fragrance.",
        combos: ["Oud Journey"]
    },
    // Adult Wellness (Adult Joys)
    {
        id: 7,
        name: "Silken Whisper",
        category: "Adult Joys",
        price: 32000,
        image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800", // Representative elegant image
        description: "Premium wellness device designed for ultimate comfort and pleasure. Discreet and ultra-sleek.",
        combos: ["Night of Joy"]
    },
    {
        id: 8,
        name: "Midnight Passion",
        category: "Adult Joys",
        price: 28000,
        image: "../images/pleasure.webp",
        description: "Elegant, powerful, and whisper-quiet massage tool for your most intimate moments.",
        combos: ["Couple's Deluxe"]
    }
];

const categories = [
    { name: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800" },
    { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
    { name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800" },
    { name: "Adult Joys", image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800" }
];

const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
    "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
    "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory (FCT)"
];
// Cart Management
let cart = JSON.parse(localStorage.getItem('marvinCart')) || [];

// Constants
const WHATSAPP_NUMBER = "2348122656972";
const BANK_DETAILS = {
    bank: "Zenith Bank",
    accountName: "Marvin Global Enterprise",
    accountNumber: "1234567890"
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    injectModals();
    injectBackToTop();
    renderCategories();
    renderProducts();
    updateCartUI();
    initScrollEffects();
    renderFooterCategories();
});

function renderFooterCategories() {
    const container = document.getElementById('footer-categories');
    if (!container) return;
    container.innerHTML = categories.map(cat => `
        <a href="category.html?cat=${encodeURIComponent(cat.name)}" class="footer-link fw-bold">${cat.name}</a>
    `).join('');
}

function formatNaira(amount) {
    return '₦' + amount.toLocaleString();
}

function injectBackToTop() {
    const btn = document.createElement('div');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

function initScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function injectModals() {
    if (document.getElementById('cartOffcanvas')) return;

    const modalHTML = `
    <div class="modal fade" id="productModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content overflow-hidden">
                <div class="modal-header border-0 pb-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body pt-0" id="product-modal-body"></div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" style="width: 400px; max-width: 100%;">
        <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title fw-bold">Your Bag</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <div id="cart-items-container"></div>
            <div id="cart-empty-message" class="text-center py-5">
                <i class="bi bi-bag-x fs-1 text-muted mb-3 d-block"></i>
                <p class="text-muted">Your bag is empty.</p>
                <a href="index.html#products" class="btn btn-premium rounded-pill px-4" data-bs-dismiss="offcanvas">Start Shopping</a>
            </div>
        </div>
        <div class="offcanvas-footer p-4 border-top bg-light" id="cart-footer" style="display:none">
            <div class="d-flex justify-content-between mb-4">
                <span class="h5 mb-0 fw-bold">Total</span>
                <span class="h5 mb-0 fw-bold" id="cart-total-price">₦0.00</span>
            </div>
            <button class="btn btn-premium w-100 py-3 rounded-4 fw-bold" onclick="showCheckout()">Proceed to Checkout</button>
        </div>
    </div>

    <div class="modal fade" id="checkoutModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold">Delivery Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="checkout-modal-body">
                    <form id="checkout-form">
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                            <input type="text" class="form-control" id="customer-name" required placeholder="John Doe">
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label small fw-bold text-uppercase text-muted">Phone Number</label>
                                <input type="tel" class="form-control" id="customer-phone" required placeholder="08123456789">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label small fw-bold text-uppercase text-muted">State</label>
                                <select class="form-select" id="customer-state" required>
                                    <option value="">Select State</option>
                                    ${NIGERIAN_STATES.map(state => `<option value="${state}">${state}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-uppercase text-muted">Full Address</label>
                            <textarea class="form-control" id="customer-address" rows="2" required placeholder="Apartment, Street, City"></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-bold text-uppercase text-muted">Nearest Landmark</label>
                            <input type="text" class="form-control" id="customer-landmark" required placeholder="e.g. Near Mega Plaza">
                        </div>
                        <div class="p-3 rounded-4 mb-4" style="background: rgba(212, 175, 55, 0.05); border: 1px dashed var(--primary-color);">
                            <p class="small mb-0 text-dark">
                                <i class="bi bi-info-circle-fill text-primary me-2"></i><strong>Disclaimer:</strong> Delivery fee is paid upon arrival. Orders to remote areas may be subject to refund if logistics aren't feasible.
                            </p>
                        </div>
                        <button type="submit" class="btn btn-premium w-100 py-3 rounded-4 fw-bold">View Order Summary</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="paymentModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold">Payment Proof</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="payment-modal-body"></div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const customerData = {
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone').value,
                state: document.getElementById('customer-state').value,
                address: document.getElementById('customer-address').value,
                landmark: document.getElementById('customer-landmark').value
            };
            showPayment(customerData);
        });
    }
}

function renderCategories() {
    const container = document.getElementById('category-list');
    if (!container) return;
    container.innerHTML = categories.map((cat, index) => `
        <div class="col-6 col-md-4 fade-in-up" style="animation-delay: ${index * 0.1}s">
            <div class="category-card" onclick="location.href='category.html?cat=${encodeURIComponent(cat.name)}'">
                <img src="${cat.image}" alt="${cat.name}">
                <div class="category-overlay">
                    <h5 class="mb-0 fw-bold text-uppercase" style="letter-spacing: 2px;">${cat.name}</h5>
                </div>
            </div>
        </div>
    `).join('');
}

function renderProducts(filter = 'All') {
    const homeContainer = document.getElementById('product-list');
    const categoryContainer = document.getElementById('category-products');
    const container = homeContainer || categoryContainer;

    if (!container) return;

    const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

    container.innerHTML = filtered.map((prod, index) => `
        <div class="col-6 col-md-4 col-lg-3 fade-in-up" style="animation-delay: ${index * 0.1}s">
            <div class="product-card">
                <div class="product-image-wrapper" onclick="showProductDetails(${prod.id})">
                    <img src="${prod.image}" alt="${prod.name}">
                    <div class="quick-view-badge">Quick View</div>
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.category}</span>
                    <h5 class="product-name" onclick="showProductDetails(${prod.id})">${prod.name}</h5>
                    <p class="product-price">${formatNaira(prod.price)}</p>
                </div>
                <button class="btn btn-add-cart" onclick="addToCart(${prod.id})">
                    <i class="bi bi-bag-plus me-2"></i>Add to Bag
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    const dropdown = document.getElementById('homepage-category-filter');
    if (dropdown) dropdown.value = category;
    renderProducts(category);
    // Scroll to products
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modalBody = document.getElementById('product-modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
                <div class="rounded-4 overflow-hidden h-100" style="background: #fdfdfd;">
                    <img src="${product.image}" class="img-fluid w-100 h-100 object-fit-cover" alt="${product.name}">
                </div>
            </div>
            <div class="col-md-6 d-flex flex-column">
                <span class="product-category text-uppercase fw-bold opacity-50 mb-2">${product.category}</span>
                <h2 class="fw-bold mb-3 display-6">${product.name}</h2>
                <h3 class="text-primary fw-bold mb-4">${formatNaira(product.price)}</h3>
                <p class="text-muted mb-4 lead small">${product.description}</p>
                
                <div class="mb-4">
                    <label class="fw-bold mb-2 small text-uppercase">Quantity</label>
                    <div class="input-group" style="width: 140px;">
                        <button class="btn btn-outline-dark rounded-start-pill border-0 bg-light" onclick="changeModalQty(-1)">-</button>
                        <input type="text" class="form-control text-center bg-white border-0 fw-bold" id="modal-qty" value="1" readonly>
                        <button class="btn btn-outline-dark rounded-end-pill border-0 bg-light" onclick="changeModalQty(1)">+</button>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="fw-bold mb-2 d-block small text-uppercase">Exclusive Bundles</label>
                    <div class="d-flex flex-wrap gap-2 text-dark">
                        ${product.combos.map(combo => `<span class="badge rounded-pill bg-light text-dark border p-2 px-3 fw-normal">${combo}</span>`).join('')}
                    </div>
                </div>

                <button class="btn btn-premium btn-lg w-100 py-3 rounded-4 mt-auto fw-bold" onclick="addToCart(${product.id}, parseInt(document.getElementById('modal-qty').value))">
                    ADD TO BAG
                </button>
            </div>
        </div>
    `;

    new bootstrap.Modal(document.getElementById('productModal')).show();
}

function changeModalQty(step) {
    const input = document.getElementById('modal-qty');
    let val = parseInt(input.value) + step;
    if (val < 1) val = 1;
    input.value = val;
}

function addToCart(id, qty = 1) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }

    saveCart();
    updateCartUI();

    const productModal = document.getElementById('productModal');
    const bsModal = bootstrap.Modal.getInstance(productModal);
    if (bsModal) bsModal.hide();

    const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    offcanvas.show();
}

function updateCartQty(id, step) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += step;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('marvinCart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-footer');
    const emptyMsg = document.getElementById('cart-empty-message');
    const countBadge = document.getElementById('cart-count');
    const totalPrice = document.getElementById('cart-total-price');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    countBadge.innerText = totalItems;
    countBadge.style.display = totalItems > 0 ? 'block' : 'none';
    emptyMsg.style.display = totalItems > 0 ? 'none' : 'block';
    footer.style.display = totalItems > 0 ? 'block' : 'none';

    if (totalItems > 0) {
        container.innerHTML = cart.map(item => `
            <div class="cart-item border-bottom pb-3 mb-3">
                <div class="d-flex gap-3">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 12px;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fw-bold">${item.name}</h6>
                        <p class="text-primary small fw-bold mb-2">${formatNaira(item.price)}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="quantity-control" style="background: #f8f8f8; border-radius: 20px;">
                                <button class="quantity-btn border-0 bg-transparent px-3" onclick="updateCartQty(${item.id}, -1)">-</button>
                                <span class="fw-bold">${item.quantity}</span>
                                <button class="quantity-btn border-0 bg-transparent px-3" onclick="updateCartQty(${item.id}, 1)">+</button>
                            </div>
                            <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart(${item.id})">
                                 <i class="bi bi-trash fs-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    totalPrice.innerText = formatNaira(totalCost);
}

function showCheckout() {
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvas);
    if (bsOffcanvas) bsOffcanvas.hide();

    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
}

function showPayment(customer) {
    const checkoutModal = document.getElementById('checkoutModal');
    const bsModal = bootstrap.Modal.getInstance(checkoutModal);
    if (bsModal) bsModal.hide();

    const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = "MVN-" + Math.floor(1000 + Math.random() * 9000);

    const body = document.getElementById('payment-modal-body');
    body.innerHTML = `
        <div class="text-center mb-4">
            <span class="text-muted small text-uppercase fw-bold letter-spacing-1">Ref ID: ${orderId}</span>
            <h4 class="fw-bold mt-2">Finish Your Order</h4>
        </div>
        
        <div class="p-4 rounded-4 mb-4 bg-light border border-light">
            <h6 class="fw-bold mb-3 text-uppercase small letter-spacing-1">Summary</h6>
            ${cart.map(item => `
                <div class="d-flex justify-content-between mb-2">
                    <span class="small">${item.name} <span class="text-muted">x${item.quantity}</span></span>
                    <span class="small fw-bold">${formatNaira(item.price * item.quantity)}</span>
                </div>
            `).join('')}
            <div class="d-flex justify-content-between pt-3 border-top mt-3">
                <span class="fw-bold">Payable Amount</span>
                <span class="fw-bold text-primary h5 mb-0">${formatNaira(totalCost)}</span>
            </div>
        </div>

        <div class="p-4 rounded-4 mb-4 border border-warning" style="background: #fffdf5;">
            <h6 class="fw-bold mb-3 text-warning"><i class="bi bi-bank2 me-2"></i>Transfer Details</h6>
            <div class="small">
                <p class="mb-2 d-flex justify-content-between"><span>Bank:</span> <strong>${BANK_DETAILS.bank}</strong></p>
                <p class="mb-2 d-flex justify-content-between"><span>Name:</span> <strong>${BANK_DETAILS.accountName}</strong></p>
                <p class="mb-0 d-flex justify-content-between"><span>Account:</span> <strong>${BANK_DETAILS.accountNumber}</strong></p>
            </div>
        </div>

        <p class="small text-muted text-center mb-4 px-3">
            Transfer confirmed orders are processed immediately. Please send proof via WhatsApp below.
        </p>

        <button class="btn btn-premium w-100 py-3 rounded-4 fw-bold shadow-sm" onclick="sendWhatsApp('${orderId}', '${totalCost}', ${JSON.stringify(customer).replace(/"/g, '&quot;')})">
            <i class="bi bi-whatsapp me-2"></i>NOTIFY ON WHATSAPP
        </button>
    `;

    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

function sendWhatsApp(orderId, amount, customer) {
    const items = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const message = `*NEW ORDER FROM MARVIN GLOBAL*\n\n` +
        `*ORDER ID:* ${orderId}\n` +
        `*ITEMS:* ${items}\n` +
        `*TOTAL:* ₦${parseInt(amount).toLocaleString()}\n\n` +
        `*DELIVERY INFO:*\n` +
        `*Name:* ${customer.name}\n` +
        `*Phone:* ${customer.phone}\n` +
        `*State:* ${customer.state}\n` +
        `*Address:* ${customer.address}\n` +
        `*Landmark:* ${customer.landmark}\n\n` +
        `_Proof of payment attached below._`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}
// --- POS Logic ---
// Wrapped to avoid conflicts with global cart or products if possible, but accessible globally as needed.

// POS State
let posCart = [];
let currentPaymentMode = 'cash';

// --- Initialization ---
function initPOS() {
    if (!document.getElementById('pos-layout')) return; // Exit if not on POS page

    document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
    renderPosProducts(products); // Use global products from products.js (assumed loaded or merged)

    // --- Search & Filter ---
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', (e) => filterPosProducts(null, e.target.value));

    const mobileSearch = document.getElementById('mobileSearch');
    if (mobileSearch) mobileSearch.addEventListener('input', (e) => filterPosProducts(null, e.target.value));
}

function filterPosProducts(category, searchTerm = '') {
    // Handle Active Button State
    if (category) {
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        // The event object might not be available if called programmatically without it,
        // using the event passed or window.event if available, but for direct calls, just class manipulation:
        const clickedBtn = Array.from(document.querySelectorAll('.cat-btn')).find(b => b.innerText.toLowerCase().includes(category.toLowerCase()));
        if (clickedBtn) clickedBtn.classList.add('active');
        else if (event && event.target) event.target.classList.add('active');
    }

    const activeCatBtn = document.querySelector('.cat-btn.active');
    // Map button text to category names in products.js if needed.
    // products.js uses "Skincare", "Watches", "Perfumes", "Adult Joys"
    // Buttons use "All Items", "Watches", "Perfumes", "Skin Care", "Adult Toys"
    let activeCat = category || (activeCatBtn ? activeCatBtn.innerText : 'All Items');

    // Normalize category
    if (activeCat === 'All Items') activeCat = 'All';
    if (activeCat === 'Skin Care') activeCat = 'Skincare';
    if (activeCat === 'Adult Toys') activeCat = 'Adult Joys'; // Map "Adult Toys" button to "Adult Joys" in data

    // Search term logic
    const term = searchTerm.toLowerCase();

    const filtered = products.filter(p => {
        const matchCat = activeCat === 'All' ? true : p.category === activeCat;
        const matchSearch = p.name.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });

    renderPosProducts(filtered);
}

// --- Rendering ---
function renderPosProducts(list) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    // Map product data to POS card. properties: id, name, price, stock (missing in products.js, defaulting), img/image
    // products.js has 'image', pos.js expected 'img'. We use 'image'.
    // products.js has NO stock. We will fake it or random it or default it.

    grid.innerHTML = list.map(p => {
        const stock = p.stock || Math.floor(Math.random() * 20) + 1; // Fake stock if missing
        return `
        <div class="pos-product-card" onclick="addToPosCart(${p.id})">
            <img src="${p.image}" alt="${p.name}" class="pos-product-img">
            <h6 class="fw-bold mb-1 text-dark small">${p.name}</h6>
            <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
                    <span class="badge bg-light text-dark border">₦${p.price.toLocaleString()}</span>
                    <span class="badge ${stock < 10 ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} small" style="font-size: 0.65rem">${stock} left</span>
            </div>
            <button class="btn btn-sm btn-dark w-100 rounded-pill" style="font-size: 0.8rem">Add to Cart</button>
        </div>
    `}).join('');
}

function renderPosCart() {
    const container = document.getElementById('cartItemsContainer');
    const countFab = document.getElementById('cartCountFab');
    if (!container) return;

    if (posCart.length === 0) {
        container.innerHTML = `
        <div class="text-center text-muted mt-5">
            <i class="fas fa-basket-shopping fa-3x mb-3 opacity-25"></i>
            <p>Cart is currently empty</p>
            <small>Select items from the grid to add them.</small>
        </div>`;
        if (countFab) countFab.innerText = '0';
        updatePosTotals();
        return;
    }

    let totalItems = 0;

    container.innerHTML = posCart.map(item => {
        const product = products.find(p => p.id === item.id);
        totalItems += item.qty;
        return `
    <div class="cart-item">
        <div>
            <h6 class="mb-0 fw-bold small">${product.name}</h6>
            <small class="text-muted">₦${product.price.toLocaleString()}</small>
        </div>
        <div class="qty-controls">
            <button class="qty-btn minus" onclick="updatePosQty(${item.id}, -1)">-</button>
            <span class="fw-bold px-2 small">${item.qty}</span>
            <button class="qty-btn" onclick="updatePosQty(${item.id}, 1)">+</button>
        </div>
    </div>`;
    }).join('');

    if (countFab) countFab.innerText = totalItems;
    updatePosTotals();
}

function updatePosTotals() {
    const total = posCart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product.price * item.qty);
    }, 0);

    const sub = document.getElementById('cartSubtotal');
    const tot = document.getElementById('cartTotal');
    if (sub) sub.innerText = '₦' + total.toLocaleString();
    if (tot) tot.innerText = '₦' + total.toLocaleString();
}

// --- Cart Actions ---
window.addToPosCart = function (id) {
    const existing = posCart.find(item => item.id === id);
    const product = products.find(p => p.id === id);
    const stock = product.stock || 20; // Default stock

    if (existing) {
        if (existing.qty < stock) {
            existing.qty++;
        } else {
            alert('No more stock available!');
            return;
        }
    } else {
        posCart.push({ id: id, qty: 1 });
    }

    // Mobile: Show cart if closed
    const sidebar = document.getElementById('cartSidebar');
    if (window.innerWidth < 992 && sidebar && !sidebar.classList.contains('show')) {
        // toggleCart(); 
    }
    renderPosCart();
}

window.updatePosQty = function (id, change) {
    const index = posCart.findIndex(item => item.id === id);
    if (index === -1) return;

    const item = posCart[index];
    const product = products.find(p => p.id === id);
    const stock = product.stock || 20;

    if (change === 1 && item.qty >= stock) {
        alert('Max stock reached');
        return;
    }

    item.qty += change;

    if (item.qty <= 0) {
        posCart.splice(index, 1);
    }
    renderPosCart();
}

window.toggleCart = function () {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) sidebar.classList.toggle('show');
}

window.setPaymentMode = function (mode) {
    currentPaymentMode = mode;
    const btnCash = document.getElementById('btnCash');
    const btnTransfer = document.getElementById('btnTransfer');

    if (btnCash) btnCash.className = mode === 'cash' ? 'btn btn-sm btn-dark flex-fill rounded-pill' : 'btn btn-sm btn-outline-dark flex-fill rounded-pill';
    if (btnTransfer) btnTransfer.className = mode === 'transfer' ? 'btn btn-sm btn-dark flex-fill rounded-pill' : 'btn btn-sm btn-outline-dark flex-fill rounded-pill';
}

window.processCheckout = function () {
    if (posCart.length === 0) {
        alert('Cart is empty');
        return;
    }
    const name = document.getElementById('customerName').value;
    if (!name) {
        alert('Please enter customer name');
        return;
    }

    alert(`Payment Successful!\nMode: ${currentPaymentMode.toUpperCase()}\nCustomer: ${name}`);
    // Reset
    posCart = [];
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    renderPosCart();
    if (window.innerWidth < 992) toggleCart();
}

// Auto-init on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPOS);
} else {
    initPOS();
}
