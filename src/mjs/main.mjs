// main.mjs

import {  initializeTelegram,sendMessage } from "./telegramModule.mjs";
import {  cartTotal, cartItems, loadCartFromStorage  } from './cart.mjs';
const telegram = initializeTelegram();
// Логика добавления товара в корзину
// Пример данных для отправки на сервер
const cartData = {
  totalItems: cartItems.length,
  cartTotal: cartTotal
};

fetch('http://localhost:3050/send-message', {
  method: 'POST', // Важно использовать POST-запрос
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(cartData),
})
  .then(response => response.json())
  .then(data => {
    // Обработка ответа от сервера
    console.log('Server response:', data);

    if (data.status === 'success') {
      // Успешная обработка заказа, добавьте необходимую логику
    } else {
      // Ошибка при обработке заказа, добавьте необходимую логику
    }
  })
  .catch(error => {
    console.error('Error sending data to server:', error);
    // Обработка ошибок при отправке данных на сервер
  });

// Пример функции для расчета общей стоимости корзины

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const phone = formData.get('phone');

    // Здесь мы используем cartTotal, чтобы передать общую стоимость в функцию sendMessage
    const response = await sendMessage(name, surname, email, phone, cartTotal); // Передаем общую стоимость в функцию sendMessage

    if (response) {
      console.log('Дополнительная логика при успешной отправке в Telegram');
    }

    const orderSuccessDiv = document.getElementById('order-success');
    orderSuccessDiv.style.display = 'block';
  });
});
// async function submitOrder() {
//   console.log('Submit order clicked!');
//   const nameInput = document.querySelector('input[name="name"]');
//   const surnameInput = document.querySelector('input[name="surname"]');
//   const emailInput = document.querySelector('input[name="email"]');
//   const phoneInput = document.querySelector('input[name="phone"]');

//   if (nameInput && surnameInput && emailInput && phoneInput) {
//     const name = nameInput.value;
//     const surname = surnameInput.value;
//     const email = emailInput.value;
//     const phone = phoneInput.value;

//     // Получите детали заказа (ваша логика получения деталей заказа)
//     const orderDetails = "Детали заказа: ..."; // Замените эту строку вашей логикой получения деталей заказа

//     // Отправьте данные в телеграм
//     await telegram.sendMessageToTelegram(
//       name, surname, email, phone, orderDetails
//     );

    

//     // Покажите блок с сообщением об успешном оформлении заказа
//     const orderSuccessMessage = document.getElementById('order-success');
    
      
//     if (orderSuccessMessage) {
//       orderSuccessMessage.style.display = 'block';
//     }
//   }
// }

