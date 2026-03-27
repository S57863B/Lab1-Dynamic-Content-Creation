const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = Math.max(0, totalPrice).toFixed(2);
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector('.qty-input').value);
    updateTotalPrice(-price * quantity);
    item.remove();
}

function addProduct() {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);

    if (!name) {
        alert('Please enter a product name.');
        return;
    }
    if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price.');
        return;
    }

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.price = price;
    li.innerHTML = `
      <span>${name}</span>
      <span>$${price.toFixed(2)}</span>
      <input type="number" class="qty-input" value="1" min="1" style ="width: 50px; margin: 10px;">
      <button class="remove-button">Remove</button>
    `;
    li.querySelector('.remove-button').addEventListener('click', removeItem);

    const qtyInput = li.querySelector('.qty-input');
    qtyInput.dataset.oldValue = 1;
    qtyInput.addEventListener('change', updateQuantity);
    
    cart.appendChild(li);
    updateTotalPrice(price);

    productNameInput.value = '';
    productPriceInput.value = '';
}

function updateQuantity(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    const newQuantity = parseInt(event.target.value);
    const oldQuantity = parseInt(event.target.dataset.oldValue || 1);

    if (isNaN(newQuantity) || newQuantity < 1) {
        event.target.value = oldQuantity;
        return;
    }

    const diff = newQuantity - oldQuantity;
    updateTotalPrice(price * diff);

    event.target.dataset.oldValue = newQuantity;
}

addProductButton.addEventListener('click', addProduct);