const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware для CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Основные маршруты
app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в Express.js приложение!',
        version: '1.0.0',
        endpoints: {
            '/api/users': 'Работа с пользователями',
            '/api/products': 'Работа с товарами',
            '/api/docs': 'Документация API'
        }
    });
});

app.get('/api/docs', (req, res) => {
    res.json({
        documentation: 'API Documentation',
        users: {
            'GET /api/users': 'Получить всех пользователей',
            'GET /api/users/:id': 'Получить пользователя по ID',
            'POST /api/users': 'Создать пользователя',
            'PUT /api/users/:id': 'Обновить пользователя',
            'DELETE /api/users/:id': 'Удалить пользователя'
        },
        products: {
            'GET /api/products': 'Получить все товары',
            'GET /api/products/:id': 'Получить товар по ID',
            'POST /api/products': 'Создать товар',
            'PUT /api/products/:id': 'Обновить товар',
            'DELETE /api/products/:id': 'Удалить товар',
            'GET /api/products/category/:category': 'Получить товары по категории'
        }
    });
});

// Подключение модульных роутеров
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Middleware для обработки 404 ошибок
app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.url,
        method: req.method
    });
});

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка:', err);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: err.message
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Express сервер запущен на порту ${PORT}`);
    console.log(`📊 Документация: http://localhost:${PORT}/api/docs`);
    console.log(`👥 Пользователи: http://localhost:${PORT}/api/users`);
    console.log(`🛍️ Товары: http://localhost:${PORT}/api/products`);
});