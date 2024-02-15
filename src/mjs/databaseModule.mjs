// databaseModule.mjs
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbName = join(__dirname, 'users.db');

// Подключение к базе данных SQLite
export const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});
export function createOrdersTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            customer_name TEXT,
            email TEXT,
            total_price REAL
        )`, (err) => {
        if (err) {
            console.error('Ошибка создания таблицы заказов:', err.message);
        } else {
            console.log('Таблица заказов создана.');
        }
    });
}
// Функция для создания таблицы orders


// Функция для вставки нового заказа в базу данных
export function insertOrder(customer_name, email, total_price, callback) {
    db.run('INSERT INTO orders (customer_name, email, total_price) VALUES (?, ?, ?)',
        [customer_name, email, total_price],
        function (err) {
            if (err) {
                return callback('Error adding order to the database', null);
            }

            callback(null, this.lastID); // передаем ID добавленной записи
        }
    );
}

// Функция для получения списка заказов
export function getAllOrders(callback) {
    db.all('SELECT * FROM orders', (err, rows) => {
        if (err) {
            console.error('Error querying the database:', err.message);
            return callback('Error querying the database', null);
        }
        callback(null, rows);
    });
}
