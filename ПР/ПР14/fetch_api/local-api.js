// ЛОКАЛЬНЫЙ API - РАБОТАЕТ БЕЗ ИНТЕРНЕТА
class LocalAPI {
    constructor() {
        this.data = {
            users: [
                { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', phone: '123-456-7890', username: 'ivanov' },
                { id: 2, name: 'Петр Петров', email: 'petr@example.com', phone: '098-765-4321', username: 'petrov' },
                { id: 3, name: 'Мария Сидорова', email: 'maria@example.com', phone: '555-123-4567', username: 'sidorova' }
            ],
            posts: [
                { id: 1, title: 'Мой первый пост', body: 'Содержание первого поста', userId: 1 },
                { id: 2, title: 'Второй пост', body: 'Содержание второго поста', userId: 1 },
                { id: 3, title: 'Пост от другого пользователя', body: 'Содержание третьего поста', userId: 2 }
            ],
            comments: [
                { id: 1, postId: 1, body: 'Отличный пост!', email: 'comment@example.com' }
            ]
        };
    }

    // Имитация задержки сети
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Обработка всех запросов
    async handleRequest(url, options = {}) {
        await this.delay(300 + Math.random() * 500); // Случайная задержка 300-800ms
        
        const method = options.method || 'GET';
        const path = url.replace(/https?:\/\/[^\/]+\//, '/'); // Убираем домен

        console.log(`🔄 LocalAPI: ${method} ${path}`);

        try {
            // GET /users
            if (path === '/users' && method === 'GET') {
                return this.success({ users: this.data.users });
            }

            // GET /users/1
            if (path.match(/^\/users\/\d+$/) && method === 'GET') {
                const id = parseInt(path.split('/')[2]);
                const user = this.data.users.find(u => u.id === id);
                return user ? this.success({ data: user }) : this.error(404, 'User not found');
            }

            // GET /posts
            if (path === '/posts' && method === 'GET') {
                return this.success({ posts: this.data.posts });
            }

            // GET /posts/1
            if (path.match(/^\/posts\/\d+$/) && method === 'GET') {
                const id = parseInt(path.split('/')[2]);
                const post = this.data.posts.find(p => p.id === id);
                return post ? this.success({ data: post }) : this.error(404, 'Post not found');
            }

            // POST /users
            if (path === '/users' && method === 'POST') {
                const newUser = {
                    id: Math.max(...this.data.users.map(u => u.id)) + 1,
                    ...JSON.parse(options.body),
                    createdAt: new Date().toISOString()
                };
                this.data.users.push(newUser);
                return this.success(newUser, 201);
            }

            // POST /posts
            if (path === '/posts' && method === 'POST') {
                const newPost = {
                    id: Math.max(...this.data.posts.map(p => p.id)) + 1,
                    ...JSON.parse(options.body),
                    id: Math.max(...this.data.posts.map(p => p.id)) + 1
                };
                this.data.posts.push(newPost);
                return this.success(newPost, 201);
            }

            // PUT /users/1
            if (path.match(/^\/users\/\d+$/) && method === 'PUT') {
                const id = parseInt(path.split('/')[2]);
                const index = this.data.users.findIndex(u => u.id === id);
                if (index !== -1) {
                    this.data.users[index] = { ...this.data.users[index], ...JSON.parse(options.body) };
                    return this.success(this.data.users[index]);
                }
                return this.error(404, 'User not found');
            }

            // PATCH /users/1
            if (path.match(/^\/users\/\d+$/) && method === 'PATCH') {
                const id = parseInt(path.split('/')[2]);
                const index = this.data.users.findIndex(u => u.id === id);
                if (index !== -1) {
                    const updates = JSON.parse(options.body);
                    this.data.users[index] = { ...this.data.users[index], ...updates };
                    return this.success(this.data.users[index]);
                }
                return this.error(404, 'User not found');
            }

            // DELETE /users/1
            if (path.match(/^\/users\/\d+$/) && method === 'DELETE') {
                const id = parseInt(path.split('/')[2]);
                this.data.users = this.data.users.filter(u => u.id !== id);
                return this.success({}, 204);
            }

            // Ошибка для тестирования
            if (path.includes('nonexistent') || path.includes('error')) {
                return this.error(404, 'Not Found');
            }

            return this.error(404, 'Endpoint not found');

        } catch (error) {
            return this.error(500, 'Internal Server Error');
        }
    }

    success(data, status = 200) {
        return {
            ok: true,
            status: status,
            json: () => Promise.resolve(data),
            text: () => Promise.resolve(JSON.stringify(data)),
            headers: {
                get: (name) => {
                    const headers = {
                        'content-type': 'application/json',
                        'content-length': JSON.stringify(data).length.toString()
                    };
                    return headers[name.toLowerCase()];
                }
            }
        };
    }

    error(status, message) {
        return {
            ok: false,
            status: status,
            statusText: message,
            json: () => Promise.reject(new Error(message)),
            text: () => Promise.reject(new Error(message))
        };
    }
}

// Перехватываем fetch
const originalFetch = window.fetch;
const localAPI = new LocalAPI();

window.fetch = async function(url, options) {
    // Если URL соответствует нашим эндпоинтам, используем локальный API
    if (url.includes('/users') || url.includes('/posts') || url.includes('/comments')) {
        return localAPI.handleRequest(url, options);
    }
    
    // Для других URL (картинки и т.д.) используем оригинальный fetch
    return originalFetch(url, options);
};

console.log('✅ Локальный API активирован! Все запросы будут работать оффлайн.');