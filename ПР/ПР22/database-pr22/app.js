const express = require('express');
const database = require('./db');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors'); 

const app = express();
const PORT = 3000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Маршруты
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

// Главная страница
app.get('/', (req, res) => {
    res.json({
        message: '📚 API Библиотеки - Практическая работа №22',
        endpoints: {
            books: {
                'GET /api/books': 'Получить все книги',
                'GET /api/books/:id': 'Получить книгу по ID', 
                'POST /api/books': 'Создать книгу'
            }
        }
    });
});

// Запуск сервера
app.listen(PORT, async () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    
    try {
        await database.connect();
        console.log('✅ База данных подключена');
        database.close();
    } catch (error) {
        console.error('❌ Ошибка БД:', error.message);
    }
});