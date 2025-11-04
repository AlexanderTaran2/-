const bcrypt = require('bcryptjs');
const db = require('../config/database');

class User {
  // Создание пользователя
  static async create(userData) {
    const { email, password, role = 'user' } = userData;
    
    // Хеширование пароля
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const [user] = await db('users')
      .insert({
        email,
        password_hash,
        role,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning(['id', 'email', 'role', 'created_at', 'updated_at']);
    
    return user;
  }

  // Поиск по email
  static async findByEmail(email) {
    return db('users').where({ email }).first();
  }

  // Проверка пароля
  static async checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Обновление данных
  static async update(id, userData) {
    userData.updated_at = new Date();
    const [user] = await db('users')
      .where({ id })
      .update(userData)
      .returning(['id', 'email', 'role', 'created_at', 'updated_at']);
    
    return user;
  }
}

module.exports = User;