1. How did you dynamically create and append new elements to the DOM?
I used `document.createElement('li')` to create the item container,
used template literals (`innerHTML`) to quickly inject the product data and buttons,
and attached it to the list using `cart.appendChild(li)`.

2. What steps did you take to ensure accurate updates to the total price?
I routed all price changes through a single `updateTotalPrice()` function.
It uses `Math.max(0, totalPrice)` to prevent negative balances and `.toFixed(2)` to
format the final string and avoid JavaScript floating-point math errors.

3. How did you handle invalid input for product name or price?
I used `.trim()` to prevent blank space entries. An `if` statement checks for empty names,
`NaN` values, or prices at or below zero. If caught, it triggers an `alert()` and uses `return`
to immediately stop the item from being added.

4. What challenges did you face when implementing the remove functionality?
The main challenge was ensuring the total updated correctly if the user had increased the item's quantity.
I solved this by using `event.target.closest('li')` to target the specific row, reading its exact quantity input,
and subtracting the combined amount (price × quantity) before calling `item.remove()`.