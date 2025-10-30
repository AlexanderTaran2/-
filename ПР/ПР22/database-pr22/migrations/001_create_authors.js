const database = require('../db');

async function createAuthorsTable() {
    try {
        await database.connect();
        
        const sql = `
            CREATE TABLE IF NOT EXISTS authors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                bio TEXT,
                birth_date DATE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        await database.run(sql);
        console.log('✅ Таблица authors создана');
        
    } catch (error) {
        console.error('❌ Ошибка создания таблицы authors:', error);
    } finally {
        database.close();
    }
}

if (require.main === module) {
    createAuthorsTable();
}

module.exports = createAuthorsTable;