const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const productModal = document.getElementById('product-modal');
const cartModal = document.getElementById('cart-modal');
const productModalClose = document.querySelector('#product-modal .close');
const cartModalClose = document.querySelector('#cart-modal .close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');

let cart = [];
let products = [];
let cartItemIds = []; 

function toggleProductModal() {
  productModal.classList.toggle('show');
}

function toggleCartModal() {
  updateCartItemsList();
  updateCartTotal();
  cartModal.classList.toggle('show');
}

function addToCart(productId, product) {
  const cartItem = {
    name: product.name,
    price: product.price.toFixed(2),
    quantity: product.quantity
  };

  fetch(`http://localhost:8080/api/v1/cart/1/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItem)
  })
    .then(response => {
      if (response.ok) {
        console.log('Product added to cart successfully');
        response.json().then(data => {
          console.log('Cart:', data);
          const cartItems = data.products;
          cartItemIds = cartItems.map(item => item.id);
          console.log('Cart Item IDs:', cartItemIds);
          cart = cartItems;
          updateCartBadge();
          updateCartItemsList();
          updateCartTotal();
        });
      } else {
      
        console.log('Error adding product to cart:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
}


function updateCartBadge() {
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = cartItemCount;
}


function updateCartItemsList() {
  cartItemsList.innerHTML = '';

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('li');
    cartItemElement.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <input type="number" class="quantity-input" min="1" value="${item.quantity}" data-value-id="${index}">
      <button class="update-item-btn" data-update-id="${item.id}">Update</button>
      <button class="remove-item-btn" data-remove-id="${item.id}">Remove</button>
      
    `;
    cartItemsList.appendChild(cartItemElement);
  });

  const removeButtons = document.querySelectorAll('.remove-item-btn');
  removeButtons.forEach(button => {
    
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.removeId);
      removeCartItem(itemId);
    });
  });

  const updateButtons = document.querySelectorAll('.update-item-btn');
  updateButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.updateId);
      const quantityInput = button.parentNode.querySelector('.quantity-input');
      if (quantityInput) {
        const newQuantity = parseInt(quantityInput.value) || 1;
        updateCartItem(itemId, newQuantity);
      }
    });
  });
}


function updateCartItem(itemId, quantity) {
  const url = `http://localhost:8080/api/v1/cart/1/products/${itemId}`;
  const data = {
    quantity: quantity
  };

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update cart item.');
      }
    })
    .then(updatedCart => {
      console.log('Updated Cart:', updatedCart);
      const updatedItemIndex = cart.findIndex(item => item.id === itemId);
      cart[updatedItemIndex].quantity = quantity;
      cart[updatedItemIndex].price = updatedCart.products[updatedItemIndex].price.toFixed(2);


      updateCartItemsList();
      updateCartTotal();

  
      const updateMessage = document.getElementById('update-message');
      updateMessage.textContent = 'Product updated successfully';
      updateMessage.style.display = 'block';

    
      setTimeout(() => {
        updateMessage.style.display = 'none';
      }, 2000);

     
    })
    .catch(error => {
      console.error('Error:', error);
     
    });
}


function updateCartTotal() {
  const cartTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotal.textContent = `$${cartTotalAmount.toFixed(2)}`;
}

function removeCartItem(itemId) {
  const removeMessage = document.getElementById('remove-message');

  fetch(`http://localhost:8080/api/v1/cart/1/products/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        removeMessage.textContent = 'Product removed successfully';
        removeMessage.style.backgroundColor = 'red';
        removeMessage.style.display = 'block';
        setTimeout(() => {
          removeMessage.style.display = 'none';
        }, 2000);

        console.log('Product removed from cart successfully');
        cart = cart.filter(item => item.id !== itemId);
        updateCartBadge();
        updateCartItemsList();
        updateCartTotal();
      } else {
        removeMessage.textContent = 'Error removing product from cart';
        removeMessage.style.backgroundColor = 'red';
        removeMessage.style.display = 'block';
        setTimeout(() => {
          removeMessage.style.display = 'none';
        }, 2000);

        console.log('Error removing product from cart:', response.statusText);
      }
    })
    .catch(error => {
      removeMessage.textContent = 'Error removing product from cart';
      removeMessage.style.backgroundColor = 'red';
      removeMessage.style.display = 'block';
      setTimeout(() => {
        removeMessage.style.display = 'none';
      }, 2000);

      console.error('Error removing product from cart:', error);
    });
}


function openProductDetails(product) {
  const modalContent = document.querySelector('#product-modal .modal-content');
  modalContent.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.picture}" alt="${product.name}">
    <p>$${product.price.toFixed(2)}</p>
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantity" class="quantity-input" min="1" value="1">
    <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
  `;

  const addToCartButton = modalContent.querySelector('.add-to-cart-btn');
  addToCartButton.addEventListener('click', () => {
    const productId = addToCartButton.dataset.id;
    const quantityInput = modalContent.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value) || 1;
    const productToAdd = {
      name: product.name,
      price: product.price,
      quantity: quantity
    };
    addToCart(productId, productToAdd);
    toggleProductModal();
  });

  productModal.classList.add('show');
}

function showCartModal() {
  updateCartItemsList();
  updateCartTotal();
  cartModal.classList.add('show');
}

cartButton.addEventListener('click', toggleCartModal);

productModalClose.addEventListener('click', toggleProductModal);

cartModalClose.addEventListener('click', toggleCartModal);

buyButton.addEventListener('click', () => {
  console.log('Purchase button clicked');
});

fetch('http://localhost:8080/api/v1/product')
  .then(response => response.json())
  .then(data => {
    products = data.slice(0, 8);
    console.log('Fetched products:', products);
    products.forEach(product => {
      let itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <img src="${product.picture}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
      `;

      itemElement.addEventListener('click', (event) => {
        if (event.target.closest('.add-to-cart-btn')) {
          const productId = event.target.dataset.id;
          openProductDetails(product);
        }
      });

      itemsGrid.appendChild(itemElement);
    });
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });


  function emptyCart() {
    const cartId = 1; 
    fetch(`http://localhost:8080/api/v1/cart/${cartId}/products`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Cart emptied successfully');
          cart = [];
          updateCartBadge();
          updateCartItemsList();
          updateCartTotal();
        } else {
          console.log('Error emptying cart:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error emptying cart:', error);
      });
  }
  
  buyButton.addEventListener('click', () => {
    console.log('Purchase button clicked');
    toggleCartModal();
    emptyCart();
    const successfulPurchasePopup = document.createElement('div');
    successfulPurchasePopup.classList.add('popup');
    successfulPurchasePopup.textContent = 'Purchase successful!';
    document.body.appendChild(successfulPurchasePopup);
    setTimeout(() => {
      successfulPurchasePopup.remove();
    }, 2000);
  });

  document.addEventListener('DOMContentLoaded', updateCartItemsList);
  