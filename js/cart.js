let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Display Cart Items
async function getCartItems() {
    // Simulate fetching cart items from a database or API (returns a Promise)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem('cart')) || []);
        }, 500); // Simulating a delay of 500ms
    });
}

async function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    try {
        const cartItems = await getCartItems(); // Wait for cart data to load

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
                            <input type="number" value="${item.quantity}" min="1" 
                                   data-index="${index}" class="cart-quantity">
                            <button onclick="removeItem(${index})" class="btn">Remove</button>
                        </td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });
        }

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    } catch (error) {
        console.error('Error loading cart:', error);
        cartItemsContainer.innerHTML = '<tr><td colspan="3">Failed to load cart items.</td></tr>';
    }
}

// Example of removing an item from the cart
async function removeItem(index) {
    let cartItems = await getCartItems();
    cartItems.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Save updated cart
    displayCart(); // Refresh the cart
}

// Call the displayCart function when the page loads
document.addEventListener('DOMContentLoaded', displayCart);



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
async function updateCart() {
    try {
        await new Promise((resolve) => {
            localStorage.setItem('cart', JSON.stringify(cartItems));
            resolve(); // Resolve the promise after updating localStorage
        });
        await displayCart(); // Wait for displayCart to finish execution
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

async function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    try {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

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
                            <input type="number" value="${item.quantity}" min="1" 
                                   data-index="${index}" class="cart-quantity">
                            <button onclick="removeItem(${index})" class="btn">Remove</button>
                        </td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });
        }

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    } catch (error) {
        console.error('Error displaying cart:', error);
    }
}
