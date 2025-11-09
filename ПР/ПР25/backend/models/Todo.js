const db = require('../config/database');

class Todo {
  static async create(todoData) {
    const [todo] = await db('todos')
      .insert(todoData)
      .returning('*');
    return todo;
  }

  static async findByUserId(userId) {
    return db('todos').where({ user_id: userId }).orderBy('created_at', 'desc');
  }

  static async findById(id) {
    return db('todos').where({ id }).first();
  }

  static async update(id, todoData) {
    const [todo] = await db('todos')
      .where({ id })
      .update(todoData)
      .returning('*');
    return todo;
  }

  static async delete(id) {
    return db('todos').where({ id }).del();
  }
}

module.exports = Todo;