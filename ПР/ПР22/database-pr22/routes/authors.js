const express = require('express');
const router = express.Router();

// Простой тестовый маршрут
router.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: 'АВТОРЫ РАБОТАЮТ!',
        data: [
            { id: 1, name: 'Айзек Азимов' },
            { id: 2, name: 'Лев Толстой' }
        ]
    });
});

module.exports = router;