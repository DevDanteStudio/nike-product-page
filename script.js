// Wait for page to fully load
document.addEventListener('DOMContentLoaded', function() {

// Get all the elements we need
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const sizeBtns = document.querySelectorAll('.size-btn');
const qtyDisplay = document.getElementById('qtyDisplay');
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.getElementById('cartCount');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Cart elements
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const continueShoppingBtn = document.getElementById('continueShopping');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const totalPriceElement = document.getElementById('totalPrice');
const cartIcon = document.querySelector('.cart-icon');

// Image zoom elements
const mainProductImage = document.getElementById('mainProductImage');
const zoomLens = document.getElementById('zoomLens');
const zoomResult = document.getElementById('zoomResult');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// Wishlist elements
const wishlistBtn = document.getElementById('wishlistBtn');
const heartIcon = document.getElementById('heartIcon');
const wishlistText = document.getElementById('wishlistText');

// Size chart elements
const sizeChartModal = document.getElementById('sizeChartModal');
const sizeGuideBtn = document.querySelector('.size-guide');
const closeSizeChartBtn = document.getElementById('closeSizeChart');

// Checkout button
const checkoutBtn = document.querySelector('.checkout-btn');

// Color selector
const colorOptions = document.querySelectorAll('.color-option');

// Variables to store state
let selectedSize = null;
let quantity = 1;
let cart = [];
let selectedColor = "black";
let wishlist = [];
let isInWishlist = false;

// Product info
let productName = "Air Jordan 1 Retro High OG";
const productPrice = 170;
let productImage = "images/bred-side.jpg";

// Color images mapping
const colorImages = {
    black: {
        name: "Bred",
        main: "images/bred-side.jpg",
        thumbs: [
            "images/bred-side.jpg",
            "images/bred-front.jpg",
            "images/bred-back.jpg",
            "images/bred-sole.jpg"
        ]
    },
    white: {
        name: "White/Black",
        main: "images/whiteblack-side.jpg",
        thumbs: [
            "images/whiteblack-side.jpg",
            "images/whiteblack-front.jpg",
            "images/whiteblack-back.jpg",
            "images/whiteblack-sole.jpg"
        ]
    },
    blue: {
        name: "Royal",
        main: "images/royal-side.jpg",
        thumbs: [
            "images/royal-side.jpg",
            "images/royal-front.jpg",
            "images/royal-back.jpg",
            "images/royal-sole.jpg"
        ]
    },
    purple: {
        name: "White/Purple",
        main: "images/whitepurple-side.jpg",
        thumbs: [
            "images/whitepurple-side.jpg",
            "images/whitepurple-front.jpg",
            "images/whitepurple-back.jpg",
            "images/whitepurple-sole.jpg"
        ]
    }
};

// IMAGE GALLERY FUNCTIONALITY
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const newImg = this.dataset.img;
        mainImage.querySelector('img').src = newImg;
        productImage = newImg;
    });
});

// COLOR SELECTION FUNCTIONALITY
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');

        selectedColor = this.dataset.color;
        const colorData = colorImages[selectedColor];

        productName = `Air Jordan 1 Retro High OG "${colorData.name}"`;
        
        mainImage.querySelector('img').src = colorData.main;
        productImage = colorData.main;

        thumbnails.forEach((thumb, index) => {
            thumb.querySelector('img').src = colorData.thumbs[index];
            thumb.dataset.img = colorData.thumbs[index];
        });

        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[0].classList.add('active');
    });
});

// SIZE SELECTION FUNCTIONALITY
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        sizeBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedSize = this.dataset.size;
        errorMessage.classList.remove('show');
    });
});

// QUANTITY CONTROLS
decreaseQtyBtn.addEventListener('click', function() {
    if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        
        // Pulse animation
        qtyDisplay.classList.add('pulse');
        setTimeout(() => {
            qtyDisplay.classList.remove('pulse');
        }, 200);
    }
});

increaseQtyBtn.addEventListener('click', function() {
    if (quantity < 10) {
        quantity++;
        qtyDisplay.textContent = quantity;
        
        // Pulse animation
        qtyDisplay.classList.add('pulse');
        setTimeout(() => {
            qtyDisplay.classList.remove('pulse');
        }, 200);
    }
});

// ADD TO CART FUNCTIONALITY
addToCartBtn.addEventListener('click', function() {
    if (!selectedSize) {
        errorMessage.classList.add('show');
        successMessage.classList.remove('show');
        return;
    }

    // Show loading state
    this.classList.add('loading');
    this.disabled = true;

    // Simulate brief loading (feels more realistic)
    setTimeout(() => {
        const cartItem = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            size: selectedSize,
            quantity: quantity,
            image: productImage,
            total: productPrice * quantity
        };

        cart.push(cartItem);
        updateCartCount();
        
        successMessage.classList.add('show');
        errorMessage.classList.remove('show');
        
        openCart();
        
        // Remove loading state
        this.classList.remove('loading');
        this.disabled = false;
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 2000);

        quantity = 1;
        qtyDisplay.textContent = quantity;
        sizeBtns.forEach(b => b.classList.remove('selected'));
        selectedSize = null;
        
        renderCart();
    }, 800); // 800ms loading delay
});

// CART FUNCTIONS
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
}

closeCartBtn.addEventListener('click', closeCart);
continueShoppingBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartIcon.addEventListener('click', openCart);

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        totalPriceElement.textContent = '$0.00';
        const subtotalElement = document.getElementById('subtotalPrice');
        if (subtotalElement) {
            subtotalElement.textContent = '$0.00';
        }
        return;
    }

    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-info">Size: UK ${item.size}</div>
                    <div class="cart-item-price-row">
                        <span class="cart-item-quantity">Qty: ${item.quantity}</span>
                        <span class="cart-item-price">$${item.total.toFixed(2)}</span>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    
    const subtotalElement = document.getElementById('subtotalPrice');
    if (subtotalElement) {
        subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

window.removeFromCart = function(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCart();
}

renderCart();

// IMAGE ZOOM FUNCTIONALITY
if (mainImage && zoomLens && zoomResult && mainProductImage) {
    mainImage.addEventListener('mousemove', function(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        zoomLens.style.left = x - 50 + 'px';
        zoomLens.style.top = y - 50 + 'px';
        
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        
        zoomResult.style.backgroundImage = `url('${mainProductImage.src}')`;
        zoomResult.style.backgroundPosition = `${percentX}% ${percentY}%`;
    });
}

// PRODUCT TABS FUNCTIONALITY
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// WISHLIST FUNCTIONALITY
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
        isInWishlist = !isInWishlist;
        
        if (isInWishlist) {
            this.classList.add('active');
            heartIcon.textContent = '♥';
            wishlistText.textContent = 'In Wishlist';
            
            const wishlistItem = {
                id: Date.now(),
                name: productName,
                price: productPrice,
                color: selectedColor,
                image: productImage
            };
            wishlist.push(wishlistItem);
            
            showNotification('Added to wishlist! ❤️');
        } else {
            this.classList.remove('active');
            heartIcon.textContent = '♡';
            wishlistText.textContent = 'Add to Wishlist';
            
            wishlist = wishlist.filter(item => item.name !== productName);
            
            showNotification('Removed from wishlist');
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// SIZE CHART MODAL FUNCTIONALITY
if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sizeChartModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (closeSizeChartBtn) {
    closeSizeChartBtn.addEventListener('click', function() {
        sizeChartModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

if (sizeChartModal) {
    sizeChartModal.addEventListener('click', function(e) {
        if (e.target === sizeChartModal) {
            sizeChartModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sizeChartModal && sizeChartModal.classList.contains('show')) {
        sizeChartModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// CHECKOUT FUNCTIONALITY
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty! Add some items first.');
            return;
        }
        
        const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        alert(`🛒 ORDER SUMMARY\n\n` +
              `Total Items: ${totalItems}\n` +
              `Subtotal: $${totalPrice.toFixed(2)}\n` +
              `Shipping: FREE\n` +
              `─────────────────\n` +
              `Total: $${totalPrice.toFixed(2)}\n\n` +
              `Proceeding to checkout...\n\n` +
              `(This is a demo - no actual payment will be processed)`);
    });
}
// SCROLL ANIMATIONS
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', animateOnScroll);

// Run on load
animateOnScroll();
// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
}); // END OF DOMContentLoaded