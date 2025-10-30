const createAuthorsTable = require('./migrations/001_create_authors');
const createCategoriesTable = require('./migrations/002_create_categories');
const createBooksTable = require('./migrations/003_create_books');

async function runMigrations() {
    console.log('🔄 Запуск миграций...');
    
    try {
        await createAuthorsTable();
        await createCategoriesTable();
        await createBooksTable();
        
        console.log('✅ Все миграции выполнены!');
    } catch (error) {
        console.error('❌ Ошибка миграций:', error);
    }
}

if (require.main === module) {
    runMigrations();
}

module.exports = runMigrations;