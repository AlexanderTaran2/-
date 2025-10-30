const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Получить все книги
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await Book.findAll(page, limit);
        
        res.json({
            success: true,
            data: result.books,
            pagination: result.pagination
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/books/:id - Получить книгу по ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
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
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST /api/books - Создать книгу
router.post('/', async (req, res) => {
    try {
        const bookData = req.body;
        
        if (!bookData.title) {
            return res.status(400).json({
                success: false,
                error: 'Название книги обязательно'
            });
        }
        
        const newBook = await Book.create(bookData);
        
        res.status(201).json({
            success: true,
            data: newBook
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;