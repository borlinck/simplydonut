document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.querySelector('#home');
    const nextSection = document.querySelector('#strawberry');
    const homeLogo = document.querySelector('.navbar-brand');
    const homeLink = document.querySelector('.navbar .nav-link[href="#home"]');
    const homeButton = document.querySelector('.homeButton');
    const navbar = document.querySelector('.navbar');
    let homeHidden = false;
    let cart = [];

    function startAnimation() {
        if (homeHidden) return;

        const donutLogoImg = homeSection.querySelector('.donutLogoImg');
        const brandName = homeSection.querySelector('.brandName');
        const nameBrand = homeSection.querySelector('.nameBrand');

        donutLogoImg.classList.add('fly-away-left');
        brandName.classList.add('fly-away-right');
        nameBrand.classList.add('fly-away-up');

        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            homeSection.classList.add('hidden');
            homeHidden = true;

            donutLogoImg.classList.remove('fly-away-left');
            brandName.classList.remove('fly-away-right');
            nameBrand.classList.remove('fly-away-up');
        }, 600);
    }

    function restoreHomeSection() {
        if (homeHidden) {
            homeSection.classList.remove('hidden');
            homeHidden = false;
        }
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    homeLogo.addEventListener('click', (event) => {
        event.preventDefault();
        restoreHomeSection();
    });

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        restoreHomeSection();
    });

    homeButton.addEventListener('click', (event) => {
        event.preventDefault();
        startAnimation();
    });

    const addToCartButtons = document.querySelectorAll('.addCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const section = button.closest('section');
            addItemToCart(section);
        });
    });

    function addItemToCart(section) {
        const name = section.querySelector('.nameDonut').textContent.trim();
        const priceText = section.querySelector('.price').textContent.trim();
        const price = parseFloat(priceText.replace('$', '').trim());
        const imgSrc = section.querySelector('.donutImg').getAttribute('src');
    
        const existingItem = cart.find(item => item.name === name);
    
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const newItem = {
                name: name,
                price: price,
                quantity: 1,
                imgSrc: imgSrc,
                notes: 'none'
            };
            cart.push(newItem);
        }
    
        const cartIcon = document.querySelector('.dropdownCart .dropdown-toggle img');
        cartIcon.classList.add('cart-pulse');
        setTimeout(() => {
            cartIcon.classList.remove('cart-pulse');
        }, 500);
    
        const feedbackIcon = document.createElement('div');
        feedbackIcon.classList.add('feedback-icon', 'cart-pulse');
        feedbackIcon.textContent = '+1';
        cartIcon.parentNode.appendChild(feedbackIcon);
        feedbackIcon.style.display = 'block';
    
        setTimeout(() => {
            feedbackIcon.style.display = 'none';
            feedbackIcon.remove();
        }, 1600);
    
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartList = document.querySelector('.dropdownCartList');
        cartList.innerHTML = '';
    
        let subtotal = 0;
    
        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.classList.add('text-light', 'text-center');
            emptyMessage.textContent = 'Your cart is empty.';
            cartList.appendChild(emptyMessage);
            return;
        }
    
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
    
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3', 'cardCart', 'text-light');
    
            const row = document.createElement('div');
            row.classList.add('row', 'g-0');
    
            const colImg = document.createElement('div');
            colImg.classList.add('col-md-4', 'd-flex', 'align-items-center');
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.classList.add('img-fluid', 'rounded-start', 'imgCartDonut');
            img.alt = item.name;
            colImg.appendChild(img);
    
            const colInfo = document.createElement('div');
            colInfo.classList.add('col-md-6');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            const title = document.createElement('h4');
            title.classList.add('card-title');
            title.textContent = item.name;
    
            const notes = document.createElement('p');
            notes.classList.add('card-text');
            notes.textContent = `notes: ${item.notes}`;
    
            const price = document.createElement('h5');
            price.classList.add('priceCart');
            price.textContent = `$ ${item.price.toFixed(2)}`;
    
            cardBody.appendChild(title);
            cardBody.appendChild(notes);
            cardBody.appendChild(price);
            colInfo.appendChild(cardBody);
    
            const colQty = document.createElement('div');
            colQty.classList.add('col-md-2', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center');
    
            const plusButton = document.createElement('button');
            plusButton.classList.add('btn', 'btn-outline-light', 'btn-sm', 'mb-2', 'plusButton');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', (event) => {
                event.stopPropagation();
                item.quantity += 1;
                updateCartDisplay();
            });
    
            const quantity = document.createElement('h5');
            quantity.classList.add('quantity');
            quantity.textContent = item.quantity;
    
            const minusButton = document.createElement('button');
            minusButton.classList.add('btn', 'btn-outline-light', 'btn-sm', 'mt-2', 'minusButton');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', (event) => {
                event.stopPropagation();
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart = cart.filter(cartItem => cartItem !== item);
                }
                updateCartDisplay();
            });
    
            colQty.appendChild(plusButton);
            colQty.appendChild(quantity);
            colQty.appendChild(minusButton);
    
            row.appendChild(colImg);
            row.appendChild(colInfo);
            row.appendChild(colQty);
            card.appendChild(row);
    
            cartList.appendChild(card);
        });
    
        const hr1 = document.createElement('hr');
        hr1.classList.add('my-2', 'border-light');
        cartList.appendChild(hr1);
    
        const subtotalDiv = document.createElement('div');
        subtotalDiv.classList.add('d-flex', 'justify-content-between', 'text-light', 'text-shadow');
        subtotalDiv.innerHTML = `<span>Subtotal</span><span>$ ${subtotal.toFixed(2)}</span>`;
        cartList.appendChild(subtotalDiv);
    
        const shippingFee = 2.50;
        const shippingDiv = document.createElement('div');
        shippingDiv.classList.add('d-flex', 'justify-content-between', 'text-light', 'text-shadow');
        shippingDiv.innerHTML = `<span>Shipping Fee</span><span>$ ${shippingFee.toFixed(2)}</span>`;
        cartList.appendChild(shippingDiv);
    
        const hr2 = document.createElement('hr');
        hr2.classList.add('my-2', 'border-light');
        cartList.appendChild(hr2);
    
        const total = subtotal + shippingFee;
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('d-flex', 'justify-content-between', 'text-light', 'text-shadow');
        totalDiv.innerHTML = `<strong>Total</strong><strong>$ ${total.toFixed(2)}</strong>`;
        cartList.appendChild(totalDiv);
    
        const confirmButton = document.createElement('button');
        confirmButton.classList.add('btn', 'btn-outline-light', 'w-100', 'mt-2', 'text-shadow', 'confirmOrder');
        confirmButton.textContent = 'Confirm Order';
    
        confirmButton.addEventListener('click', (event) => {
            event.stopPropagation();
            alert('Order confirmed!');
            cart = [];
            updateCartDisplay();
        });
    
        cartList.appendChild(confirmButton);
    }

    updateCartDisplay();

    function updateNavbarShadow(isHomeVisible) {
        if (isHomeVisible) {
            navbar.classList.add('navbar-home-shadow', 'navbar-dark-shadow');
        } else {
            navbar.classList.remove('navbar-home-shadow', 'navbar-dark-shadow');
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                updateNavbarShadow(entry.isIntersecting);
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(homeSection);
});
