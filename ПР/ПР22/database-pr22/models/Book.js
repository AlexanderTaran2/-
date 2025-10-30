const database = require('../db');

class Book {
    static async findAll(page = 1, limit = 10) {
        try {
            await database.connect();
            const offset = (page - 1) * limit;
            
            const sql = `SELECT * FROM books LIMIT ? OFFSET ?`;
            const countSql = `SELECT COUNT(*) as total FROM books`;
            
            const [books, countResult] = await Promise.all([
                database.all(sql, [limit, offset]),
                database.get(countSql)
            ]);
            
            return {
                books,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: countResult.total,
                    pages: Math.ceil(countResult.total / limit)
                }
            };
            
        } catch (error) {
            throw new Error(`Ошибка получения книг: ${error.message}`);
        } finally {
            database.close();
        }
    }

    static async findById(id) {
        try {
            await database.connect();
            const sql = `SELECT * FROM books WHERE id = ?`;
            const book = await database.get(sql, [id]);
            return book;
            
        } catch (error) {
            throw new Error(`Ошибка поиска книги: ${error.message}`);
        } finally {
            database.close();
        }
    }

    static async create(bookData) {
        try {
            await database.connect();
            
            const { title, isbn, publication_year, price, stock_quantity, author_id, category_id, description } = bookData;
            
            const sql = `
                INSERT INTO books 
                (title, isbn, publication_year, price, stock_quantity, author_id, category_id, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const result = await database.run(sql, [
                title, isbn, publication_year, price, stock_quantity, author_id, category_id, description
            ]);
            
            return { id: result.id, ...bookData };
            
        } catch (error) {
            throw new Error(`Ошибка создания книги: ${error.message}`);
        } finally {
            database.close();
        }
    }
}

module.exports = Book;