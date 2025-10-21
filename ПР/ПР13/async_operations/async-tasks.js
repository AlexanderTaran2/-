// === АСИНХРОННЫЕ ОПЕРАЦИИ - ОСНОВНЫЕ ЗАДАНИЯ ===

// ЗАДАНИЕ 1: Основы промисов

// 1.1. Создайте функцию createBasicPromise, которая возвращает промис
function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех!");
            } else {
                reject("Ошибка!");
            }
        }, 1000);
    });
}

// 1.2. Создайте функцию handleBasicPromise, которая обрабатывает промис
function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    output.innerHTML = "Обработка промиса...";
    
    createBasicPromise(true)
        .then(result => {
            output.innerHTML = `Результат: ${result}`;
        })
        .catch(error => {
            output.innerHTML = `Ошибка: ${error}`;
        });
}

// 1.3. Создайте функцию createPromiseChain, которая демонстрирует цепочку промисов
function createPromiseChain() {
    const output = document.getElementById('promise-output');
    output.innerHTML = "Запуск цепочки промисов...";
    
    createBasicPromise(true)
        .then(result => {
            output.innerHTML += `<br>Шаг 1: ${result}`;
            return new Promise(resolve => {
                setTimeout(() => resolve(`${result} -> Шаг 2`), 500);
            });
        })
        .then(result => {
            output.innerHTML += `<br>Шаг 2: ${result}`;
            return new Promise(resolve => {
                setTimeout(() => resolve(`${result} -> Шаг 3`), 500);
            });
        })
        .then(result => {
            output.innerHTML += `<br>Шаг 3: ${result}`;
            output.innerHTML += `<br>Цепочка завершена!`;
        })
        .catch(error => {
            output.innerHTML += `<br>Ошибка в цепочке: ${error}`;
        });
}

// 1.4. Создайте функцию handlePromiseError, которая обрабатывает ошибки в промисах
function handlePromiseError() {
    const output = document.getElementById('promise-output');
    output.innerHTML = "Тестирование ошибки...";
    
    createBasicPromise(false)
        .then(result => {
            output.innerHTML = `Результат: ${result}`;
        })
        .catch(error => {
            output.innerHTML = `Поймана ошибка: ${error}`;
        });
}

// 1.5. Создайте функцию setupPromiseEvents, которая настраивает обработчики
function setupPromiseEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
}

// ЗАДАНИЕ 2: Async/Await

// 2.1. Создайте функцию basicAsyncAwait, которая использует async/await
async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    output.innerHTML = "Запуск async/await...";
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const result = await createBasicPromise(true);
        output.innerHTML = `Async результат: ${result}`;
    } catch (error) {
        output.innerHTML = `Async ошибка: ${error}`;
    }
}

// 2.2. Создайте функцию handleAsyncError с try/catch
async function handleAsyncError() {
    const output = document.getElementById('async-output');
    output.innerHTML = "Тестирование async ошибки...";
    
    try {
        const result = await createBasicPromise(false);
        output.innerHTML = `Результат: ${result}`;
    } catch (error) {
        output.innerHTML = `Поймана async ошибка: ${error}`;
    }
}

// 2.3. Создайте функцию parallelAsyncExecution для параллельного выполнения
async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    output.innerHTML = "Параллельное выполнение...";
    
    const startTime = Date.now();
    
    const promises = [
        new Promise(resolve => setTimeout(() => resolve("Задача 1 завершена"), 1000)),
        new Promise(resolve => setTimeout(() => resolve("Задача 2 завершена"), 1500)),
        new Promise(resolve => setTimeout(() => resolve("Задача 3 завершена"), 800))
    ];
    
    try {
        const results = await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.innerHTML = `Все задачи завершены за ${duration}мс:<br>`;
        results.forEach((result, index) => {
            output.innerHTML += `${index + 1}. ${result}<br>`;
        });
    } catch (error) {
        output.innerHTML = `Ошибка при параллельном выполнении: ${error}`;
    }
}

// 2.4. Создайте функцию setupAsyncEvents, которая настраивает обработчики
function setupAsyncEvents() {
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
}

// ЗАДАНИЕ 3: Работа с внешними API

// 3.1. Создайте функцию fetchUsers, которая загружает пользователей с JSONPlaceholder API
async function fetchUsers() {
    const output = document.getElementById('api-data');
    output.innerHTML = "Загрузка пользователей...";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        output.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Телефон: ${user.phone}</p>
                <p>Компания: ${user.company.name}</p>
            `;
            output.appendChild(userCard);
        });
    } catch (error) {
        output.innerHTML = `Ошибка при загрузке пользователей: ${error.message}`;
    }
}

// 3.2. Создайте функцию createPost, которая отправляет POST запрос
async function createPost() {
    const output = document.getElementById('api-output');
    output.innerHTML = "Отправка POST запроса...";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержание нового поста',
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        output.innerHTML = `POST успешен! Ответ:<br><pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        output.innerHTML = `Ошибка при отправке POST: ${error.message}`;
    }
}

// 3.3. Создайте функцию testApiError, которая тестирует обработку ошибок API
async function testApiError() {
    const output = document.getElementById('api-output');
    output.innerHTML = "Тестирование ошибок API...";
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        output.innerHTML = `Данные: ${JSON.stringify(data)}`;
    } catch (error) {
        output.innerHTML = `Поймана ошибка API:<br><strong>${error.message}</strong>`;
    }
}

// 3.4. Создайте функцию setupApiEvents, которая настраивает обработчики API
function setupApiEvents() {
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
}

// ЗАДАНИЕ 4: Асинхронные таймеры

let intervalId;
let intervalCounter = 0;

// 4.1. Создайте функцию startAsyncInterval, которая запускает асинхронный интервал
async function startAsyncInterval() {
    const output = document.getElementById('interval-output');
    output.innerHTML = "Запуск асинхронного интервала...";
    
    intervalCounter = 0;
    intervalId = setInterval(async () => {
        intervalCounter++;
        output.innerHTML = `Интервал выполнен ${intervalCounter} раз(а)`;
        
        // Имитация асинхронной операции
        await new Promise(resolve => setTimeout(resolve, 100));
    }, 1000);
}

// 4.2. Создайте функцию stopAsyncInterval, которая останавливает интервал
function stopAsyncInterval() {
    const output = document.getElementById('interval-output');
    
    if (intervalId) {
        clearInterval(intervalId);
        output.innerHTML = `Интервал остановлен. Всего выполнено: ${intervalCounter} раз`;
        intervalCounter = 0;
        intervalId = null;
    }
}

// 4.3. Создайте функцию delayWithPromise, которая создает задержку с промисом
function delayWithPromise(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Задержка ${ms}мс завершена`);
        }, ms);
    });
}

// 4.4. Создайте функцию testDelay, которая тестирует задержку
async function testDelay() {
    const output = document.getElementById('timer-output');
    output.innerHTML = "Тестирование последовательных задержек...";
    
    try {
        output.innerHTML += "<br>Задержка 500мс...";
        await delayWithPromise(500);
        output.innerHTML += "<br>Задержка 1000мс...";
        await delayWithPromise(1000);
        output.innerHTML += "<br>Задержка 300мс...";
        await delayWithPromise(300);
        output.innerHTML += "<br>Все задержки завершены!";
    } catch (error) {
        output.innerHTML += `<br>Ошибка: ${error}`;
    }
}

// 4.5. Создайте функцию setupTimerEvents, которая настраивает обработчики таймеров
function setupTimerEvents() {
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
}

// ЗАДАНИЕ 5: Обработка ошибок

// 5.1. Создайте функцию asyncTryCatch, которая демонстрирует try/catch с async
async function asyncTryCatch() {
    const output = document.getElementById('error-output');
    output.innerHTML = "Тестирование вложенных try/catch...";
    
    try {
        // Первая асинхронная операция
        try {
            await createBasicPromise(false);
        } catch (innerError) {
            output.innerHTML += `<br>Внутренняя ошибка перехвачена: ${innerError}`;
        }
        
        // Вторая асинхронная операция
        await createBasicPromise(true);
        output.innerHTML += "<br>Вторая операция успешна!";
        
    } catch (outerError) {
        output.innerHTML += `<br>Внешняя ошибка: ${outerError}`;
    }
}

// 5.2. Создайте функцию handleMultipleErrors, которая обрабатывает множественные ошибки
async function handleMultipleErrors() {
    const output = document.getElementById('error-output');
    output.innerHTML = "Обработка множественных ошибок...";
    
    const promises = [
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true)
    ];
    
    const results = await Promise.allSettled(promises);
    
    let successCount = 0;
    let errorCount = 0;
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successCount++;
            output.innerHTML += `<br>Промис ${index + 1}: Успех - ${result.value}`;
        } else {
            errorCount++;
            output.innerHTML += `<br>Промис ${index + 1}: Ошибка - ${result.reason}`;
        }
    });
    
    output.innerHTML += `<br><br>Статистика: Успешно - ${successCount}, Ошибок - ${errorCount}`;
}

// 5.3. Создайте функцию retryWithBackoff, которая реализует повторные попытки
async function retryWithBackoff(operation, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            lastError = error;
            console.log(`Попытка ${attempt} не удалась: ${error.message}`);
            
            if (attempt < maxRetries) {
                const delay = Math.pow(2, attempt) * 100; // Экспоненциальная задержка
                console.log(`Повтор через ${delay}мс...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

// 5.4. Создайте функцию setupErrorEvents, которая настраивает обработчики ошибок
function setupErrorEvents() {
    document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
    document.getElementById('retry-pattern').addEventListener('click', async () => {
        const output = document.getElementById('error-output');
        output.innerHTML = "Тестирование повторных попыток...";
        
        const failingOperation = () => {
            return new Promise((resolve, reject) => {
                const shouldFail = Math.random() > 0.7;
                if (shouldFail) {
                    resolve("Операция успешна!");
                } else {
                    reject(new Error("Временная ошибка"));
                }
            });
        };
        
        try {
            const result = await retryWithBackoff(failingOperation, 3);
            output.innerHTML += `<br>Финальный результат: ${result}`;
        } catch (error) {
            output.innerHTML += `<br>Все попытки не удались: ${error.message}`;
        }
    });
}

// ЗАДАНИЕ 6: Параллельные операции

// 6.1. Создайте функцию demonstratePromiseAll, которая использует Promise.all
async function demonstratePromiseAll() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "Демонстрация Promise.all...";
    
    const startTime = Date.now();
    
    const promises = [
        delayWithPromise(1000),
        delayWithPromise(800),
        delayWithPromise(1200),
        delayWithPromise(600),
        delayWithPromise(900)
    ];
    
    try {
        const results = await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        output.innerHTML = `Promise.all завершен за ${duration}мс:<br>`;
        results.forEach((result, index) => {
            output.innerHTML += `${index + 1}. ${result}<br>`;
        });
    } catch (error) {
        output.innerHTML = `Ошибка в Promise.all: ${error}`;
    }
}

// 6.2. Создайте функцию demonstratePromiseRace, которая использует Promise.race
async function demonstratePromiseRace() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "Демонстрация Promise.race...";
    
    const promises = [
        delayWithPromise(2000).then(() => "Медленная задача"),
        delayWithPromise(500).then(() => "Быстрая задача"),
        delayWithPromise(1000).then(() => "Средняя задача")
    ];
    
    try {
        const winner = await Promise.race(promises);
        output.innerHTML += `<br>Победитель гонки: ${winner}`;
    } catch (error) {
        output.innerHTML += `<br>Ошибка в гонке: ${error}`;
    }
}

// 6.3. Создайте функцию demonstratePromiseAllSettled, которая использует Promise.allSettled
async function demonstratePromiseAllSettled() {
    const output = document.getElementById('parallel-output');
    output.innerHTML = "Демонстрация Promise.allSettled...";
    
    const promises = [
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true),
        createBasicPromise(false)
    ];
    
    const results = await Promise.allSettled(promises);
    
    output.innerHTML += "<br>Результаты Promise.allSettled:<br>";
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            output.innerHTML += `Промис ${index + 1}: ✅ ${result.value}<br>`;
        } else {
            output.innerHTML += `Промис ${index + 1}: ❌ ${result.reason}<br>`;
        }
    });
}

// 6.4. Создайте функцию setupParallelEvents, которая настраивает обработчики
function setupParallelEvents() {
    document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
    document.getElementById('promise-allSettled').addEventListener('click', demonstratePromiseAllSettled);
}

// ЗАДАНИЕ 7: Реальные сценарии

// 7.1. Создайте функцию sequentialApiRequests, которая делает последовательные запросы
async function sequentialApiRequests() {
    const output = document.getElementById('scenario-output');
    output.innerHTML = "Последовательные API запросы...";
    
    try {
        // 1. Получить пользователя
        output.innerHTML += "<br>1. Получение пользователя...";
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        output.innerHTML += `<br>✅ Пользователь: ${user.name}`;
        
        // 2. Получить посты пользователя
        output.innerHTML += "<br>2. Получение постов пользователя...";
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        output.innerHTML += `<br>✅ Найдено постов: ${posts.length}`;
        
        // 3. Получить комментарии к первому посту
        if (posts.length > 0) {
            output.innerHTML += "<br>3. Получение комментариев к первому посту...";
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
            const comments = await commentsResponse.json();
            output.innerHTML += `<br>✅ Найдено комментариев: ${comments.length}`;
        }
        
        output.innerHTML += "<br><br>🎉 Все последовательные запросы завершены!";
    } catch (error) {
        output.innerHTML += `<br>❌ Ошибка: ${error.message}`;
    }
}

// 7.2. Создайте функцию simulateFileUpload, которая симулирует загрузку файла
async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressBar = document.getElementById('progress-bar');
    
    output.innerHTML = "Симуляция загрузки файла...";
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    
    for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;
        output.innerHTML = `Загрузка файла... ${progress}%`;
    }
    
    output.innerHTML = "✅ Загрузка файла завершена!";
}

// 7.3. Создайте функцию createRequestCache, которая кэширует результаты запросов
function createRequestCache() {
    const cache = new Map();
    
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            console.log(`Возвращаю закэшированный результат для: ${url}`);
            return cache.get(url);
        }
        
        console.log(`Делаю новый запрос для: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        
        cache.set(url, data);
        return data;
    };
}

// 7.4. Создайте функцию setupRealScenarioEvents, которая настраивает обработчики
function setupRealScenarioEvents() {
    document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
    document.getElementById('cache-requests').addEventListener('click', async () => {
        const output = document.getElementById('scenario-output');
        output.innerHTML = "Тестирование кэширования...";
        
        const cachedFetch = createRequestCache();
        const url = 'https://jsonplaceholder.typicode.com/users/1';
        
        // Первый запрос - должен быть новый
        output.innerHTML += "<br>Первый запрос...";
        const start1 = Date.now();
        await cachedFetch(url);
        const duration1 = Date.now() - start1;
        output.innerHTML += `<br>Завершен за ${duration1}мс`;
        
        // Второй запрос - должен быть из кэша
        output.innerHTML += "<br>Второй запрос (должен быть из кэша)...";
        const start2 = Date.now();
        await cachedFetch(url);
        const duration2 = Date.now() - start2;
        output.innerHTML += `<br>Завершен за ${duration2}мс`;
        
        output.innerHTML += `<br><br>Ускорение: ${(duration1 - duration2)}мс`;
    });
}

// Инициализация всех обработчиков событий
function initializeApp() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
    
    console.log("Приложение инициализировано!");
}

// Запуск инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeApp);