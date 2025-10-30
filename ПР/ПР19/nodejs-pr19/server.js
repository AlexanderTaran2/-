const http = require('http');
const url = require('url');
const querystring = require('querystring');

let users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
    { id: 2, name: 'Петр Петров', email: 'petr@example.com' },
    { id: 3, name: 'Мария Сидорова', email: 'maria@example.com' }
];

let products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Смартфон', price: 30000, category: 'electronics' },
    { id: 3, name: 'Книга', price: 500, category: 'books' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    console.log(`${new Date().toISOString()} - ${method} ${pathname}`);

    if (pathname === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Добро пожаловать на сервер Node.js!',
            endpoints: {
                '/api/users': 'GET, POST - работа с пользователями',
                '/api/users/:id': 'GET, PUT, DELETE - работа с конкретным пользователем',
                '/api/products': 'GET, POST - работа с товарами',
                '/api/products/:id': 'GET, PUT, DELETE - работа с конкретным товаром',
                '/api/search': 'GET - поиск товаров по параметрам'
            }
        }));
    }
    else if (pathname === '/api/users' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(users));
    }
    else if (pathname === '/api/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
                newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
                users.push(newUser);
                res.writeHead(201);
                res.end(JSON.stringify(newUser));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }
    else if (pathname.startsWith('/api/users/') && method === 'GET') {
        const userId = parseInt(pathname.split('/')[3]);
        const user = users.find(u => u.id === userId);
        
        if (user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        }
    }
    else if (pathname.startsWith('/api/users/') && method === 'PUT') {
        const userId = parseInt(pathname.split('/')[3]);
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const updatedData = JSON.parse(body);
                const userIndex = users.findIndex(u => u.id === userId);
                
                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], ...updatedData };
                    res.writeHead(200);
                    res.end(JSON.stringify(users[userIndex]));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Пользователь не найден' }));
                }
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }
    else if (pathname.startsWith('/api/users/') && method === 'DELETE') {
        const userId = parseInt(pathname.split('/')[3]);
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1)[0];
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Пользователь удален', user: deletedUser }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        }
    }
    else if (pathname === '/api/products' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(products));
    }
    else if (pathname === '/api/products' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newProduct = JSON.parse(body);
                newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push(newProduct);
                res.writeHead(201);
                res.end(JSON.stringify(newProduct));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }
    else if (pathname.startsWith('/api/products/') && method === 'GET') {
        const productId = parseInt(pathname.split('/')[3]);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.writeHead(200);
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Товар не найден' }));
        }
    }
    else if (pathname.startsWith('/api/products/') && method === 'PUT') {
        const productId = parseInt(pathname.split('/')[3]);
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const updatedData = JSON.parse(body);
                const productIndex = products.findIndex(p => p.id === productId);
                
                if (productIndex !== -1) {
                    products[productIndex] = { ...products[productIndex], ...updatedData };
                    res.writeHead(200);
                    res.end(JSON.stringify(products[productIndex]));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Товар не найден' }));
                }
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    }
    else if (pathname.startsWith('/api/products/') && method === 'DELETE') {
        const productId = parseInt(pathname.split('/')[3]);
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex !== -1) {
            const deletedProduct = products.splice(productIndex, 1)[0];
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Товар удален', product: deletedProduct }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Товар не найден' }));
        }
    }
    else if (pathname === '/api/search' && method === 'GET') {
        const query = parsedUrl.query;
        let filteredProducts = products;
        
        if (query.category) {
            filteredProducts = filteredProducts.filter(p => 
                p.category.toLowerCase().includes(query.category.toLowerCase())
            );
        }
        
        if (query.maxPrice) {
            filteredProducts = filteredProducts.filter(p => 
                p.price <= parseFloat(query.maxPrice)
            );
        }
        
        if (query.name) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(query.name.toLowerCase())
            );
        }
        
        res.writeHead(200);
        res.end(JSON.stringify(filteredProducts));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Маршрут не найден' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
    console.log(`📊 Доступные endpoints:`);
    console.log(`   http://localhost:${PORT}/`);
    console.log(`   http://localhost:${PORT}/api/users`);
    console.log(`   http://localhost:${PORT}/api/products`);
    console.log(`   http://localhost:${PORT}/api/search?category=electronics`);
});

console.log('Запуск сервера...');