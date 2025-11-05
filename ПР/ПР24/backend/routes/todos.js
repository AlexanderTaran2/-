const express = require('express');
const Todo = require('../models/Todo');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Получить все задачи пользователя
router.get('/', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.findByUserId(req.user.id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Создать новую задачу
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Название задачи обязательно' });
    }

    const todo = await Todo.create({
      title,
      description,
      completed,
      user_id: req.user.id
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Обновить задачу
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (todo.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Нет доступа к этой задаче' });
    }

    const updatedTodo = await Todo.update(id, {
      title,
      description, 
      completed,
      updated_at: new Date()
    });

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить задачу
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (todo.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Нет доступа к этой задаче' });
    }

    await Todo.delete(id);
    res.json({ message: 'Задача удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;