const createAuthorsTable = require('./migrations/001_create_authors');
const createCategoriesTable = require('./migrations/002_create_categories');
const createBooksTable = require('./migrations/003_create_books');

async function runMigrations() {
    console.log('🔄 Запуск миграций...');
    
    try {
        await createAuthorsTable();
        await createCategoriesTable();
        await createBooksTable();
        
        console.log('✅ Все миграции успешно выполнены!');
    } catch (error) {
        console.error('❌ Ошибка выполнения миграций:', error);
        process.exit(1);
    }
}

// Запуск миграций
if (require.main === module) {
    runMigrations();
}

module.exports = runMigrations;