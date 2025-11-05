const bcrypt = require('bcryptjs');
const db = require('../config/database');

class User {
  static async create(userData) {
    const { email, password, role = 'user' } = userData;
    
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

  static async findByEmail(email) {
    return db('users').where({ email }).first();
  }

  static async checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;