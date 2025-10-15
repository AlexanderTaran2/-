// ===== ОСНОВНЫЕ ФУНКЦИИ =====

/**
 * Суммирует любое количество аргументов
 */
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

/**
 * Создает строку пользователя с деструктуризацией
 */
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

/**
 * Создает защищенное сообщение с замыканием
 */
function secretMessage(password, message) {
    return function(checkPassword) {
        return checkPassword === password ? message : "Доступ запрещен";
    };
}

// ===== РЕКУРСИЯ И ФУНКЦИИ ВЫСШЕГО ПОРЯДКА =====

/**
 * Создает композицию функций
 */
function compose(...functions) {
    return function(input) {
        return functions.reduceRight((result, fn) => fn(result), input);
    };
}

/**
 * Реализация Array.prototype.map
 */
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

/**
 * Реализация Array.prototype.filter
 */
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

/**
 * Реализация Array.prototype.reduce
 */
function myReduce(array, callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : array[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

// ===== СЛОЖНЫЕ ФУНКЦИИ =====

/**
 * Каррирование функции
 */
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}

/**
 * Мемоизация функции
 */
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

/**
 * Дебаунсинг функции
 */
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Троттлинг функции
 */
function throttle(fn, interval) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            return fn.apply(this, args);
        }
    };
}

/**
 * Создание валидатора пароля
 */
function createValidator(options) {
    const { minLength = 8, requireNumbers = true, requireUppercase = true } = options;
    
    return function(password) {
        const errors = [];
        
        if (password.length < minLength) {
            errors.push(`Минимальная длина: ${minLength} символов`);
        }
        
        if (requireNumbers && !/\d/.test(password)) {
            errors.push("Должна содержать цифры");
        }
        
        if (requireUppercase && !/[A-ZА-Я]/.test(password)) {
            errors.push("Должна содержать заглавные буквы");
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ТЕСТОВ =====

// Функция для демонстрации каррирования
function multiplyThree(a, b, c) {
    return a * b * c;
}

// Функция для демонстрации мемоизации
function expensiveCalculation(n) {
    console.log(`Вычисление для ${n}...`);
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.random();
    }
    return result;
}