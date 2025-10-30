const database = require('../db');

class Author {
    static async findAll(page = 1, limit = 10) {
        try {
            await database.connect();
            const offset = (page - 1) * limit;
            
            const sql = `SELECT * FROM authors LIMIT ? OFFSET ?`;
            const countSql = `SELECT COUNT(*) as total FROM authors`;
            
            const [authors, countResult] = await Promise.all([
                database.all(sql, [limit, offset]),
                database.get(countSql)
            ]);
            
            return {
                authors,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: countResult.total,
                    pages: Math.ceil(countResult.total / limit)
                }
            };
            
        } catch (error) {
            throw new Error(`Ошибка получения авторов: ${error.message}`);
        } finally {
            database.close();
        }
    }

    static async create(authorData) {
        try {
            await database.connect();
            
            const { name, bio, birth_date } = authorData;
            
            const sql = `INSERT INTO authors (name, bio, birth_date) VALUES (?, ?, ?)`;
            const result = await database.run(sql, [name, bio, birth_date]);
            
            return { id: result.id, ...authorData };
            
        } catch (error) {
            throw new Error(`Ошибка создания автора: ${error.message}`);
        } finally {
            database.close();
        }
    }
}

module.exports = Author;