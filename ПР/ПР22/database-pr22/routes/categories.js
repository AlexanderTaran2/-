const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - Получить все категории
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        
        res.json({
            success: true,
            data: categories
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/categories/:id - Получить категорию по ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Категория не найдена'
            });
        }
        
        res.json({
            success: true,
            data: category
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST /api/categories - Создать новую категорию
router.post('/', async (req, res) => {
    try {
        const categoryData = req.body;
        
        if (!categoryData.name) {
            return res.status(400).json({
                success: false,
                error: 'Название категории обязательно'
            });
        }
        
        const newCategory = await Category.create(categoryData);
        
        res.status(201).json({
            success: true,
            data: newCategory
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;