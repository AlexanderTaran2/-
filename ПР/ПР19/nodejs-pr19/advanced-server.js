const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

function loggingMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
}

function jsonParserMiddleware(req, res, next) {
    if (req.headers['content-type'] === 'application/json') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                req.body = JSON.parse(body);
                next();
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Неверный формат JSON' }));
            }
        });
    } else {
        next();
    }
}

function staticFilesMiddleware(req, res, next) {
    const staticDir = path.join(__dirname, 'static');
    
    if (req.url.startsWith('/static/')) {
        const filePath = path.join(staticDir, req.url.replace('/static/', ''));
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Файл не найден');
                return;
            }
            
            const ext = path.extname(filePath).toLowerCase();
            const contentTypes = {
                '.html': 'text/html; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.js': 'application/javascript; charset=utf-8'
            };
            
            const contentType = contentTypes[ext] || 'text/plain; charset=utf-8';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } else {
        next();
    }
}

let tasks = [
    { id: 1, title: 'Изучить Node.js', completed: false, priority: 'high' },
    { id: 2, title: 'Создать REST API', completed: true, priority: 'medium' }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const middlewareStack = [loggingMiddleware, staticFilesMiddleware, jsonParserMiddleware];
    
    function executeMiddleware(index) {
        if (index < middlewareStack.length) {
            middlewareStack[index](req, res, () => executeMiddleware(index + 1));
        } else {
            handleRoutes(req, res);
        }
    }
    
    executeMiddleware(0);
});

function handleRoutes(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;
    
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Продвинутый сервер Node.js с middleware',
            features: ['Логирование', 'Статические файлы', 'Парсинг JSON'],
            endpoints: {
                '/api/tasks': 'GET, POST - работа с задачами',
                '/api/tasks/:id': 'GET, PUT, DELETE - работа с задачей',
                '/api/stats': 'GET - статистика',
                '/static/*': 'Статические файлы'
            }
        }));
    }
    else if (pathname === '/api/tasks' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(tasks));
    }
    else if (pathname === '/api/tasks' && method === 'POST') {
        if (!req.body) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Нужен JSON' }));
            return;
        }
        
        const newTask = {
            id: tasks.length + 1,
            title: req.body.title,
            completed: req.body.completed || false,
            priority: req.body.priority || 'medium'
        };
        
        tasks.push(newTask);
        res.writeHead(201);
        res.end(JSON.stringify(newTask));
    }
    else if (pathname.startsWith('/api/tasks/') && method === 'GET') {
        const taskId = parseInt(pathname.split('/')[3]);
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            res.writeHead(200);
            res.end(JSON.stringify(task));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Задача не найдена' }));
        }
    }
    else if (pathname === '/api/stats' && method === 'GET') {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        
        res.writeHead(200);
        res.end(JSON.stringify({
            total: total,
            completed: completed,
            pending: total - completed
        }));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Маршрут не найден' }));
    }
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 Продвинутый сервер на порту ${PORT}`);
    
    const staticDir = path.join(__dirname, 'static');
    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
    }
});