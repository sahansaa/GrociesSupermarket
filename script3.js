document.addEventListener('DOMContentLoaded', () => {
    let items = {};

    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            localStorage.setItem('items', JSON.stringify(items));  // Store items in local storage

            const cartItems = document.getElementById('cart-items');
            const totalPriceElement = document.getElementById('total-price');

            function updateCart() {
                let totalPrice = 0;
                cartItems.innerHTML = '';
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        const price = items[item] * quantity;
                        totalPrice += price;
                        const tr = document.createElement('tr');
                        tr.innerHTML = `<td>${item}</td><td>${quantity}</td><td>$${price.toFixed(2)}</td>`;
                        cartItems.appendChild(tr);
                    }
                });
                totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
            }

            function saveFavourites() {
                const favourites = {};
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        favourites[item] = quantity;
                    }
                });
                localStorage.setItem('favourites', JSON.stringify(favourites));
                alert('Added to favorites.');
            }

            function applyFavourites() {
                const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
                Object.keys(favourites).forEach(item => {
                    document.getElementById(item).value = favourites[item];
                });
                updateCart();
            }

            function resetCart() {
                Object.keys(items).forEach(item => {
                    document.getElementById(item).value = 0;
                });
                updateCart();
            }

            function saveOrder() {
                const order = {};
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        order[item] = quantity;
                    }
                });
                localStorage.setItem('order', JSON.stringify(order));
            }

            let addToCartBtn = document.getElementById('add-to-cart');
            let addToFavBtn = document.getElementById('add-to-favourites');
            let applyFavBtn = document.getElementById('apply-favourites');
            let buyNowBtn = document.getElementById('buy-now');
            let resetBtn = document.getElementById('reset-cart');

            addToCartBtn.addEventListener('click', event => {
                event.preventDefault();
                updateCart();
            });

            addToFavBtn.addEventListener('click', event => {
                event.preventDefault();
                saveFavourites();
            });

            applyFavBtn.addEventListener('click', event => {
                event.preventDefault();
                applyFavourites();
            });

            buyNowBtn.addEventListener('click', event => {
                event.preventDefault();
                saveOrder();
                window.location.href = 'Checkout.html';
            });

            resetBtn.addEventListener('click', event => {
                event.preventDefault();
                resetCart();
            });
        })
        .catch(error => console.error('Error loading items:', error));
});