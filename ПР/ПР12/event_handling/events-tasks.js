// ЗАДАНИЕ 1: Базовые обработчики событий

// 1.1. Создайте функцию handleBasicClick, которая обрабатывает клик по кнопке #basic-btn
function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    
    // Информация о событии
    const eventInfo = {
        type: event.type,
        target: event.target.tagName,
        clientX: event.clientX,
        clientY: event.clientY,
        timestamp: new Date().toLocaleTimeString()
    };
    
    // Вывод информации
    output.innerHTML = `
        📍 Информация о событии:
        • Тип: ${eventInfo.type}
        • Элемент: ${eventInfo.target}
        • Координаты: (${eventInfo.clientX}, ${eventInfo.clientY})
        • Время: ${eventInfo.timestamp}
    `;
    
    // Добавляем анимацию
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
}

// 1.2. Создайте функцию handleMouseEvents, которая обрабатывает события мыши на #color-box
function handleMouseEvents(event) {
    const box = event.currentTarget;
    const output = document.getElementById('mouse-output');
    
    switch(event.type) {
        case 'mouseenter':
            box.style.backgroundColor = '#e74c3c';
            box.textContent = 'Курсор внутри';
            break;
            
        case 'mouseleave':
            box.style.backgroundColor = '#3498db';
            box.textContent = 'Наведи курсор';
            break;
            
        case 'mousemove':
            const relativeX = event.offsetX;
            const relativeY = event.offsetY;
            output.textContent = `Координаты: (${relativeX}, ${relativeY})`;
            break;
    }
}

// 1.3. Создайте функцию setupBasicEvents, которая настраивает все обработчики для задачи 1
function setupBasicEvents() {
    const basicBtn = document.getElementById('basic-btn');
    const colorBox = document.getElementById('color-box');
    
    basicBtn.addEventListener('click', handleBasicClick);
    
    colorBox.addEventListener('mouseenter', handleMouseEvents);
    colorBox.addEventListener('mouseleave', handleMouseEvents);
    colorBox.addEventListener('mousemove', handleMouseEvents);
}

// ЗАДАНИЕ 2: События клавиатуры

// 2.1. Создайте функцию handleKeyEvents, которая обрабатывает события клавиатуры
function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    
    const keyInfo = {
        key: event.key,
        code: event.code,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey
    };
    
    let message = `Нажата клавиша: "${keyInfo.key}" (код: ${keyInfo.code})\n`;
    message += `Модификаторы: Ctrl: ${keyInfo.ctrlKey}, Alt: ${keyInfo.altKey}, Shift: ${keyInfo.shiftKey}\n`;
    
    // Обработка комбинаций
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        message += '🎯 Комбинация Ctrl+S заблокирована!\n';
    }
    
    if (event.altKey && event.key === 'c') {
        event.preventDefault();
        message += '🎯 Комбинация Alt+C заблокирована!\n';
    }
    
    if (event.shiftKey && event.key === 'A') {
        event.preventDefault();
        message += '🎯 Комбинация Shift+A заблокирована!\n';
    }
    
    output.textContent = message;
}

// 2.2. Создайте функцию setupKeyboardEvents, которая настраивает обработчики клавиатуры
function setupKeyboardEvents() {
    const keyInput = document.getElementById('key-input');
    
    keyInput.addEventListener('keydown', handleKeyEvents);
    keyInput.addEventListener('keyup', function(event) {
        const output = document.getElementById('key-output');
        output.textContent += `Клавиша "${event.key}" отпущена\n`;
    });
}

// ЗАДАНИЕ 3: Делегирование событий

// 3.1. Создайте функцию handleDelegationClick, используя делегирование событий
function handleDelegationClick(event) {
    const output = document.getElementById('delegation-output');
    const target = event.target;
    
    // Обработка клика на элементе списка
    if (target.classList.contains('item')) {
        target.classList.toggle('selected');
    }
    
    // Обработка клика на кнопке удаления
    if (target.classList.contains('delete')) {
        const listItem = target.closest('.item');
        if (listItem) {
            listItem.remove();
            output.textContent = `Элемент ${listItem.dataset.id} удален`;
            setTimeout(() => output.textContent = '', 2000);
        }
    }
    
    // Обновление информации о выбранных элементах
    updateSelectedItemsInfo();
}

function updateSelectedItemsInfo() {
    const output = document.getElementById('delegation-output');
    const selectedItems = document.querySelectorAll('.item.selected');
    const selectedIds = Array.from(selectedItems).map(item => item.dataset.id);
    
    if (selectedIds.length > 0) {
        output.textContent = `Выбраны элементы: ${selectedIds.join(', ')}`;
    } else {
        output.textContent = 'Элементы не выбраны';
    }
}

// 3.2. Создайте функцию addNewItem, которая добавляет новый элемент в список
function addNewItem() {
    const itemList = document.getElementById('item-list');
    const items = itemList.querySelectorAll('.item');
    const nextId = items.length + 1;
    
    const newItem = document.createElement('li');
    newItem.className = 'item';
    newItem.dataset.id = nextId;
    newItem.innerHTML = `Элемент ${nextId} <button class="delete">×</button>`;
    
    itemList.appendChild(newItem);
}

// 3.3. Создайте функцию setupDelegationEvents, которая настраивает делегирование
function setupDelegationEvents() {
    const itemList = document.getElementById('item-list');
    const addButton = document.getElementById('add-item-btn');
    
    itemList.addEventListener('click', handleDelegationClick);
    addButton.addEventListener('click', addNewItem);
}

// ЗАДАНИЕ 4: Предотвращение поведения

// 4.1. Создайте функцию preventLinkDefault, которая предотвращает переход по ссылке
function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    
    output.innerHTML = '<div class="message info">🚫 Переход по ссылке заблокирован!</div>';
    
    // Анимация
    event.target.classList.add('shake');
    setTimeout(() => {
        event.target.classList.remove('shake');
    }, 500);
}

// 4.2. Создайте функцию preventFormSubmit, которая обрабатывает отправку формы
function preventFormSubmit(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    const input = document.getElementById('prevent-input');
    
    // Валидация
    if (!input.value.trim()) {
        output.innerHTML = '<div class="message error">❌ Поле не должно быть пустым!</div>';
        input.focus();
        return;
    }
    
    // Показ данных формы
    output.innerHTML = `
        <div class="message success">
            ✅ Форма обработана успешно!\n
            📋 Данные: "${input.value}"
        </div>
    `;
    
    // Очистка поля
    input.value = '';
}

// 4.3. Создайте функцию setupPreventionEvents, которая настраивает предотвращение
function setupPreventionEvents() {
    const preventLink = document.getElementById('prevent-link');
    const preventForm = document.getElementById('prevent-form');
    
    preventLink.addEventListener('click', preventLinkDefault);
    preventForm.addEventListener('submit', preventFormSubmit);
}

// ЗАДАНИЕ 5: Кастомные события

// 5.1. Создайте функцию createCustomEvent и запустите его
function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: {
            message: "Привет от кастомного события!",
            timestamp: new Date().toLocaleTimeString(),
            randomNumber: Math.floor(Math.random() * 100)
        },
        bubbles: true,
        cancelable: true
    });
    
    document.dispatchEvent(customEvent);
}

// 5.2. Создайте функцию handleCustomEvent, которая обрабатывает кастомное событие
function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    const { message, timestamp, randomNumber } = event.detail;
    
    output.innerHTML = `
        <div class="message success">
            🎉 Кастомное событие получено!\n
            📝 Сообщение: ${message}\n
            ⏰ Время: ${timestamp}\n
            🔢 Число: ${randomNumber}
        </div>
    `;
    
    // Анимация кнопки
    const button = document.getElementById('trigger-custom');
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 1000);
}

// 5.3. Создайте функцию setupMultipleListeners, которая добавляет несколько обработчиков
function setupMultipleListeners() {
    const output = document.getElementById('custom-output');
    
    // Первый обработчик
    const handler1 = function(event) {
        output.innerHTML += '<div class="message info">👂 Обработчик 1: Событие получено</div>\n';
    };
    
    // Второй обработчик
    const handler2 = function(event) {
        output.innerHTML += '<div class="message info">👂 Обработчик 2: Данные - ' + event.detail.randomNumber + '</div>\n';
    };
    
    // Третий обработчик
    const handler3 = function(event) {
        output.innerHTML += '<div class="message info">👂 Обработчик 3: Время - ' + event.detail.timestamp + '</div>\n';
    };
    
    // Добавляем обработчики
    document.addEventListener('customAction', handler1);
    document.addEventListener('customAction', handler2);
    document.addEventListener('customAction', handler3);
    
    output.textContent = '✅ Добавлено 3 обработчика для кастомного события';
    
    // Запускаем событие для демонстрации
    setTimeout(() => {
        triggerCustomEvent();
    }, 1000);
}

// 5.4. Создайте функцию setupCustomEvents, которая настраивает кастомные события
function setupCustomEvents() {
    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');
    
    document.addEventListener('customAction', handleCustomEvent);
    triggerBtn.addEventListener('click', triggerCustomEvent);
    multipleBtn.addEventListener('click', setupMultipleListeners);
}

// ЗАДАНИЕ 6: События загрузки и ошибок

// 6.1. Создайте функцию loadImageWithEvents, которая загружает изображение
function loadImageWithEvents() {
    const output = document.getElementById('loading-output');
    const container = document.getElementById('image-container');
    
    output.textContent = '🔄 Начинаем загрузку изображения...';
    
    const img = new Image();
    
    // Обработчики событий загрузки
    img.addEventListener('loadstart', () => {
        output.textContent += '\n📦 Загрузка началась...';
    });
    
    img.addEventListener('load', () => {
        output.textContent += '\n✅ Изображение успешно загружено!';
        container.innerHTML = '';
        container.appendChild(img);
    });
    
    img.addEventListener('error', () => {
        output.textContent += '\n❌ Ошибка загрузки изображения!';
    });
    
    img.addEventListener('loadend', () => {
        output.textContent += '\n🏁 Загрузка завершена.';
    });
    
    img.src = 'https://picsum.photos/300/200?' + Date.now();
}

// 6.2. Создайте функцию simulateLoadError, которая симулирует ошибку загрузки
function simulateLoadError() {
    const output = document.getElementById('loading-output');
    const container = document.getElementById('image-container');
    
    output.textContent = '🔄 Пытаемся загрузить несуществующее изображение...';
    
    const img = new Image();
    
    img.addEventListener('error', () => {
        output.textContent += '\n❌ Ошибка загрузки! Изображение не найдено.';
        container.innerHTML = '<div class="message error">Не удалось загрузить изображение</div>';
    });
    
    img.src = 'https://invalid-url-that-does-not-exist.com/image.jpg';
}

// 6.3. Создайте функцию setupLoadingEvents, которая настраивает события загрузки
function setupLoadingEvents() {
    const loadBtn = document.getElementById('load-image');
    const errorBtn = document.getElementById('load-error');
    
    loadBtn.addEventListener('click', loadImageWithEvents);
    errorBtn.addEventListener('click', simulateLoadError);
}

// ЗАДАНИЕ 7: Таймеры и асинхронные события

let timerInterval;
let timerValue = 0;

// 7.1. Создайте функцию startTimer, которая запускает секундомер
function startTimer() {
    if (timerInterval) {
        return; // Уже запущен
    }
    
    const output = document.getElementById('timer-output');
    timerValue = 0;
    
    timerInterval = setInterval(() => {
        timerValue++;
        output.textContent = `${timerValue} сек`;
        
        // Визуальная обратная связь каждые 5 секунд
        if (timerValue % 5 === 0) {
            output.classList.add('pulse');
            setTimeout(() => output.classList.remove('pulse'), 500);
        }
    }, 1000);
}

// 7.2. Создайте функцию stopTimer, которая останавливает секундомер
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        
        const output = document.getElementById('timer-output');
        output.textContent = `Остановлено: ${timerValue} сек`;
        timerValue = 0;
    }
}

// 7.3. Создайте функцию createDebounce, которая реализует debounce
function createDebounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 7.4. Создайте функцию createThrottle, которая реализует throttle
function createThrottle(func, interval) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= interval) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// 7.5. Создайте функцию testDebounce, которая тестирует debounce
function testDebounce() {
    const output = document.getElementById('async-output');
    output.textContent = 'Тестирование Debounce...\n';
    
    // Обычная функция
    const normalFunc = () => {
        output.textContent += 'Обычный вызов\n';
    };
    
    // Debounce версия
    const debouncedFunc = createDebounce(() => {
        output.textContent += 'Debounce вызов (после 500ms задержки)\n';
    }, 500);
    
    output.textContent += 'Быстрые клики:\n';
    
    // Симулируем быстрые клики
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            normalFunc();
            debouncedFunc();
        }, i * 100);
    }
}

// 7.6. Создайте функцию testThrottle, которая тестирует throttle
function testThrottle() {
    const output = document.getElementById('async-output');
    output.textContent = 'Тестирование Throttle...\n';
    
    // Обычная функция
    let normalCount = 0;
    const normalFunc = () => {
        normalCount++;
        output.textContent += `Обычный вызов: ${normalCount}\n`;
    };
    
    // Throttle версия
    let throttleCount = 0;
    const throttledFunc = createThrottle(() => {
        throttleCount++;
        output.textContent += `Throttle вызов: ${throttleCount}\n`;
    }, 1000);
    
    output.textContent += 'Быстрые клики (каждые 200ms):\n';
    
    // Симулируем быстрые клики
    let clickCount = 0;
    const interval = setInterval(() => {
        normalFunc();
        throttledFunc();
        clickCount++;
        
        if (clickCount >= 10) {
            clearInterval(interval);
            output.textContent += `\nИтог: обычных вызовов ${normalCount}, throttle вызовов ${throttleCount}\n`;
        }
    }, 200);
}

// 7.7. Создайте функцию setupTimerEvents, которая настраивает таймеры
function setupTimerEvents() {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const debounceBtn = document.getElementById('debounce-btn');
    const throttleBtn = document.getElementById('throttle-btn');
    
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    debounceBtn.addEventListener('click', testDebounce);
    throttleBtn.addEventListener('click', testThrottle);
}

// Инициализация всех обработчиков при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
    
    console.log('✅ Все обработчики событий инициализированы!');
    
    // Первоначальное обновление информации о выбранных элементах
    updateSelectedItemsInfo();
});