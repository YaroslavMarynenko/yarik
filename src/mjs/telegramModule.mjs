// telegramModule.mjs
import { cartItems, cartTotal } from './cart.mjs';

const token = '6947919396:AAHkVGncj6ldSUmo17UmhaNbr3VG0XOw8Bs';
const apiUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=`;
function initializeTelegram() {
  const botToken = '6947919396:AAHkVGncj6ldSUmo17UmhaNbr3VG0XOw8Bs';
  const chatId = '1161769768';

  return {
    botToken,
    chatId,
    sendMessageToTelegram(name, surname, email, phone, orderDetails) {
      const message = `
        **Новый заказ:**

        Имя: ${name}
        Фамилия: ${surname}
        Email: ${email}
        Телефон: ${phone}

        **Детали заказа:**
        ${orderDetails}
      `;

      const apiUrlWithMessage = `${apiUrl}${chatId}`;
      fetch(apiUrlWithMessage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    },
  };
}



const telegram = initializeTelegram(); // Создаем объект с токеном и chatId

const sendMessageToTelegram = async (chatId, message) => {
  try {
    const apiUrlWithMessage = `${apiUrl}${chatId}&text=${encodeURIComponent(message)}`;
    const response = await fetch(apiUrlWithMessage);

    console.log('Request:', { apiUrl: apiUrlWithMessage, chatId, message });
    console.log('Response:', { status: response.status, statusText: response.statusText });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Сообщение успешно отправлено (Response Data):', data);

    return data;
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error.message);
    return null;
  }
};

const sendMessage = async (name, surname, email, phone) => {
  console.log('cartItems:', cartItems);
  console.log('cartTotal:', cartTotal);
  console.log('Button clicked!');

  try {
    // Преобразуем массив объектов в строку с именами и ценами товаров
    const cartItemDetails = cartItems.map(item => `${item.name} - $${item.price}`).join('\n');
  
    const messageText = `
      Новый заказ:

      Имя: ${name}
      Фамилия: ${surname}
      Email: ${email}
      Телефон: ${phone}

      **Детали заказа:**
      ${cartItemDetails}
      
      **Общая стоимость:** $${cartTotal}
    `;

    const response = await sendMessageToTelegram(telegram.chatId, messageText);

    if (response) {
      console.log('Дополнительная логика при успешной отправке в Telegram');
    }

    return response;
  } catch (error) {
    console.error('Ошибка отправки сообщения в Telegram:', error.message);
    return null;
  }
};

export { sendMessageToTelegram, sendMessage, initializeTelegram };
