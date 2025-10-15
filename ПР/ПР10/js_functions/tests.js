// ===== СИСТЕМА ТЕСТИРОВАНИЯ =====

function displayTestResult(testName, passed, expected = null, actual = null) {
    const results = document.getElementById('testResults');
    const div = document.createElement('div');
    div.className = `test-result ${passed ? 'pass' : 'fail'}`;
    
    let message = `${passed ? '✅' : '❌'} ${testName}`;
    if (!passed && expected !== null && actual !== null) {
        message += ` | Ожидалось: ${expected}, Получено: ${actual}`;
    }
    
    div.textContent = message;
    results.appendChild(div);
}

function clearTestResults() {
    document.getElementById('testResults').innerHTML = '';
}

// ===== ТЕСТЫ ОСНОВНЫХ ФУНКЦИЙ =====

function runBasicTests() {
    clearTestResults();
    
    // Тесты для sum
    displayTestResult('sum(1, 2, 3)', sum(1, 2, 3) === 6, 6, sum(1, 2, 3));
    displayTestResult('sum()', sum() === 0, 0, sum());
    displayTestResult('sum(10)', sum(10) === 10, 10, sum(10));
    
    // Тесты для createUser
    const user1 = createUser({ name: "Иван", age: 25 });
    const user2 = createUser({ name: "Мария", age: 30, email: "maria@test.ru" });
    
    displayTestResult('createUser без email', 
        user1 === "Пользователь: Иван, возраст: 25, email: не указан");
    displayTestResult('createUser с email', 
        user2 === "Пользователь: Мария, возраст: 30, email: maria@test.ru");
    
    // Тесты для secretMessage
    const secret = secretMessage("1234", "Секретное сообщение");
    displayTestResult('secretMessage верный пароль', 
        secret("1234") === "Секретное сообщение");
    displayTestResult('secretMessage неверный пароль', 
        secret("wrong") === "Доступ запрещен");
}

// ===== ТЕСТЫ ФУНКЦИЙ ВЫСШЕГО ПОРЯДКА =====

function runHofTests() {
    clearTestResults();
    
    // Тесты для compose
    const add5 = x => x + 5;
    const multiply3 = x => x * 3;
    const subtract2 = x => x - 2;
    
    const composed = compose(subtract2, multiply3, add5);
    displayTestResult('compose(10)', composed(10) === 43, 43, composed(10));
    
    // Тесты для myMap
    const numbers = [1, 2, 3];
    const doubled = myMap(numbers, x => x * 2);
    displayTestResult('myMap удвоение', 
        JSON.stringify(doubled) === JSON.stringify([2, 4, 6]));
    
    // Тесты для myFilter
    const filtered = myFilter(numbers, x => x > 1);
    displayTestResult('myFilter > 1', 
        JSON.stringify(filtered) === JSON.stringify([2, 3]));
    
    // Тесты для myReduce
    const sumReduce = myReduce(numbers, (acc, val) => acc + val, 0);
    displayTestResult('myReduce сумма', sumReduce === 6, 6, sumReduce);
}

// ===== ТЕСТЫ СЛОЖНЫХ ФУНКЦИЙ =====

function runAdvancedTests() {
    clearTestResults();
    
    // Тесты для каррирования
    const curriedMultiply = curry(multiplyThree);
    const step1 = curriedMultiply(2);
    const step2 = step1(3);
    const result = step2(4);
    
    displayTestResult('curry умножение', result === 24, 24, result);
    displayTestResult('curry прямое использование', 
        curriedMultiply(2)(3)(4) === 24);
    
    // Тесты для мемоизации
    const memoizedCalc = memoize(expensiveCalculation);
    const firstCall = memoizedCalc(5);
    const secondCall = memoizedCalc(5); // Должен взять из кэша
    
    displayTestResult('memoize кэширование', firstCall === secondCall);
    
    // Тесты для дебаунсинга (имитация)
    let callCount = 0;
    const debouncedFn = debounce(() => callCount++, 100);
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    displayTestResult('debounce создан', typeof debouncedFn === 'function');
    
    // Тесты для троттлинга (имитация)
    const throttledFn = throttle(() => {}, 100);
    displayTestResult('throttle создан', typeof throttledFn === 'function');
    
    // Тесты для валидатора
    const validator = createValidator({ minLength: 6, requireNumbers: true, requireUppercase: true });
    const weakResult = validator("weak");
    const strongResult = validator("Strong123");
    
    displayTestResult('validator слабый пароль', weakResult.isValid === false);
    displayTestResult('validator сильный пароль', strongResult.isValid === true);
    displayTestResult('validator ошибки длины', 
        weakResult.errors.includes("Минимальная длина: 6 символов"));
}

// ===== ЗАПУСК ВСЕХ ТЕСТОВ =====

function runAllTests() {
    clearTestResults();
    runBasicTests();
    runHofTests();
    runAdvancedTests();
}