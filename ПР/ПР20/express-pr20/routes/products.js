const express = require('express');
const router = express.Router();

// Временное хранилище данных
let products = [
    { id: 1, name: 'Ноутбук Dell XPS', price: 89990, category: 'electronics', inStock: true },
    { id: 2, name: 'iPhone 15 Pro', price: 99990, category: 'electronics', inStock: true },
    { id: 3, name: 'Книга "JavaScript для начинающих"', price: 1500, category: 'books', inStock: true },
    { id: 4, name: 'Футболка хлопковая', price: 1200, category: 'clothing', inStock: false },
    { id: 5, name: 'Наушники Sony WH-1000XM4', price: 24990, category: 'electronics', inStock: true }
];

// Middleware для проверки ID товара
router.param('id', (req, res, next, id) => {
    const productId = parseInt(id);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'Неверный формат ID' });
    }
    req.productId = productId;
    next();
});

// Middleware для категории
router.param('category', (req, res, next, category) => {
    req.category = category.toLowerCase();
    next();
});

// GET /api/products - Получить все товары с фильтрацией
router.get('/', (req, res) => {
    let filteredProducts = [...products];
    const { category, inStock, minPrice, maxPrice, search } = req.query;
    
    // Фильтрация по категории
    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    // Фильтрация по наличию
    if (inStock !== undefined) {
        const inStockBool = inStock === 'true';
        filteredProducts = filteredProducts.filter(p => p.inStock === inStockBool);
    }
    
    // Фильтрация по цене
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Поиск по названию
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Пагинация
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const result = {
        products: filteredProducts.slice(startIndex, endIndex),
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredProducts.length / limit),
            totalProducts: filteredProducts.length,
            hasNext: endIndex < filteredProducts.length,
            hasPrev: startIndex > 0
        },
        filters: {
            category,
            inStock,
            minPrice,
            maxPrice,
            search
        }
    };
    
    res.json(result);
});

// GET /api/products/:id - Получить товар по ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.productId);
    
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(product);
});

// GET /api/products/category/:category - Получить товары по категории
router.get('/category/:category', (req, res) => {
    const categoryProducts = products.filter(p => 
        p.category.toLowerCase() === req.category
    );
    
    res.json({
        category: req.category,
        products: categoryProducts,
        count: categoryProducts.length
    });
});

// POST /api/products - Создать новый товар
router.post('/', (req, res) => {
    const { name, price, category, inStock = true } = req.body;
    
    // Валидация
    if (!name || !price || !category) {
        return res.status(400).json({ 
            error: 'Обязательные поля: name, price, category' 
        });
    }
    
    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({ 
            error: 'Цена должна быть положительным числом' 
        });
    }
    
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
        category,
        inStock: Boolean(inStock)
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT /api/products/:id - Обновить товар
router.put('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.productId);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const { name, price, category, inStock } = req.body;
    
    // Валидация цены
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
        return res.status(400).json({ 
            error: 'Цена должна быть положительным числом' 
        });
    }
    
    // Обновление данных
    products[productIndex] = {
        ...products[productIndex],
        ...(name && { name }),
        ...(price !== undefined && { price }),
        ...(category && { category }),
        ...(inStock !== undefined && { inStock: Boolean(inStock) })
    };
    
    res.json(products[productIndex]);
});

// DELETE /api/products/:id - Удалить товар
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.productId);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json({ 
        message: 'Товар успешно удален',
        product: deletedProduct 
    });
});

module.exports = router;