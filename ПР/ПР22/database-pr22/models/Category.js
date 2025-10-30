const database = require('../db');

class Category {
    // Получить все категории
    static async findAll() {
        try {
            await database.connect();
            
            const sql = `SELECT * FROM categories ORDER BY name`;
            const categories = await database.all(sql);
            
            return categories;
            
        } catch (error) {
            throw new Error(`Ошибка получения категорий: ${error.message}`);
        } finally {
            database.close();
        }
    }

    // Найти категорию по ID
    static async findById(id) {
        try {
            await database.connect();
            
            const sql = `SELECT * FROM categories WHERE id = ?`;
            const category = await database.get(sql, [id]);
            
            return category;
            
        } catch (error) {
            throw new Error(`Ошибка поиска категории: ${error.message}`);
        } finally {
            database.close();
        }
    }

    // Создать новую категорию
    static async create(categoryData) {
        try {
            await database.connect();
            
            const { name, description } = categoryData;
            
            const sql = `
                INSERT INTO categories (name, description) 
                VALUES (?, ?)
            `;
            
            const result = await database.run(sql, [name, description]);
            
            return { id: result.id, ...categoryData };
            
        } catch (error) {
            throw new Error(`Ошибка создания категории: ${error.message}`);
        } finally {
            database.close();
        }
    }
}

module.exports = Category;