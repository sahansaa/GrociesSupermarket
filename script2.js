let finalBtn = document.getElementById("final_button");

finalBtn.addEventListener('click', (event) => {
    let form = document.getElementById('orderForm');
    if (!form.checkValidity()) {
        event.preventDefault();
        alert('Please fill out all required fields before placing your order.');
    } else {
        alert(`Thank you for your purchase! Your order will be delivered by ${new Date().toLocaleDateString()}.`);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const orderTableBody = document.getElementById('order-items');
    const totalPriceElement = document.getElementById('total-price');
    const items = JSON.parse(localStorage.getItem('items'));
    const order = JSON.parse(localStorage.getItem('order'));

    if (order && items) {
        let totalPrice = 0;
        Object.keys(order).forEach(item => {
            const quantity = order[item];
            const price = items[item] * quantity;
            totalPrice += price;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${item}</td><td>${quantity}</td><td>$${price.toFixed(2)}</td>`;
            orderTableBody.appendChild(tr);
        });
        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    } else {
        console.error('Error retrieving order or items from local storage.');
    }
});