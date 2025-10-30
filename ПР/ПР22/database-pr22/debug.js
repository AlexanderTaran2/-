const app = require('./app');
const request = require('supertest');

async function testRoutes() {
    console.log('🧪 Тестируем маршруты...');
    
    try {
        // Тестируем главную страницу
        const response1 = await request(app).get('/');
        console.log('GET /:', response1.status);
        
        // Тестируем книги
        const response2 = await request(app).get('/api/books');
        console.log('GET /api/books:', response2.status);
        
        // Тестируем авторов
        const response3 = await request(app).get('/api/authors');
        console.log('GET /api/authors:', response3.status);
        console.log('Ответ авторов:', response3.body);
        
    } catch (error) {
        console.log('❌ Ошибка теста:', error.message);
    }
}

testRoutes();