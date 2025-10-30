const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// База данных в памяти
let books = [
    {
        id: 1,
        title: "Война и мир",
        author: "Лев Толстой",
        genre: "Роман",
        year: 1869,
        isbn: "978-5-389-07435-4",
        pages: 1225,
        available: true
    },
    {
        id: 2,
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        genre: "Роман",
        year: 1866,
        isbn: "978-5-699-12014-7",
        pages: 608,
        available: true
    },
    {
        id: 3,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        genre: "Фантастика",
        year: 1967,
        isbn: "978-5-17-090635-9",
        pages: 480,
        available: false
    }
];

let nextId = 4;

// Валидация данных книги
const validateBook = (book, isUpdate = false) => {
    const errors = [];
    
    if (!isUpdate || book.title !== undefined) {
        if (!book.title || book.title.trim().length < 1) {
            errors.push('Название книги обязательно');
        }
    }
    
    if (!isUpdate || book.author !== undefined) {
        if (!book.author || book.author.trim().length < 1) {
            errors.push('Автор книги обязателен');
        }
    }
    
    if (book.year !== undefined && (book.year < 1000 || book.year > new Date().getFullYear())) {
        errors.push('Год издания должен быть корректным');
    }
    
    if (book.pages !== undefined && book.pages < 1) {
        errors.push('Количество страниц должно быть положительным числом');
    }
    
    if (book.isbn !== undefined && !/^(?:\d{10}|\d{13}|(?:\d{3}-)?\d{10}|(?:\d{3}-)?\d{13})$/.test(book.isbn)) {
        errors.push('ISBN должен быть в формате 10 или 13 цифр');
    }
    
    return errors;
};

// Поиск книги по ID
const findBookById = (id) => {
    const bookId = parseInt(id);
    if (isNaN(bookId)) {
        return null;
    }
    return books.find(book => book.id === bookId);
};

// ========== GET ENDPOINTS ==========

// GET /api/books - Получить все книги с фильтрацией и пагинацией
app.get('/api/books', (req, res) => {
    try {
        const { author, genre, year, available, page = 1, limit = 10 } = req.query;
        
        let filteredBooks = [...books];
        
        // Фильтрация по автору
        if (author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        
        // Фильтрация по жанру
        if (genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        // Фильтрация по году
        if (year) {
            filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
        }
        
        // Фильтрация по доступности
        if (available !== undefined) {
            const isAvailable = available === 'true';
            filteredBooks = filteredBooks.filter(book => book.available === isAvailable);
        }
        
        // Пагинация
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = pageNum * limitNum;
        
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            data: paginatedBooks,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(filteredBooks.length / limitNum),
                totalBooks: filteredBooks.length,
                booksOnPage: paginatedBooks.length,
                hasNext: endIndex < filteredBooks.length,
                hasPrev: startIndex > 0
            },
            filters: {
                author: author || null,
                genre: genre || null,
                year: year ? parseInt(year) : null,
                available: available !== undefined ? available === 'true' : null
            }
        });
        
    } catch (error) {
        console.error('Error in GET /api/books:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// GET /api/books/:id - Получить книгу по ID
app.get('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Книга не найдена'
            });
        }
        
        res.json({
            success: true,
            data: book
        });
        
    } catch (error) {
        console.error('Error in GET /api/books/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// ========== POST ENDPOINT ==========

// POST /api/books - Создать новую книгу
app.post('/api/books', (req, res) => {
    try {
        const { title, author, genre, year, isbn, pages, available = true } = req.body;
        
        // Валидация обязательных полей
        const validationErrors = validateBook({ title, author, year, pages, isbn });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибка валидации',
                details: validationErrors
            });
        }
        
        // Проверка уникальности ISBN
        if (isbn) {
            const existingBook = books.find(book => book.isbn === isbn);
            if (existingBook) {
                return res.status(409).json({
                    success: false,
                    error: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Создание новой книги
        const newBook = {
            id: nextId++,
            title: title.trim(),
            author: author.trim(),
            genre: genre ? genre.trim() : null,
            year: year ? parseInt(year) : null,
            isbn: isbn || null,
            pages: pages ? parseInt(pages) : null,
            available: Boolean(available),
            createdAt: new Date().toISOString()
        };
        
        books.push(newBook);
        
        res.status(201).json({
            success: true,
            message: 'Книга успешно создана',
            data: newBook
        });
        
    } catch (error) {
        console.error('Error in POST /api/books:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// ========== PUT ENDPOINT ==========

// PUT /api/books/:id - Полное обновление книги
app.put('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Книга не найдена'
            });
        }
        
        const { title, author, genre, year, isbn, pages, available } = req.body;
        
        // Валидация всех полей (полное обновление)
        const validationErrors = validateBook({ title, author, year, pages, isbn });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибка валидации',
                details: validationErrors
            });
        }
        
        // Проверка уникальности ISBN (исключая текущую книгу)
        if (isbn && isbn !== book.isbn) {
            const existingBook = books.find(b => b.isbn === isbn && b.id !== book.id);
            if (existingBook) {
                return res.status(409).json({
                    success: false,
                    error: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Полное обновление
        Object.assign(book, {
            title: title.trim(),
            author: author.trim(),
            genre: genre ? genre.trim() : null,
            year: year ? parseInt(year) : null,
            isbn: isbn || null,
            pages: pages ? parseInt(pages) : null,
            available: Boolean(available),
            updatedAt: new Date().toISOString()
        });
        
        res.json({
            success: true,
            message: 'Книга полностью обновлена',
            data: book
        });
        
    } catch (error) {
        console.error('Error in PUT /api/books/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// ========== PATCH ENDPOINT ==========

// PATCH /api/books/:id - Частичное обновление книги
app.patch('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Книга не найдена'
            });
        }
        
        // Валидация только переданных полей
        const validationErrors = validateBook(req.body, true);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ошибка валидации',
                details: validationErrors
            });
        }
        
        // Проверка уникальности ISBN (если передан)
        if (req.body.isbn && req.body.isbn !== book.isbn) {
            const existingBook = books.find(b => b.isbn === req.body.isbn && b.id !== book.id);
            if (existingBook) {
                return res.status(409).json({
                    success: false,
                    error: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Частичное обновление
        const updates = { ...req.body };
        
        // Обработка специальных полей
        if (updates.title !== undefined) updates.title = updates.title.trim();
        if (updates.author !== undefined) updates.author = updates.author.trim();
        if (updates.genre !== undefined) updates.genre = updates.genre ? updates.genre.trim() : null;
        if (updates.year !== undefined) updates.year = updates.year ? parseInt(updates.year) : null;
        if (updates.pages !== undefined) updates.pages = updates.pages ? parseInt(updates.pages) : null;
        if (updates.available !== undefined) updates.available = Boolean(updates.available);
        
        updates.updatedAt = new Date().toISOString();
        
        Object.assign(book, updates);
        
        res.json({
            success: true,
            message: 'Книга частично обновлена',
            data: book
        });
        
    } catch (error) {
        console.error('Error in PATCH /api/books/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// ========== DELETE ENDPOINT ==========

// DELETE /api/books/:id - Удалить книгу
app.delete('/api/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Книга не найдена'
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'Книга успешно удалена',
            data: deletedBook
        });
        
    } catch (error) {
        console.error('Error in DELETE /api/books/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// ========== ДОПОЛНИТЕЛЬНЫЕ ENDPOINTS ==========

// GET /api/stats - Статистика по библиотеке
app.get('/api/stats', (req, res) => {
    try {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.available).length;
        const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
        
        const statsByGenre = genres.reduce((acc, genre) => {
            acc[genre] = books.filter(book => book.genre === genre).length;
            return acc;
        }, {});
        
        res.json({
            success: true,
            data: {
                totalBooks,
                availableBooks,
                unavailableBooks: totalBooks - availableBooks,
                genres: genres.length,
                statsByGenre
            }
        });
        
    } catch (error) {
        console.error('Error in GET /api/stats:', error);
        res.status(500).json({
            success: false,
            error: 'Внутренняя ошибка сервера'
        });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`📚 REST API сервер запущен на порту ${PORT}`);
    console.log(`🔍 Доступные endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/books`);
    console.log(`   GET  http://localhost:${PORT}/api/books/:id`);
    console.log(`   POST http://localhost:${PORT}/api/books`);
    console.log(`   PUT  http://localhost:${PORT}/api/books/:id`);
    console.log(`   PATCH http://localhost:${PORT}/api/books/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/books/:id`);
    console.log(`   GET  http://localhost:${PORT}/api/stats`);
});