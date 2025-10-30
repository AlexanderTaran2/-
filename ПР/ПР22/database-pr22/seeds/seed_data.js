const database = require('../db');

async function seedDatabase() {
    try {
        await database.connect();
        console.log('🌱 Заполняем базу тестовыми данными...');
        
        // Добавляем авторов
        const authors = [
            { name: 'Айзек Азимов', bio: 'Писатель-фантаст', birth_date: '1920-01-02' },
            { name: 'Лев Толстой', bio: 'Русский писатель', birth_date: '1828-09-09' }
        ];
        
        for (const author of authors) {
            await database.run(
                'INSERT INTO authors (name, bio, birth_date) VALUES (?, ?, ?)',
                [author.name, author.bio, author.birth_date]
            );
        }
        
        // Добавляем категории
        const categories = [
            { name: 'Фантастика', description: 'Научная фантастика' },
            { name: 'Роман', description: 'Художественная литература' }
        ];
        
        for (const category of categories) {
            await database.run(
                'INSERT INTO categories (name, description) VALUES (?, ?)',
                [category.name, category.description]
            );
        }
        
        // Добавляем книги
        const books = [
            {
                title: 'Основание',
                isbn: '978-5-17-080115-5',
                publication_year: 1951,
                price: 450.00,
                stock_quantity: 10,
                author_id: 1,
                category_id: 1,
                description: 'Классика научной фантастики'
            },
            {
                title: 'Война и мир',
                isbn: '978-5-389-06234-1', 
                publication_year: 1869,
                price: 680.00,
                stock_quantity: 5,
                author_id: 2,
                category_id: 2,
                description: 'Великий русский роман'
            }
        ];
        
        for (const book of books) {
            await database.run(
                `INSERT INTO books (title, isbn, publication_year, price, stock_quantity, author_id, category_id, description) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    book.title, book.isbn, book.publication_year, book.price,
                    book.stock_quantity, book.author_id, book.category_id, book.description
                ]
            );
        }
        
        console.log('✅ Тестовые данные добавлены!');
        
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        database.close();
    }
}

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;