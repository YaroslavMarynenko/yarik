// server.mjs
import express from 'express';
import cors from 'cors';
import http from 'http';
import { getAllOrders, db } from './databaseModule.mjs';
const app = express();
const port = process.env.PORT || 3050;
const server = http.createServer(app); // Используем http.createServer
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.post('/send-message', (req, res) => {
  const requestData = req.body;

  if (!requestData) {
    return res.status(400).json({ status: 'error', message: 'Invalid request data' });
  }

  // Далее ваш код обработки заказа
  // ...

  const response = { status: 'success', message: 'Order processed successfully' };
  res.json(response);
});



// Обработчик GET-запроса
app.get('/send-message', (req, res) => {
  // Установка куки здесь
  res.cookie('myCookie', 'myValue', { secure: true, sameSite: 'None' });

  getAllOrders((error, orders) => {
    if (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ success: false, message: 'Error getting orders from the database' });
    } else {
      // Возвращаем список заказов в виде JSON
      res.json({ success: true, orders: orders });
    }
  });
});


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
