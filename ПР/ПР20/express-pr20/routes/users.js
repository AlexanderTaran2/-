const express = require('express');
const router = express.Router();

// Временное хранилище данных
let users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 25 },
    { id: 2, name: 'Петр Петров', email: 'petr@example.com', age: 30 },
    { id: 3, name: 'Мария Сидорова', email: 'maria@example.com', age: 28 }
];

// Middleware для проверки ID пользователя
router.param('id', (req, res, next, id) => {
    const userId = parseInt(id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Неверный формат ID' });
    }
    req.userId = userId;
    next();
});

// GET /api/users - Получить всех пользователей
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const result = {
        users: users.slice(startIndex, endIndex),
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(users.length / limit),
            totalUsers: users.length,
            hasNext: endIndex < users.length,
            hasPrev: startIndex > 0
        }
    };
    
    res.json(result);
});

// GET /api/users/:id - Получить пользователя по ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    res.json(user);
});

// POST /api/users - Создать нового пользователя
router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    
    // Валидация
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Обязательные поля: name, email' 
        });
    }
    
    // Проверка уникальности email
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ 
            error: 'Пользователь с таким email уже существует' 
        });
    }
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        age: age || null
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id - Обновить пользователя
router.put('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const { name, email, age } = req.body;
    
    // Проверка уникальности email (исключая текущего пользователя)
    if (email && email !== users[userIndex].email) {
        const emailExists = users.some(u => u.email === email && u.id !== req.userId);
        if (emailExists) {
            return res.status(409).json({ 
                error: 'Пользователь с таким email уже существует' 
            });
        }
    }
    
    // Обновление данных
    users[userIndex] = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(age !== undefined && { age })
    };
    
    res.json(users[userIndex]);
});

// DELETE /api/users/:id - Удалить пользователя
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({ 
        message: 'Пользователь успешно удален',
        user: deletedUser 
    });
});

module.exports = router;