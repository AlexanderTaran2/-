const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка структуры проекта...');

// Проверяем существование файлов
const filesToCheck = [
    'app.js',
    'routes/authors.js', 
    'models/Author.js',
    'db.js'
];

filesToCheck.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, file));
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Проверяем содержимое authors.js
try {
    const authorsContent = fs.readFileSync('./routes/authors.js', 'utf8');
    console.log('✅ routes/authors.js существует');
    console.log('📄 Первые 100 символов:', authorsContent.substring(0, 100));
} catch (error) {
    console.log('❌ routes/authors.js не читается');
}

// Проверяем импорты
console.log('\n🔧 Проверка импортов...');
try {
    const Author = require('./models/Author');
    console.log('✅ models/Author.js загружается');
} catch (error) {
    console.log('❌ Ошибка загрузки Author:', error.message);
}