const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const router = express.Router();

// Доступно только аутентифицированным пользователям
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Доступ к профилю разрешен',
    user: req.user
  });
});

// Доступно только пользователям с ролью 'user'
router.get('/user-dashboard', authenticateToken, checkRole(['user', 'admin']), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель пользователя!',
    user: req.user
  });
});

// Доступно только администраторам
router.get('/admin', authenticateToken, checkRole(['admin']), (req, res) => {
  res.json({
    message: 'Добро пожаловать в админ-панель!',
    user: req.user,
    secretData: 'Это очень секретные данные только для админов'
  });
});

// Получить всех пользователей (только для админов)
router.get('/users', authenticateToken, checkRole(['admin']), async (req, res) => {
  try {
    const db = require('../config/database');
    const users = await db('users').select('id', 'email', 'role', 'created_at');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;