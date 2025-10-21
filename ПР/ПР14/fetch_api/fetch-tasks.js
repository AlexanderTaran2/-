// === FETCH API - ПОЛНАЯ ЛОКАЛЬНАЯ ВЕРСИЯ ===
const API_BASE_URL = ''; // Пустая строка - запросы будут локальными

console.log("✅ Используется локальный API");

// ЗАДАНИЕ 1: Базовые GET запросы

// 1.1. Создайте функцию fetchGetRequest, которая выполняет простой GET запрос
async function fetchGetRequest() {
    const output = document.getElementById('get-output');
    output.innerHTML = "🔄 Выполнение GET запроса...";
    
    try {
        const response = await fetch('/posts/1');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ GET запрос успешен:\n\n${JSON.stringify(data, null, 2)}`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 1.2. Создайте функцию fetchJsonData, которая получает и отображает JSON данные
async function fetchJsonData() {
    const output = document.getElementById('get-data');
    output.innerHTML = "🔄 Загрузка пользователей...";
    
    try {
        const response = await fetch('/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const users = data.users;
        
        output.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>👤 ${user.name}</h3>
                <p>📧 ${user.email}</p>
                <p>📞 ${user.phone}</p>
                <p>👦 ${user.username}</p>
                <p>🆔 ID: ${user.id}</p>
            `;
            output.appendChild(userCard);
        });
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 1.3. Создайте функцию fetchWithError, которая тестирует обработку ошибок
async function fetchWithError() {
    const output = document.getElementById('get-output');
    output.innerHTML = "🔄 Тестирование ошибок...";
    
    try {
        const response = await fetch('/nonexistent');
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        output.innerHTML = `Данные: ${JSON.stringify(data)}`;
    } catch (error) {
        output.innerHTML = `❌ Поймана ошибка:\n${error.message}\n\n💡 Это HTTP ошибка 404 - эндпоинт не существует`;
    }
}

// 1.4. Создайте функцию setupGetRequests, которая настраивает обработчики
function setupGetRequests() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
}

// ЗАДАНИЕ 2: POST, PUT, DELETE запросы

// 2.1. Создайте функцию fetchPostRequest, которая отправляет POST запрос
async function fetchPostRequest() {
    const output = document.getElementById('crud-output');
    output.innerHTML = "🔄 Отправка POST запроса...";
    
    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: 'Новый Пользователь',
                email: 'new@example.com',
                phone: '111-222-3333',
                username: 'newuser'
            })
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ POST успешен! Создан пользователь:\n\n${JSON.stringify(data, null, 2)}`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 2.2. Создайте функцию fetchPutRequest, которая отправляет PUT запрос
async function fetchPutRequest() {
    const output = document.getElementById('crud-output');
    output.innerHTML = "🔄 Отправка PUT запроса...";
    
    try {
        const response = await fetch('/users/1', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: 'Полностью Обновленное Имя',
                email: 'completely.updated@example.com',
                phone: '999-888-7777',
                username: 'fullyupdated'
            })
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ PUT успешен! Пользователь полностью обновлен:\n\n${JSON.stringify(data, null, 2)}\n\n💡 PUT заменяет ВЕСЬ ресурс`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 2.3. Создайте функцию fetchPatchRequest, которая отправляет PATCH запрос
async function fetchPatchRequest() {
    const output = document.getElementById('crud-output');
    output.innerHTML = "🔄 Отправка PATCH запроса...";
    
    try {
        const response = await fetch('/users/1', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: 'partially.updated@example.com'
            })
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ PATCH успешен! Только email обновлен:\n\n${JSON.stringify(data, null, 2)}\n\n💡 PATCH обновляет только указанные поля`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 2.4. Создайте функцию fetchDeleteRequest, которая отправляет DELETE запрос
async function fetchDeleteRequest() {
    const output = document.getElementById('crud-output');
    output.innerHTML = "🔄 Отправка DELETE запроса...";
    
    try {
        const response = await fetch('/users/2', {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        output.innerHTML = `✅ DELETE успешен! Пользователь с ID 2 удален.\nСтатус: ${response.status}`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 2.5. Создайте функцию setupCrudRequests, которая настраивает обработчики
function setupCrudRequests() {
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
}

// ЗАДАНИЕ 3: Заголовки и параметры

// 3.1. Создайте функцию fetchWithHeaders, которая отправляет запрос с кастомными заголовками
async function fetchWithHeaders() {
    const output = document.getElementById('headers-output');
    output.innerHTML = "🔄 Отправка запроса с кастомными заголовками...";
    
    try {
        const response = await fetch('/users/1', {
            headers: {
                'X-Custom-Header': 'MyCustomValue',
                'Authorization': 'Bearer fake-jwt-token-12345',
                'X-API-Key': 'test-api-key',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ Запрос с заголовками успешен!\n\nОтправленные заголовки:\n- X-Custom-Header: MyCustomValue\n- Authorization: Bearer fake-jwt-token-12345\n- X-API-Key: test-api-key\n- Accept: application/json\n\nДанные: ${JSON.stringify(data, null, 2)}`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 3.2. Создайте функцию fetchWithAuth, которая имитирует авторизацию
async function fetchWithAuth() {
    const output = document.getElementById('headers-output');
    output.innerHTML = "🔄 Тестирование авторизации...";
    
    try {
        // Basic Auth
        const basicAuth = btoa('user:password');
        
        const response = await fetch('/users/1', {
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        output.innerHTML = `✅ Basic Auth успешен!\nЗаголовок: Authorization: Basic ${basicAuth}\n\n💡 Способы авторизации:\n1. Basic Auth: Basic base64(username:password)\n2. Bearer Token: Bearer token-value\n3. API Key: X-API-Key: key-value`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка авторизации: ${error.message}`;
    }
}

// 3.3. Создайте функцию fetchWithParams, которая добавляет параметры к URL
async function fetchWithParams() {
    const output = document.getElementById('headers-output');
    output.innerHTML = "🔄 Запрос с параметрами URL...";
    
    try {
        // Использование URLSearchParams
        const params = new URLSearchParams({
            '_limit': '2',
            '_sort': 'id',
            '_order': 'desc'
        });
        
        const response = await fetch(`/users?${params}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ Запрос с параметрами успешен!\n\nURL: /users?${params}\n\nПолучено пользователей: ${data.users.length}\nПараметры:\n- _limit=2 (ограничение)\n- _sort=id (сортировка)\n- _order=desc (порядок)`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 3.4. Создайте функцию fetchWithTimeout, которая реализует таймаут для запроса
async function fetchWithTimeout() {
    const output = document.getElementById('headers-output');
    output.innerHTML = "🔄 Тестирование таймаута (2 секунды)...";
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 2000);
        
        // Имитация медленного запроса
        const response = await fetch('/users?delay=3000', {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        output.innerHTML = "✅ Запрос завершен до таймаута!";
    } catch (error) {
        if (error.name === 'AbortError') {
            output.innerHTML = "⏰ Запрос отменен по таймауту (2 секунды)!\n\n💡 AbortController позволяет отменять запросы.";
        } else {
            output.innerHTML = `❌ Другая ошибка: ${error.message}`;
        }
    }
}

// 3.5. Создайте функцию setupHeadersAndParams, которая настраивает обработчики
function setupHeadersAndParams() {
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth').addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
}

// ЗАДАНИЕ 4: Обработка ответов

// 4.1. Создайте функцию fetchAndCheckStatus, которая проверяет статус ответа
async function fetchAndCheckStatus() {
    const output = document.getElementById('response-output');
    output.innerHTML = "🔄 Проверка статусов ответа...";
    
    try {
        const testUrls = [
            '/users/1', // Должен вернуть 200
            '/nonexistent', // Должен вернуть 404
            '/error' // Должен вернуть 500
        ];
        
        for (const url of testUrls) {
            const response = await fetch(url);
            
            output.innerHTML += `\n\nURL: ${url}`;
            output.innerHTML += `\nСтатус: ${response.status} ${response.statusText}`;
            output.innerHTML += `\nOK: ${response.ok}`;
            
            if (!response.ok) {
                output.innerHTML += `\n⚠️ Это HTTP ошибка!`;
            } else {
                const data = await response.json();
                output.innerHTML += `\n✅ Успешный ответ`;
            }
        }
    } catch (error) {
        output.innerHTML += `\n❌ Сетевая ошибка: ${error.message}`;
    }
}

// 4.2. Создайте функцию fetchAndReadHeaders, которая читает заголовки ответа
async function fetchAndReadHeaders() {
    const output = document.getElementById('response-output');
    output.innerHTML = "🔄 Чтение заголовков ответа...";
    
    try {
        const response = await fetch('/users/1');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        output.innerHTML = "📋 Информация о ответе:\n\n";
        output.innerHTML += `<strong>Status:</strong> ${response.status} ${response.statusText}\n`;
        output.innerHTML += `<strong>OK:</strong> ${response.ok}\n`;
        output.innerHTML += `<strong>URL:</strong> ${response.url}\n`;
        output.innerHTML += `<strong>Type:</strong> ${response.type}\n`;
        
        output.innerHTML += `\n💡 Полезные свойства response:\n- status: HTTP статус код\n- ok: boolean (true если статус 200-299)\n- statusText: текст статуса\n- headers: заголовки ответа`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 4.3. Создайте функцию fetchBlobData, которая работает с бинарными данными
async function fetchBlobData() {
    const output = document.getElementById('response-output');
    const imageContainer = document.getElementById('image-container');
    
    output.innerHTML = "🔄 Создание и загрузка бинарных данных...";
    imageContainer.innerHTML = '';
    
    try {
        // Создаем бинарные данные (изображение) программно
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 150;
        
        // Рисуем простую графику
        ctx.fillStyle = '#74b9ff';
        ctx.fillRect(0, 0, 200, 150);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Fetch API Demo', 20, 75);
        
        // Конвертируем в Blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const imageUrl = URL.createObjectURL(blob);
        
        output.innerHTML = `✅ Бинарные данные созданы!\n\nРазмер: ${blob.size} байт\nТип: ${blob.type}`;
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Сгенерированное изображение';
        img.className = 'image-preview';
        imageContainer.appendChild(img);
    } catch (error) {
        output.innerHTML = `❌ Ошибка работы с бинарными данными: ${error.message}`;
    }
}

// 4.4. Создайте функцию fetchWithFormData, которая отправляет FormData
async function fetchWithFormData() {
    const output = document.getElementById('response-output');
    output.innerHTML = "🔄 Отправка FormData...";
    
    try {
        const formData = new FormData();
        formData.append('title', 'Пост из FormData');
        formData.append('body', 'Содержание из FormData');
        formData.append('userId', '1');
        
        // Создаем файл для демонстрации
        const blob = new Blob(['Пример содержимого файла'], { type: 'text/plain' });
        formData.append('file', blob, 'example.txt');
        
        const response = await fetch('/posts', {
            method: 'POST',
            body: formData
            // Заголовки не нужны - браузер установит multipart/form-data автоматически
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ FormData отправлен успешно!\n\nОтвет:\n${JSON.stringify(data, null, 2)}\n\n💡 FormData автоматически устанавливает Content-Type: multipart/form-data`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка отправки FormData: ${error.message}`;
    }
}

// 4.5. Создайте функцию setupResponseHandling, которая настраивает обработчики
function setupResponseHandling() {
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-response-headers').addEventListener('click', fetchAndReadHeaders);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchWithFormData);
}

// ЗАДАНИЕ 5: Обработка ошибок

// 5.1. Создайте функцию fetchNetworkError, которая обрабатывает сетевые ошибки
async function fetchNetworkError() {
    const output = document.getElementById('error-output');
    output.innerHTML = "🔄 Тестирование сетевых ошибок...";
    
    try {
        // Попытка запроса к несуществующему домену
        const response = await fetch('https://nonexistent-domain-12345.com/api/data');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `Данные: ${JSON.stringify(data)}`;
    } catch (error) {
        output.innerHTML = `❌ Сетевая ошибка:\n\n${error.message}\n\n💡 Это тип ошибки сети (DNS, нет соединения)`;
    }
}

// 5.2. Создайте функцию fetchHttpError, которая обрабатывает HTTP ошибки
async function fetchHttpError() {
    const output = document.getElementById('error-output');
    output.innerHTML = "🔄 Тестирование HTTP ошибок...";
    
    try {
        const response = await fetch('/nonexistent-endpoint');
        
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        output.innerHTML = `Данные: ${JSON.stringify(data)}`;
    } catch (error) {
        output.innerHTML = `❌ HTTP ошибка:\n\n${error.message}\n\n💡 Это HTTP ошибка (статус 4xx/5xx)`;
    }
}

// 5.3. Создайте функцию fetchWithAbort, которая демонстрирует отмену запроса
async function fetchWithAbort() {
    const output = document.getElementById('error-output');
    const abortBtn = document.getElementById('fetch-abort');
    
    output.innerHTML = "🔄 Запуск отменяемого запроса (3 секунды)...";
    
    const controller = new AbortController();
    
    // Меняем кнопку на "Отменить"
    const originalText = abortBtn.textContent;
    abortBtn.textContent = '⏹️ Отменить запрос';
    abortBtn.onclick = () => {
        controller.abort();
        abortBtn.textContent = '✅ Запрос отменен';
        abortBtn.disabled = true;
    };
    
    try {
        // Имитация долгого запроса
        const response = await fetch('/users?delay=3000', {
            signal: controller.signal
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.innerHTML = `✅ Запрос завершен! Получено ${data.users.length} пользователей`;
    } catch (error) {
        if (error.name === 'AbortError') {
            output.innerHTML = "⏹️ Запрос отменен пользователем!";
        } else {
            output.innerHTML = `❌ Другая ошибка: ${error.message}`;
        }
    } finally {
        // Восстанавливаем кнопку
        setTimeout(() => {
            abortBtn.textContent = originalText;
            abortBtn.onclick = () => fetchWithAbort();
            abortBtn.disabled = false;
        }, 2000);
    }
}

// 5.4. Создайте функцию fetchWithRetry, которая реализует повторные попытки
async function fetchWithRetry(url, options = {}, retries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Попытка ${attempt} для ${url}`);
            const response = await fetch(url, options);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            return await response.json();
        } catch (error) {
            lastError = error;
            console.log(`Попытка ${attempt} не удалась: ${error.message}`);
            
            if (attempt < retries) {
                const delay = Math.pow(2, attempt) * 1000; // Экспоненциальная задержка
                console.log(`Повтор через ${delay}мс...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

// 5.5. Создайте функцию setupErrorHandling, которая настраивает обработчики ошибок
function setupErrorHandling() {
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort').addEventListener('click', fetchWithAbort);
    document.getElementById('fetch-retry').addEventListener('click', async () => {
        const output = document.getElementById('error-output');
        output.innerHTML = "🔄 Тестирование повторных попыток...";
        
        try {
            // Используем URL, который иногда возвращает ошибку
            const data = await fetchWithRetry('/users?mayFail=true', {}, 3);
            output.innerHTML = `✅ Успех после повторных попыток: ${JSON.stringify(data, null, 2)}`;
        } catch (error) {
            output.innerHTML = `❌ Все попытки не удались: ${error.message}`;
        }
    });
}

// ЗАДАНИЕ 6: Параллельные запросы

// 6.1. Создайте функцию fetchWithPromiseAll, которая использует Promise.all
async function fetchWithPromiseAll() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "🔄 Параллельное выполнение запросов...";
    
    const startTime = Date.now();
    
    try {
        const promises = [
            fetch('/users/1').then(r => r.json()),
            fetch('/users/2').then(r => r.json()),
            fetch('/posts/1').then(r => r.json()),
            fetch('/posts/2').then(r => r.json())
        ];
        
        const results = await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.innerHTML = `✅ Все запросы завершены за ${duration}мс!\n\n`;
        output.innerHTML += `• Пользователь 1: ${results[0].data.name}\n`;
        output.innerHTML += `• Пользователь 2: ${results[1].data.name}\n`;
        output.innerHTML += `• Пост 1: ${results[2].data.title}\n`;
        output.innerHTML += `• Пост 2: ${results[3].data.title}\n`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка в Promise.all: ${error.message}`;
    }
}

// 6.2. Создайте функцию fetchWithPromiseRace, которая использует Promise.race
async function fetchWithPromiseRace() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "🔄 Гонка запросов...";
    
    try {
        const promises = [
            fetch('/users/1').then(r => r.json()),
            fetch('/users/2').then(r => r.json()),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Таймаут')), 1000)
            )
        ];
        
        const winner = await Promise.race(promises);
        output.innerHTML = `✅ Победитель гонки: Пользователь "${winner.data.name}"`;
    } catch (error) {
        output.innerHTML = `❌ Победитель гонки: ${error.message}`;
    }
}

// 6.3. Создайте функцию fetchSequentialRequests, которая выполняет последовательные запросы
async function fetchSequentialRequests() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "🔄 Последовательные запросы...";
    
    const startTime = Date.now();
    
    try {
        // 1. Получить пользователя
        const userResponse = await fetch('/users/1');
        const user = await userResponse.json();
        
        // 2. Получить посты пользователя
        const postsResponse = await fetch('/posts');
        const posts = await postsResponse.json();
        const userPosts = posts.posts.filter(post => post.userId === user.data.id);
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.innerHTML = `✅ Последовательные запросы завершены за ${duration}мс!\n\n`;
        output.innerHTML += `👤 Пользователь: ${user.data.name}\n`;
        output.innerHTML += `📝 Постов пользователя: ${userPosts.length}\n`;
        output.innerHTML += `💡 Разница с параллельными: здесь каждый запрос ждет предыдущий`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка в последовательных запросах: ${error.message}`;
    }
}

// 6.4. Создайте функцию setupParallelRequests, которая настраивает обработчики
function setupParallelRequests() {
    document.getElementById('fetch-promise-all').addEventListener('click', fetchWithPromiseAll);
    document.getElementById('fetch-promise-race').addEventListener('click', fetchWithPromiseRace);
    document.getElementById('fetch-sequential').addEventListener('click', fetchSequentialRequests);
}

// ЗАДАНИЕ 7: Реальные сценарии

// 7.1. Создайте функцию fetchUserWithPosts, которая получает пользователя и его посты
async function fetchUserWithPosts() {
    const output = document.getElementById('scenario-output');
    output.innerHTML = "🔄 Получение пользователя и его постов...";
    
    try {
        // Получаем пользователя
        const userResponse = await fetch('/users/1');
        const user = await userResponse.json();
        
        // Получаем все посты
        const postsResponse = await fetch('/posts');
        const posts = await postsResponse.json();
        
        // Фильтруем посты пользователя
        const userPosts = posts.posts.filter(post => post.userId === user.data.id);
        
        output.innerHTML = `
            <div class="user-card">
                <h3>👤 ${user.data.name}</h3>
                <p>📧 ${user.data.email}</p>
                <p>📞 ${user.data.phone}</p>
                <p>📝 Постов: ${userPosts.length}</p>
            </div>
        `;
        
        // Показываем посты
        userPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.body}</p>
            `;
            output.appendChild(postCard);
        });
    } catch (error) {
        output.innerHTML = `❌ Ошибка: ${error.message}`;
    }
}

// 7.2. Создайте функцию fetchWithSearch, которая реализует поиск
async function fetchWithSearch() {
    const output = document.getElementById('scenario-output');
    output.innerHTML = "🔄 Поиск пользователей...";
    
    try {
        const searchTerm = 'иван'; // Русская буква для поиска
        const response = await fetch('/users');
        const data = await response.json();
        
        const users = data.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        output.innerHTML = `🔍 Результаты поиска по "${searchTerm}":\n\n`;
        
        if (users.length > 0) {
            users.forEach(user => {
                output.innerHTML += `👤 ${user.name} (${user.email})\n`;
            });
        } else {
            output.innerHTML += "😞 Ничего не найдено";
        }
    } catch (error) {
        output.innerHTML = `❌ Ошибка поиска: ${error.message}`;
    }
}

// 7.3. Создайте функцию simulateFileUpload, которая симулирует загрузку файла
async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressBar = document.getElementById('progress-bar');
    
    output.innerHTML = "🔄 Симуляция загрузки файла...";
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    progressBar.style.background = 'linear-gradient(90deg, #00b894, #55efc4)';
    
    try {
        // Создаем файл для загрузки
        const fileContent = 'Это содержимое тестового файла для загрузки.';
        const blob = new Blob([fileContent], { type: 'text/plain' });
        
        const formData = new FormData();
        formData.append('file', blob, 'test.txt');
        formData.append('description', 'Тестовый файл');
        
        // Симуляция прогресса загрузки
        for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
            output.innerHTML = `📤 Загрузка файла... ${progress}%`;
        }
        
        // Отправка файла
        const response = await fetch('/posts', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        output.innerHTML = `✅ Файл успешно загружен!\n\nID: ${result.id}\nНазвание: ${result.title}`;
    } catch (error) {
        output.innerHTML = `❌ Ошибка загрузки: ${error.message}`;
        progressBar.style.background = '#d63031';
    }
}

// 7.4. Создайте функцию createFetchCache, которая кэширует результаты запросов
function createFetchCache() {
    const cache = new Map();
    
    return async function cachedFetch(url, options = {}) {
        const cacheKey = `${url}-${JSON.stringify(options)}`;
        
        // Проверяем кэш
        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            if (Date.now() - cached.timestamp < 30000) { // TTL: 30 секунд
                console.log('🔄 Возвращаю из кэша:', url);
                return cached.data;
            } else {
                // Удаляем просроченный кэш
                cache.delete(cacheKey);
            }
        }
        
        console.log('🌐 Выполняю новый запрос:', url);
        const response = await fetch(url, options);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        // Сохраняем в кэш
        cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });
        
        return data;
    };
}

// 7.5. Создайте функцию setupRealScenarios, которая настраивает обработчики
function setupRealScenarios() {
    document.getElementById('fetch-user-posts').addEventListener('click', fetchUserWithPosts);
    document.getElementById('fetch-search').addEventListener('click', fetchWithSearch);
    document.getElementById('fetch-upload').addEventListener('click', simulateFileUpload);
    document.getElementById('fetch-cache').addEventListener('click', async () => {
        const output = document.getElementById('scenario-output');
        output.innerHTML = "🔄 Тестирование кэширования...";
        
        const cachedFetch = createFetchCache();
        const url = '/users/1';
        
        // Первый запрос
        output.innerHTML += "\n\nПервый запрос (должен быть новый)...";
        const start1 = Date.now();
        await cachedFetch(url);
        const duration1 = Date.now() - start1;
        output.innerHTML += `\nЗавершен за ${duration1}мс`;
        
        // Второй запрос (должен быть из кэша)
        output.innerHTML += "\n\nВторой запрос (должен быть из кэша)...";
        const start2 = Date.now();
        await cachedFetch(url);
        const duration2 = Date.now() - start2;
        output.innerHTML += `\nЗавершен за ${duration2}мс`;
        
        output.innerHTML += `\n\n💡 Ускорение: ${(duration1 - duration2)}мс\nКэширование работает!`;
    });
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// Инициализация всех обработчиков событий
function initializeApp() {
    console.log("🚀 Инициализация Fetch API приложения...");
    
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();
    
    console.log("✅ Все обработчики настроены!");
    
    // Тестовый запрос при загрузке
    setTimeout(() => {
        fetch('/users/1')
            .then(r => r.json())
            .then(data => console.log("✅ Локальный API работает:", data.data))
            .catch(err => console.log("❌ Ошибка:", err));
    }, 500);
}

// Запуск инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeApp);

// Экспортируем функции для тестов
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchGetRequest,
        fetchPostRequest,
        fetchPutRequest,
        fetchPatchRequest,
        fetchDeleteRequest,
        fetchWithRetry,
        createFetchCache
    };
}
// P.S: Если вы это читаете - знайте, я перепробовал всевозможные открытые АПИ, что только смог найти на просторах сраного интернета, однако всегда ловил ошибку коннекта (ссылка была написана правильно), 
// поэтому, мной было принято решение создать свой локальный АПИ для выполнения этой практической. Спасибо за ваше внимание к этому вопросу.