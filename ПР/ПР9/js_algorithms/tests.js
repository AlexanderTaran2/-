// ===== ТЕСТИРОВАНИЕ АЛГОРИТМОВ =====

function runAllTests() {
    const results = document.getElementById('testResults');
    results.innerHTML = '';
    
    testIsPrime();
    testFactorial();
    testFibonacci();
    testGCD();
    testPalindrome();
    testCountVowels();
    testReverseString();
    testFindLongestWord();
    testFindMax();
    testRemoveDuplicates();
    testBubbleSort();
    testBinarySearch();
    testFormatCurrency();
    testValidEmail();
    testGeneratePassword();
}

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

// Тесты для работы с числами
function testIsPrime() {
    const tests = [
        { input: 2, expected: true },
        { input: 3, expected: true },
        { input: 4, expected: false },
        { input: 17, expected: true },
        { input: 1, expected: false },
        { input: 0, expected: false }
    ];
    
    tests.forEach(test => {
        const result = isPrime(test.input);
        displayTestResult(
            `isPrime(${test.input})`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testFactorial() {
    const tests = [
        { input: 0, expected: 1 },
        { input: 1, expected: 1 },
        { input: 5, expected: 120 },
        { input: 7, expected: 5040 }
    ];
    
    tests.forEach(test => {
        const result = factorial(test.input);
        displayTestResult(
            `factorial(${test.input})`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testFibonacci() {
    const tests = [
        { input: 0, expected: [] },
        { input: 1, expected: [0] },
        { input: 5, expected: [0, 1, 1, 2, 3] },
        { input: 7, expected: [0, 1, 1, 2, 3, 5, 8] }
    ];
    
    tests.forEach(test => {
        const result = fibonacci(test.input);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        displayTestResult(
            `fibonacci(${test.input})`, 
            passed,
            JSON.stringify(test.expected),
            JSON.stringify(result)
        );
    });
}

function testGCD() {
    const tests = [
        { input: [48, 18], expected: 6 },
        { input: [17, 13], expected: 1 },
        { input: [100, 25], expected: 25 },
        { input: [0, 5], expected: 5 }
    ];
    
    tests.forEach(test => {
        const result = gcd(...test.input);
        displayTestResult(
            `gcd(${test.input.join(', ')})`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

// Тесты для работы со строками
function testPalindrome() {
    const tests = [
        { input: "А роза упала на лапу Азора", expected: true },
        { input: "racecar", expected: true },
        { input: "hello", expected: false },
        { input: "12321", expected: true }
    ];
    
    tests.forEach(test => {
        const result = isPalindrome(test.input);
        displayTestResult(
            `isPalindrome("${test.input}")`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testCountVowels() {
    const tests = [
        { input: "Hello World", expected: 3 },
        { input: "Абракадабра", expected: 5 },
        { input: "BCDFG", expected: 0 },
        { input: "aeiou", expected: 5 }
    ];
    
    tests.forEach(test => {
        const result = countVowels(test.input);
        displayTestResult(
            `countVowels("${test.input}")`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testReverseString() {
    const tests = [
        { input: "hello", expected: "olleh" },
        { input: "12345", expected: "54321" },
        { input: "a", expected: "a" },
        { input: "", expected: "" }
    ];
    
    tests.forEach(test => {
        const result = reverseString(test.input);
        displayTestResult(
            `reverseString("${test.input}")`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testFindLongestWord() {
    const tests = [
        { input: "The quick brown fox jumps", expected: "quick" },
        { input: "Съешь ещё этих мягких французских булок", expected: "французских" },
        { input: "Hello", expected: "Hello" }
    ];
    
    tests.forEach(test => {
        const result = findLongestWord(test.input);
        displayTestResult(
            `findLongestWord("${test.input}")`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

// Тесты для работы с массивами
function testFindMax() {
    const tests = [
        { input: [1, 5, 3, 9, 2], expected: 9 },
        { input: [-1, -5, -3], expected: -1 },
        { input: [42], expected: 42 }
    ];
    
    tests.forEach(test => {
        const result = findMax(test.input);
        displayTestResult(
            `findMax([${test.input}])`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testRemoveDuplicates() {
    const tests = [
        { input: [1, 2, 2, 3, 4, 4, 5], expected: [1, 2, 3, 4, 5] },
        { input: [1, 1, 1], expected: [1] },
        { input: [], expected: [] }
    ];
    
    tests.forEach(test => {
        const result = removeDuplicates(test.input);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        displayTestResult(
            `removeDuplicates([${test.input}])`, 
            passed,
            JSON.stringify(test.expected),
            JSON.stringify(result)
        );
    });
}

function testBubbleSort() {
    const tests = [
        { input: [5, 3, 8, 1, 2], expected: [1, 2, 3, 5, 8] },
        { input: [1], expected: [1] },
        { input: [], expected: [] },
        { input: [9, 7, 5, 3, 1], expected: [1, 3, 5, 7, 9] }
    ];
    
    tests.forEach(test => {
        const result = bubbleSort(test.input);
        const passed = JSON.stringify(result) === JSON.stringify(test.expected);
        displayTestResult(
            `bubbleSort([${test.input}])`, 
            passed,
            JSON.stringify(test.expected),
            JSON.stringify(result)
        );
    });
}

function testBinarySearch() {
    const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
    const tests = [
        { input: [sortedArray, 7], expected: 3 },
        { input: [sortedArray, 1], expected: 0 },
        { input: [sortedArray, 15], expected: 7 },
        { input: [sortedArray, 8], expected: -1 }
    ];
    
    tests.forEach(test => {
        const result = binarySearch(...test.input);
        displayTestResult(
            `binarySearch([${test.input[0]}], ${test.input[1]})`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

// Тесты утилитарных функций
function testFormatCurrency() {
    const tests = [
        { input: [1234.56, '₽'], expected: "1 234.56 ₽" },
        { input: [1000], expected: "1 000.00 ₽" },
        { input: [0.99], expected: "0.99 ₽" }
    ];
    
    tests.forEach(test => {
        const result = formatCurrency(...test.input);
        displayTestResult(
            `formatCurrency(${test.input.join(', ')})`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testValidEmail() {
    const tests = [
        { input: "test@example.com", expected: true },
        { input: "invalid.email", expected: false },
        { input: "another@test.co.uk", expected: true },
        { input: "", expected: false }
    ];
    
    tests.forEach(test => {
        const result = isValidEmail(test.input);
        displayTestResult(
            `isValidEmail("${test.input}")`, 
            result === test.expected,
            test.expected,
            result
        );
    });
}

function testGeneratePassword() {
    // Тестируем генерацию паролей разной длины
    const lengths = [8, 12, 16];
    
    lengths.forEach(length => {
        const password = generatePassword(length);
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
        
        const passed = password.length === length && hasLowercase && hasUppercase && hasNumbers && hasSymbols;
        
        displayTestResult(
            `generatePassword(${length}) - длина: ${password.length}, содержит все типы символов`, 
            passed
        );
    });
}