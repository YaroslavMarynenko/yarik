let cart = [];
let total = 0;


function addToCart(productName, price) {
  const item = { name: productName, price: price };
  cart.push(item);
  total += price;
  console.log(total,item);
  updateCart();
  
}

function handleButtonClick(event) {
  const productName = event.target.dataset.productName;
  const priceText = event.target.previousElementSibling.innerText;
  const price = parseFloat(priceText.match(/\d+/));
  addToCart(productName, price);
  event.target.classList.add('button-click-animation');

  setTimeout(() => {
    event.target.classList.remove('button-click-animation');
  }, 500);
}

document.addEventListener('DOMContentLoaded', function () {
  const buttons = [
    document.getElementById("buton"),
    document.getElementById("buton1"),
  ];

  buttons.forEach(button => {
    if (button) {
      button.addEventListener("click", handleButtonClick);
    }
  });
});

function updateCart() {
  let cartItems = document.getElementById('cart-items');
  let cartTotalElement = document.getElementById('cart-total-display');
  let cartCount = document.getElementById('cart-count'); // Добавляем получение элемента корзины

  if (!cartItems || !cartTotalElement) {
    console.error('Cart elements not found.');
    return;
  }

  cartItems.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      let li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;
      let removeButton = document.createElement('button');
      removeButton.textContent = 'Удалить';

      if (item) {
        removeButton.addEventListener('click', function () {
          removeFromCart(index);
        });
        li.appendChild(removeButton);
        cartItems.appendChild(li);
      }
    });

    // Обновляем общее количество товаров в корзине
    cartCount.textContent = cart.length;

    // Обновляем общую стоимость корзины
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = '$' + cartTotal.toFixed(2);
  } else {
    const cartModal = document.getElementById('cart');
    if (cartModal) {
      cartModal.classList.add('hidden');
    } else {
      console.error('Cart modal element not found.');
    }if (cartTotalElement) {
      cartTotalElement.textContent = '$' + total.toFixed(2);
    } else {
      console.error('Cart total element not found.');
    }
      

    // Если корзина пуста, обнуляем общее количество товаров и стоимость
    cartCount.textContent = '0';
    cartTotalElement.textContent = '$0.00';
  }
}




function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    const product = cart[index];
    cart.splice(index, 1);
    total -= product.price;
    updateCart();

    // Обновление общей стоимости на странице
    const cartTotalElement = document.getElementById('cart-total-display');
if (cartTotalElement) {
  cartTotalElement.textContent = '$' + total.toFixed(2);
} else {
  console.error('Cart total element not found.');
}
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const cartIcon = document.getElementById('cart-img');
  const cartModal = document.getElementById('cart');
  const closeCartModalButton = document.getElementById('close-cart-modal');

  if (cartIcon) {
    cartIcon.addEventListener('click', function () {
      updateCart();
      showCartModal();
    });
  } else {
    console.error('Cart icon element not found.');
  }

  if (closeCartModalButton) {
    closeCartModalButton.addEventListener('click', hideCartModal);
  } else {
    console.error('Close cart modal button element not found.');
  }
});

function showCartModal() {
  const cartModal = document.getElementById('cart');
  if (cartModal) {
    cartModal.classList.remove('hidden');
  } else {
    console.error('Cart modal element not found.');
  }
}

function hideCartModal() {
  const cartModal = document.getElementById('cart');
  if (cartModal) {
    cartModal.classList.add('hidden');
  } else {
    console.error('Cart modal element not found.');
  }
}
// Функция для загрузки корзины из Local Storage

function loadCartFromStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

// Функция для сохранения корзины в Local Storage



export { addToCart, updateCart, removeFromCart, cart as cartItems, total as cartTotal, loadCartFromStorage  };
