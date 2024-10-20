let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Display Cart Items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">Your cart is empty!</td></tr>';
    } else {
        cartItems.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-quantity">
                        <button onclick="removeItem(${index})" class="btn">Remove</button>
                    </td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });
    }
    totalPriceElement.textContent = $${total.toFixed(2)};
}

// Remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Update quantity
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('cart-quantity')) {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            cartItems[index].quantity = newQuantity;
            updateCart();
        }
    }
});

// Update cart in localStorage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

displayCart();