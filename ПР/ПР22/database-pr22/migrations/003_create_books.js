const database = require('../db');

async function createBooksTable() {
    try {
        await database.connect();
        
        const sql = `
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(255) NOT NULL,
                isbn VARCHAR(20) UNIQUE,
                publication_year INTEGER,
                price DECIMAL(10, 2),
                stock_quantity INTEGER DEFAULT 0,
                author_id INTEGER,
                category_id INTEGER,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE SET NULL,
                FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
            )
        `;
        
        await database.run(sql);
        console.log('✅ Таблица books создана');
        
    } catch (error) {
        console.error('❌ Ошибка создания таблицы books:', error);
    } finally {
        database.close();
    }
}

if (require.main === module) {
    createBooksTable();
}

module.exports = createBooksTable;