// // dom.mjs
// import { sendMessage,initializeTelegram } from "./telegramModule.mjs";

// // Добавление обработчика события для кнопки оформления заказа
// document.addEventListener('DOMContentLoaded', () => {
//   const checkoutButton = document.getElementById('checkout-but');
//   const checkoutForm = document.getElementById('checkout-form');

//   if (checkoutButton) {
//     checkoutButton.addEventListener('click', (event) => {
//       // Вызов функции отправки заказа в Telegram
//       sendMessage();
//     });
//   }

//   if (checkoutForm) {
//     checkoutForm.addEventListener('submit', function (event) {
//       event.preventDefault();
//       submitOrder();
//     });
//   }
// });




// // Инициализация объекта Telegram


// // Функция отправки заказа
// async function submitOrder() {
//   const name = document.querySelector('input[name="name"]').value;
//   const surname = document.querySelector('input[name="surname"]').value;
//   const email = document.querySelector('input[name="email"]').value;
//   const phone = document.querySelector('input[name="phone"]').value;

//   // Получите детали заказа (ваша логика получения деталей заказа)
//   const orderDetails = "Детали заказа: ..."; // Замените эту строку вашей логикой получения деталей заказа

//   // Отправьте данные в телеграм
//   await telegram.sendMessageToTelegram(telegram.chatId, name, surname, email, phone, orderDetails);

//   // Ваша логика обработки успешного оформления заказа
//   // ...

//   // Покажите блок с сообщением об успешном оформлении заказа
//   document.getElementById('order-success').style.display = 'block';
// }
// // Ваш код, который обрабатывает отправку формы

