const database = require('../db');

async function createCategoriesTable() {
    try {
        await database.connect();
        
        const sql = `
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(50) NOT NULL UNIQUE,
                description TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        await database.run(sql);
        console.log('✅ Таблица categories создана');
        
    } catch (error) {
        console.error('❌ Ошибка создания таблицы categories:', error);
    } finally {
        database.close();
    }
}

if (require.main === module) {
    createCategoriesTable();
}

module.exports = createCategoriesTable;