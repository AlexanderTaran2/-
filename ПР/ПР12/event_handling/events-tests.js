// Тесты для обработки событий
function runEventTests() {
    console.log('🚀 Запуск тестов обработки событий...');
    
    let testsPassed = 0;
    let totalTests = 0;
    
    function test(description, testFunc) {
        totalTests++;
        try {
            const result = testFunc();
            if (result && result.then) {
                // Асинхронный тест
                return result.then(() => {
                    console.log(`✅ ${description}`);
                    testsPassed++;
                }).catch(error => {
                    console.log(`❌ ${description}: ${error.message}`);
                });
            } else {
                // Синхронный тест
                console.log(`✅ ${description}`);
                testsPassed++;
            }
        } catch (error) {
            console.log(`❌ ${description}: ${error.message}`);
        }
    }
    
    // Тест 1: Базовые обработчики событий
    test('Базовые обработчики событий', () => {
        const button = document.getElementById('basic-btn');
        if (!button) throw new Error('Элемент basic-btn не найден');
        
        const event = new MouseEvent('click', {
            clientX: 100,
            clientY: 100,
            bubbles: true
        });
        
        button.dispatchEvent(event);
        
        const output = document.getElementById('basic-output');
        if (!output || !output.textContent) {
            throw new Error('Информация о событии не отображается');
        }
        return true;
    });
    
    // Тест 2: События мыши
    test('События мыши', () => {
        const colorBox = document.getElementById('color-box');
        if (!colorBox) throw new Error('Элемент color-box не найден');
        
        const enterEvent = new MouseEvent('mouseenter', {
            bubbles: true
        });
        
        colorBox.dispatchEvent(enterEvent);
        
        // Даем время на обработку
        return new Promise(resolve => {
            setTimeout(() => {
                const bgColor = colorBox.style.backgroundColor;
                if (!bgColor) {
                    throw new Error('Цвет фона не изменился при mouseenter');
                }
                resolve(true);
            }, 100);
        });
    });
    
    // Тест 3: Делегирование событий
    test('Делегирование событий', () => {
        const initialItems = document.querySelectorAll('.item').length;
        
        // Добавляем новый элемент
        addNewItem();
        
        return new Promise(resolve => {
            setTimeout(() => {
                const newItems = document.querySelectorAll('.item').length;
                if (newItems !== initialItems + 1) {
                    throw new Error('Новый элемент не добавлен');
                }
                resolve(true);
            }, 100);
        });
    });
    
    // Тест 4: Предотвращение поведения
    test('Предотвращение поведения', () => {
        const link = document.getElementById('prevent-link');
        if (!link) throw new Error('Элемент prevent-link не найден');
        
        const clickEvent = new MouseEvent('click', { 
            bubbles: true,
            cancelable: true
        });
        
        let defaultPrevented = false;
        const handler = (e) => {
            if (e.defaultPrevented) {
                defaultPrevented = true;
            }
        };
        
        link.addEventListener('click', handler);
        link.dispatchEvent(clickEvent);
        link.removeEventListener('click', handler);
        
        if (!defaultPrevented) {
            throw new Error('Стандартное поведение не предотвращено');
        }
        return true;
    });
    
    // Тест 5: Кастомные события
    test('Кастомные события', () => {
        let eventHandled = false;
        
        const handler = () => { eventHandled = true; };
        document.addEventListener('testEvent', handler);
        
        const testEvent = new CustomEvent('testEvent', {
            bubbles: true
        });
        document.dispatchEvent(testEvent);
        
        document.removeEventListener('testEvent', handler);
        
        if (!eventHandled) {
            throw new Error('Кастомное событие не обработано');
        }
        return true;
    });
    
    // Тест 6: Debounce функция
    test('Debounce функция', () => {
        return new Promise((resolve) => {
            let callCount = 0;
            const testFunc = () => callCount++;
            const debounced = createDebounce(testFunc, 100);
            
            // Быстрые вызовы
            debounced();
            debounced();
            debounced();
            
            setTimeout(() => {
                if (callCount !== 1) {
                    throw new Error('Debounce не работает правильно');
                }
                resolve(true);
            }, 200);
        });
    });
    
    // Тест 7: Throttle функция
    test('Throttle функция', () => {
        return new Promise((resolve) => {
            let callCount = 0;
            const testFunc = () => callCount++;
            const throttled = createThrottle(testFunc, 100);
            
            // Быстрые вызовы
            throttled();
            throttled();
            throttled();
            
            setTimeout(() => {
                if (callCount > 1) {
                    throw new Error('Throttle не работает правильно');
                }
                resolve(true);
            }, 50);
        });
    });
    
    // Тест 8: Таймер
    test('Таймер', () => {
        return new Promise((resolve) => {
            startTimer();
            
            setTimeout(() => {
                if (timerValue === 0) {
                    throw new Error('Таймер не запустился');
                }
                stopTimer();
                resolve(true);
            }, 1100);
        });
    });
    
    // Тест 9: Валидация формы
    test('Валидация формы', () => {
        const form = document.getElementById('prevent-form');
        if (!form) throw new Error('Форма prevent-form не найдена');
        
        const submitEvent = new Event('submit', { 
            bubbles: true,
            cancelable: true
        });
        
        let prevented = false;
        const handler = (e) => {
            if (e.defaultPrevented) {
                prevented = true;
            }
        };
        
        form.addEventListener('submit', handler);
        form.dispatchEvent(submitEvent);
        form.removeEventListener('submit', handler);
        
        if (!prevented) {
            throw new Error('Отправка формы не предотвращена');
        }
        return true;
    });
    
    // Тест 10: Обработка клавиатуры
    test('Обработка клавиатуры', () => {
        const input = document.getElementById('key-input');
        if (!input) throw new Error('Элемент key-input не найден');
        
        const keyEvent = new KeyboardEvent('keydown', {
            key: 's',
            ctrlKey: true,
            bubbles: true,
            cancelable: true
        });
        
        let prevented = false;
        const handler = (e) => {
            if (e.defaultPrevented) {
                prevented = true;
            }
        };
        
        input.addEventListener('keydown', handler);
        input.dispatchEvent(keyEvent);
        input.removeEventListener('keydown', handler);
        
        if (!prevented) {
            throw new Error('Комбинация Ctrl+S не предотвращена');
        }
        return true;
    });
    
    // Завершение тестов
    setTimeout(() => {
        console.log(`\n📊 Результаты тестирования:`);
        console.log(`✅ Пройдено: ${testsPassed} из ${totalTests}`);
        console.log(`📈 Успешность: ${Math.round((testsPassed / totalTests) * 100)}%`);
        
        if (testsPassed === totalTests) {
            console.log('🎉 Все тесты пройдены успешно!');
        } else {
            console.log('💡 Некоторые тесты не пройдены. Проверьте реализацию функций.');
        }
    }, 2000);
}

// Добавляем кнопку для запуска тестов вручную
function addTestButton() {
    const testButton = document.createElement('button');
    testButton.textContent = '🚀 Запустить тесты';
    testButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
    `;
    testButton.onclick = runEventTests;
    
    document.body.appendChild(testButton);
}

// Запускаем только добавление кнопки, без автоматических тестов
document.addEventListener('DOMContentLoaded', function() {
    addTestButton();
    console.log('✅ Приложение загружено. Для запуска тестов нажмите кнопку "🚀 Запустить тесты"');
});