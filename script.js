const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');
 
let totalPrice = 0;
 
// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}
 
// Function to remove an item
function removeItem(event) {
  const item = event.target.closest('li');
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}

function addProduct() {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    
    if(!name){
        alert('Please enter a product name.');
        return;
    }
    if(isNaN(price) || price <= 0){
        alert('Please enter a valid price.');
        return;
    }

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.price = price;
    li.innerHTML = `
      <span>${name}</span>
      <span>$${price.toFixed(2)}</span>
      <button class="remove-button">Remove</button>
    `;
    li.querySelector('.remove-button').addEventListener('click', removeItem);
    Clipboard.appendChild(li);
    updateTotalPrice(price);

    productNameInput.value = '';
    productPriceInput.value = '';
}

addProductButton.addEventListener('click', addProduct);