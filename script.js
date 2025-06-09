document.addEventListener('DOMContentLoaded', () => {
    // --- Product Data ---
    const products = [
        // Original products
        { id: 1, name: 'Movado series 800', price: 599.99, image: 'Mens_Watch/Movado series 800.jfif', category: 'mens_watch' },
        { id: 2, name: 'ALexandre Christie', price: 99.50, image: 'Womens_Watch/ALexandre Christie.jfif', category: 'womens_watch' },
        { id: 3, name: 'Daniel Klein', price: 149.00, image: 'Womens_Watch/Daniel Klein Women watch.jpg', category: 'womens_watch' },
        { id: 4, name: 'Luminox master', price: 75.00, image: 'Mens_Watch/Luminox master.jfif', category: 'mens_watch' },
        { id: 5, name: 'Boat Smart_Watch', price: 120.00, image: 'Children_watch/Boat.jfif', category: 'children' },
        { id: 6, name: 'Versace men', price: 350.00, image: 'Mens_Watch/Versace men.jfif', category: 'mens_watch' },
        { id: 7, name: 'Alexandre Christie', price: 450.00, image: 'couple watches/Alexandre Christie.jfif', category: 'couple_watch' },
        { id: 8, name: 'Fossil', price: 360.00, image: 'couple watches/Fossil.jfif', category: 'couple_watch' },
        { id: 9, name: 'Casio', price: 299.99, image: 'Children_watch/Casio.jfif', category: 'children' },
        { id: 10, name: 'Megir', price: 89.00, image: 'Womens_Watch/Megir Women Watch.jpg', category: 'womens_watch' },
        // Newly added watch products (ensure image paths are correct relative to index.html)
        { id: 11, name: 'Rolex ', price: 599.99, image: 'Mens_Watch/watch.webp', category: 'mens_watch' },
        { id: 12, name: 'Fossil ', price: 672.99, image: 'Mens_Watch/FOSSIL mens watch.jfif', category: 'mens_watch' },
        { id: 13, name: 'RElŌGĪO ', price: 390.00, image: 'Mens_Watch/RElŌGĪO Mens Watch.jpg', category: 'mens_watch' },
        { id: 14, name: 'OMEGA ', price: 280.97, image: 'Mens_Watch/OMEGA Mens watch.jfif', category: 'mens_watch' },
        { id: 15, name: 'TITAN EDGE', price: 440.30, image: 'Mens_Watch/TItan Mens watch.jfif', category: 'mens_watch' },
        { id: 16, name: 'Chopard Happy Sport Automatic', price: 720.30, image: 'Womens_Watch/Chopard Happy Sport Automatic.jfif', category: 'womens_watch'},
        { id: 17, name: 'Maserati Epoca', price: 320.70, image: 'couple watches/Maserati Epoca.jfif',category: 'couple_watch'},
        { id: 18, name: 'Revogue', price: 740.45, image: 'couple watches/Revogue.jfif', category: 'couple_watch'},
        { id: 19, name: 'TITAN Neo', price: 320.45, image: 'couple watches/TITAN Neo.jfif', category: 'couple_watch'},
        { id: 20, name: 'TITAN Bandhan', price:420.23, image: 'couple watches/TITAN.jfif', category: 'couple_watch'},
        { id: 21, name: 'Farsler', price: 320.22, image: 'Children_watch/Farsler.jfif', category:'children'},
        { id: 22, name: 'Tenockkids', price: 322.41, image: 'Children_watch/Tenockkids.jfif', category: 'children'},
        { id: 23, name: 'zoop', price: 234.18, image: 'Children_watch/zoop.jfif', category: 'children'}
    ];

    const productGrid = document.getElementById('productGrid');
    const cartButton = document.getElementById('cartButton');
    const cartItemCountSpan = document.getElementById('cartItemCount');
    const cartModal = document.getElementById('cartModal');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalSpan = document.getElementById('cartTotal');
    const clearCartButton = document.getElementById('clearCartButton');
    const checkoutButton = document.getElementById('checkoutButton');
    const body = document.body; // Reference to the body for dark mode and overflow

    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || []; // Load cart from localStorage

    // --- Functions ---

    // 1. Render Products to the Grid
    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ''; // Clear existing products
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No products found in this category.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-category', product.category); // Add category data attribute

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-secondary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
        attachAddToCartListeners(); // Re-attach listeners after rendering products
    }

    // 2. Attach Add to Cart Listeners (using event delegation for efficiency)
    function attachAddToCartListeners() {
        // Since products are re-rendered, we attach to the parent and check the target
        productGrid.removeEventListener('click', handleProductGridClick); // Remove old listener first
        productGrid.addEventListener('click', handleProductGridClick);
    }

    function handleProductGridClick(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.productId);
            const productToAdd = products.find(p => p.id === productId);

            if (productToAdd) {
                addToCart(productToAdd);
            }
        }
    }

    // 3. Add to Cart Functionality
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCartToLocalStorage();
        updateCartDisplay();
        showCartButton();
        // Removed alert for smoother UX, consider a small pop-up or animation instead
        // alert(`"${product.name}" added to cart!`);
    }

    // 4. Update Cart Display (in modal/sidebar)
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            hideCartButton(); // Hide cart button if cart is empty
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity} x $${item.price.toFixed(2)}</p>
                    </div>
                    <span class="cart-item-price">$${(item.quantity * item.price).toFixed(2)}</span>
                    <button class="remove-item-btn" data-product-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.quantity * item.price;
            });
            showCartButton(); // Ensure button is visible if items exist
        }

        cartTotalSpan.textContent = total.toFixed(2);
        cartItemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Update total item count
    }

    // 5. Remove from Cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCartToLocalStorage();
        updateCartDisplay();
    }

    // 6. Clear Cart
    function clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCartToLocalStorage();
            updateCartDisplay();
            hideCartButton();
        }
    }

    // 7. Save Cart to Local Storage
    function saveCartToLocalStorage() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // 8. Show/Hide Cart Button
    function showCartButton() {
        cartButton.classList.add('visible');
    }

    function hideCartButton() {
        // Only hide if cart is actually empty
        if (cart.length === 0) {
            cartButton.classList.remove('visible');
        }
    }

    // 9. Open/Close Cart Modal
    function openCartModal() {
        cartModal.classList.add('open');
        body.style.overflow = 'hidden'; // Prevent scrolling background
    }

    function closeCartModal() {
        cartModal.classList.remove('open');
        body.style.overflow = ''; // Restore scrolling
    }

    // --- Event Listeners ---

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Smooth Scrolling for Navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Optional: Remove active class from all nav links and add to current
                document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Optional: Active nav link on scroll (for when user scrolls, not clicks nav)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for header height and some scroll
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Message sent successfully! (This is a placeholder)');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Category Filtering
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            event.target.classList.add('active');

            const category = event.target.dataset.category;
            // Filter products from the main 'products' array based on the selected category
            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
            renderProducts(filteredProducts); // Re-render the grid with filtered products
        });
    });

    // Cart Button Click (Open Modal)
    cartButton.addEventListener('click', openCartModal);

    // Close Cart Modal
    closeCartButton.addEventListener('click', closeCartModal);
    // Close modal if user clicks outside of the content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    // Remove Item from Cart (Event delegation for dynamically added buttons)
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-trash-alt') || event.target.classList.contains('remove-item-btn')) {
            const productId = parseInt(event.target.closest('.remove-item-btn').dataset.productId);
            removeFromCart(productId);
        }
    });

    // Clear Cart Button
    clearCartButton.addEventListener('click', clearCart);

    // Checkout Button (Placeholder)
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout! (This is a placeholder)');
            // In a real app, this would redirect to a checkout page or start a payment process.
            clearCart(); // Optionally clear cart after "checkout"
            closeCartModal();
        } else {
            alert('Your cart is empty. Please add items before checking out.');
        }
    });

    // --- Initial Load ---
    renderProducts(); // Render all products initially
    updateCartDisplay(); // Update cart display from localStorage on page load
});