document.addEventListener('DOMContentLoaded', () => {
    let items = {};

    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            localStorage.setItem('items', JSON.stringify(items));  

            const cartItems = document.getElementById('cart-items');
            const totalPriceElement = document.getElementById('total-price');

            function updateCart() {
                let totalPrice = 0;
                let hasItems = false;
                cartItems.innerHTML = '';
                Object.keys(items).forEach(item => {
                    try {
                        const quantity = parseFloat(document.getElementById(item).value);
                        if (quantity > 0) {
                            hasItems = true;
                            const price = items[item] * quantity;
                            totalPrice += price;
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<td>${item}</td><td>${quantity}</td><td>$${price.toFixed(2)}</td>`;
                            cartItems.appendChild(tr);
                        }
                    } catch (e) {
                        console.error(`Error updating cart for item ${item}:`, e);
                        alert(`Unable to update cart for item ${item}.`);
                    }
                });
                totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
                return hasItems;
            }

            function saveFavourites() {
                const favourites = {};
                Object.keys(items).forEach(item => {
                    const quantity = parseFloat(document.getElementById(item).value);
                    if (quantity > 0) {
                        favourites[item] = quantity;
                    }
                });
                localStorage.setItem('Favourites', JSON.stringify(favourites));
                alert('Added to favorites.');
            }

            function applyFavourites() {
                const favourites = JSON.parse(localStorage.getItem('Favourites'));               
                if (favourites) {
                    Object.keys(favourites).forEach(item => {
                        try {
                            document.getElementById(item).value = favourites[item];
                        } catch (e) {
                            console.error(`Error applying favourite for item ${item}:`, e);
                            alert(`Unable to apply favourite for item ${item}.`);
                        }
                    });
                    updateCart();
                }
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
                const hasItems = updateCart();
                if (!hasItems) {
                    alert('No items selected. Please add items to the cart before updating.');
                }                
            });

            addToFavBtn.addEventListener('click', event => {
                event.preventDefault();
                const hasItems = updateCart();
                if (!hasItems) {
                    alert('Your cart is empty. Please add items to the cart before adding to favorites.');
                } else {
                    saveFavourites();
                }
            });

            applyFavBtn.addEventListener('click', event => {
                event.preventDefault();
                const favourites = JSON.parse(localStorage.getItem('Favourites'));
            
                if (!favourites || Object.keys(favourites).length === 0) {
                    alert('No favorites has been added.');
                } else {
                    applyFavourites();
                }
            });
            

            buyNowBtn.addEventListener('click', event => {
                event.preventDefault();
                const hasItems = updateCart();
                if (!hasItems) {
                    alert('Your cart is empty. Please add items to the cart before proceeding to checkout.');
                } else {
                    saveOrder();
                    window.location.href = 'Checkout.html';
                }
            });

            resetBtn.addEventListener('click', event => {
                event.preventDefault();
                resetCart();

            });
        })
        .catch(error => {
            console.error('Error loading items:', error);
            alert('Unable to load items.');
        });
});
