document.addEventListener('DOMContentLoaded', () => {
    // --- Product Data ---
    const products = [
        // All product image paths now correctly start with 'Retail_Website/'
        { id: 1, name: 'Movado series 800', price: 199.99, image: './Mens_Watch/Movado_series_800.jfif', category: 'mens_watch' },
        { id: 2, name: 'ALexandre Christie', price: 99.50, image: './Womens_Watch/ALexandre_Christie.jfif', category: 'womens_watch' },
        { id: 3, name: 'Daniel Klein', price: 149.00, image: './Womens_Watch/Daniel_Klein_Women_watch.jpg', category: 'womens_watch' },
        { id: 4, name: 'Luminox master', price: 75.00, image: './Mens_Watch/Luminox_master.jfif', category: 'mens_watch' },
        { id: 5, name: 'Boat Smart_Watch', price: 120.00, image: './Children_watch/Boat.jfif', category: 'children' },
        { id: 6, name: 'Versace men', price: 50.00, image: './Mens_Watch/Versace_men.jfif', category: 'mens_watch' },
        { id: 7, name: 'Alexandre Christie', price: 45.00, image: './couple watches/Alexandre_Christie.jfif', category: 'couple_watch' },
        { id: 8, name: 'Fossil', price: 60.00, image: './couple watches/Fossil.jfif', category: 'couple_watch' },
        { id: 9, name: 'Casio', price: 299.99, image: './Children_watch/Casio.jfif', category: 'children' },
        { id: 10, name: 'Megir', price: 89.00, image: './Womens_Watch/Megir_Women_Watch.jpg', category: 'womens_watch' },
        { id: 11, name: 'Rolex ', price: 99.99, image: './Mens_Watch/watch.webp', category: 'mens_watch' },
        { id: 12, name: 'Fossil ', price: 172.99, image: './Mens_Watch/FOSSIL_mens_watch.jfif', category: 'mens_watch' },
        { id: 13, name: 'RElŌGĪO ', price: 39.00, image: './Mens_Watch/RElŌGĪO_Mens_Watch.jpg', category: 'mens_watch' },
        { id: 14, name: 'OMEGA ', price: 80.97, image: './Mens_Watch/OMEGA_Mens_watch.jfif', category: 'mens_watch' },
        { id: 15, name: 'TITAN EDGE', price: 40.30, image: './Mens_Watch/TItan_Mens_watch.jfif', category: 'mens_watch' },
        { id: 16, name: 'Chopard Happy Sport Automatic', price: 72.30, image: './Womens_Watch/Chopard_Happy_Sport_Automatic.jfif', category: 'womens_watch'},
        { id: 17, name: 'Maserati Epoca', price: 20.70, image: './couple watches/Maserati_Epoca.jfif',category: 'couple_watch'},
        { id: 18, name: 'Revogue', price: 74.45, image: './couple watches/Revogue.jfif', category: 'couple_watch'},
        { id: 19, name: 'TITAN Neo', price: 32.45, image: './couple watches/TITAN_Neo.jfif', category: 'couple_watch'},
        { id: 20, name: 'TITAN Bandhan', price:20.23, image: './couple watches/TITAN.jfif', category: 'couple_watch'},
        { id: 21, name: 'Farsler', price: 32.22, image: './Children_watch/Farsler.jfif', category:'children'},
        { id: 22, name: 'Tenockkids', price: 22.41, image: './Children_watch/Tenockkids.jfif', category: 'children'},
        { id: 23, name: 'zoop', price: 34.18, image: './Children_watch/zoop.jfif', category: 'children'}
    ];


    // --- DOM Elements ---
    const preloader = document.getElementById('preloader');
    const productGrid = document.getElementById('productGrid');
    const cartButton = document.getElementById('cartButton');
    const cartItemCountSpan = document.getElementById('cartItemCount');
    const cartModal = document.getElementById('cartModal');
    const closeCartButton = document.getElementById('closeCartButton');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalSpan = document.getElementById('cartTotal');
    const clearCartButton = document.getElementById('clearCartButton');
    const checkoutButton = document.getElementById('checkoutButton');
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('formMessage'); // For form submission messages
    const shopNowButton = document.querySelector('.hero-section .btn-primary');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // --- Cart State ---
    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    // --- Preloader Logic ---
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- Dark/Light Mode Toggling ---
    // Check local storage for theme preference, default to dark-mode if not found
    const currentTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.add(currentTheme);
    updateDarkModeToggleIcon(currentTheme);

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateDarkModeToggleIcon('light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateDarkModeToggleIcon('dark-mode');
        }
    });

    function updateDarkModeToggleIcon(theme) {
        if (theme === 'dark-mode') {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }


    // --- Smooth Scrolling for Navigation ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Remove 'active' from all links
                navLinks.forEach(nav => nav.classList.remove('active'));
                // Add 'active' to the clicked link
                link.classList.add('active');

                // Scroll to the target section
                window.scrollTo({
                    top: targetSection.offsetTop - (document.querySelector('.main-header').offsetHeight), // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - (document.querySelector('.main-header').offsetHeight + 50); // Offset for header + buffer
            if (scrollY >= sectionTop) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });

        // Show/hide cart button on scroll
        if (window.scrollY > document.querySelector('.hero-section').offsetHeight / 2) {
            cartButton.classList.add('visible');
        } else {
            cartButton.classList.remove('visible');
        }
    });


    // --- Product Rendering ---
    function renderProducts(filteredProducts = products) {
        productGrid.innerHTML = ''; // Clear existing products
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p class="no-products-message">No products found for this category.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn btn-primary">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // --- Product Filtering ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove 'active' from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' to the clicked button
            e.target.classList.add('active');

            const category = e.target.dataset.category;
            let filtered = [];
            if (category === 'all') {
                filtered = products;
            } else {
                filtered = products.filter(product => product.category === category);
            }
            renderProducts(filtered);
            // Re-apply scroll reveal after filtering/rendering
            applyScrollReveal();
        });
    });

    // Initial render of all products
    renderProducts();

    // --- Add to Cart Logic ---
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.id);
            const product = products.find(p => p.id === productId);

            if (product) {
                const existingCartItem = cart.find(item => item.id === productId);
                if (existingCartItem) {
                    existingCartItem.quantity++;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                saveCart();
                updateCartUI();
                showToastNotification(`${product.name} added to cart!`);
                cartButton.classList.add('bouncing');
                setTimeout(() => {
                    cartButton.classList.remove('bouncing');
                }, 600); // Remove bounce class after animation
            }
        }
    });

    // --- Cart Modal Functionality ---
    cartButton.addEventListener('click', () => {
        cartModal.classList.add('open');
        body.style.overflow = 'hidden'; // Prevent scrolling background
        updateCartUI();
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('closing'); // Add closing class for animation
        setTimeout(() => {
            cartModal.classList.remove('open', 'closing');
            body.style.overflow = ''; // Restore scrolling
        }, 400); // Match CSS transition duration
    });

    // Close cart modal if clicking outside content
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.add('closing');
            setTimeout(() => {
                cartModal.classList.remove('open', 'closing');
                body.style.overflow = '';
            }, 400);
        }
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            cartItemCountSpan.textContent = '0';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.dataset.id = item.id;
                cartItemElement.innerHTML = `
                    <img src="images/${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" aria-label="Remove ${item.name}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
            });
            cartItemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Remove item from cart
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn') || e.target.closest('.remove-item-btn')) {
            const button = e.target.closest('.remove-item-btn');
            const cartItemElement = button.closest('.cart-item');
            const productId = parseInt(cartItemElement.dataset.id);

            // Animate removal
            cartItemElement.style.opacity = '0';
            cartItemElement.style.transform = 'translateX(-20px)';
            cartItemElement.style.height = '0';
            cartItemElement.style.padding = '0';
            cartItemElement.style.marginBottom = '0';
            cartItemElement.style.overflow = 'hidden';

            setTimeout(() => {
                cart = cart.filter(item => item.id !== productId);
                saveCart();
                updateCartUI();
                if (cart.length === 0) {
                    // If cart becomes empty, add the message immediately
                    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
                }
            }, 300); // Allow animation to play
        }
    });

    // Clear entire cart
    clearCartButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            saveCart();
            updateCartUI();
            showToastNotification('Cart cleared successfully!', 'success');
        }
    });

    // Checkout (placeholder)
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showToastNotification('Your cart is empty. Add some products to checkout!', 'error');
            return;
        }
        alert('Proceeding to checkout! (This is a demo)');
        // In a real application, you'd send cart data to a server here
        cart = []; // Clear cart after "checkout"
        saveCart();
        updateCartUI();
        closeCartButton.click(); // Close the modal
    });

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Initial cart UI update on load
    updateCartUI();


    // --- Form Submission (Contact Form) ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Simulate form validation/submission
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const product_id = document.getElementById('product_id').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Simulate success
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset(); // Clear the form
        } else {
            // Simulate error
            showFormMessage('Please fill in all required fields.', 'error');
        }

        //convert product ID to number, handling empty/invalid input
        let product_id = null;
        if(product_id !== ''){
            const parseproductid =parseInt(product_id);
            if (!isNaN(parseproductid)) {
                product_id = parseproductid;
            } else{
                showMessage("Please enter valid numeric Product ID.", 4000);
                return;
            }
        }
        console.log("contact from is submitted");

        gtag('event','contactform_event,{
             user_name: name,
             user_email: email,
             user_age: age,
             user_productid: product_id,
             user_message: message,
             submission_count: 1
    })

    console.log('contactform_event sent successfullyyyyyyyyyy')
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message show ${type}`; // Add 'show' and type classes
        setTimeout(() => {
            formMessage.classList.remove('show');
            formMessage.textContent = ''; // Clear message after fading out
        }, 5000); // Hide after 5 seconds
    }


    // --- Scroll Reveal Animations ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .product-card');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible

    function applyScrollReveal() {
        scrollRevealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initial application of scroll reveal
    applyScrollReveal();


    // --- Toast Notification System ---
    let toastTimeout;
    function showToastNotification(message, type = 'info') {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.classList.add('toast-notification');
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = 'toast-notification show'; // Reset classes
        if (type === 'success') {
            toast.style.backgroundColor = 'var(--success-color-dark)'; // Use dark mode success color
            toast.style.color = 'white';
        } else if (type === 'error') {
            toast.style.backgroundColor = 'var(--danger-color-dark)'; // Use dark mode danger color
            toast.style.color = 'white';
        } else { // Default info
            toast.style.backgroundColor = 'var(--card-background-dark)';
            toast.style.color = 'var(--text-color-dark)';
        }

        // Adjust for light mode
        if (body.classList.contains('light-mode')) {
             if (type === 'success') {
                toast.style.backgroundColor = 'var(--success-color-light)';
                toast.style.color = 'white';
            } else if (type === 'error') {
                toast.style.backgroundColor = 'var(--danger-color-light)';
                toast.style.color = 'white';
            } else { // Default info
                toast.style.backgroundColor = 'var(--card-background-light)';
                toast.style.color = 'var(--text-color-light)';
            }
        }


        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // Notification visible for 3 seconds
    }


    // --- Shop Now Button functionality ---
    // If you want the "Shop Now!" button to scroll to products section
    if (shopNowButton) {
        shopNowButton.addEventListener('click', (e) => {
            e.preventDefault();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                window.scrollTo({
                    top: productsSection.offsetTop - document.querySelector('.main-header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
});
