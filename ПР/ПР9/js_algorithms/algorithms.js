// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ЧИСЛАМИ =====

/**
 * Проверяет, является ли число простым
 * Сложность: O(√n)
 */
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

/**
 * Вычисляет факториал числа
 * Сложность: O(n)
 */
function factorial(n) {
    if (n < 0) throw new Error("Факториал отрицательного числа не определен");
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Возвращает массив первых n чисел Фибоначчи
 * Сложность: O(n)
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
}

/**
 * Находит наибольший общий делитель (НОД) двух чисел
 * Сложность: O(log(min(a,b)))
 */
function gcd(a, b) {
    // Алгоритм Евклида
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ =====

/**
 * Проверяет, является ли строка палиндромом
 * Сложность: O(n)
 */
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) return false;
        left++;
        right--;
    }
    return true;
}

/**
 * Считает количество гласных букв в строке
 * Сложность: O(n)
 */
function countVowels(str) {
    const vowels = 'aeiouаеёиоуыэюя';
    let count = 0;
    
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

/**
 * Переворачивает строку
 * Сложность: O(n)
 */
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

/**
 * Находит самое длинное слово в предложении
 * Сложность: O(n)
 */
function findLongestWord(sentence) {
    const words = sentence.split(/\s+/);
    let longestWord = '';
    
    for (let word of words) {
        const cleanWord = word.replace(/[^a-zа-яё]/gi, '');
        if (cleanWord.length > longestWord.length) {
            longestWord = cleanWord;
        }
    }
    return longestWord;
}

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С МАССИВАМИ =====

/**
 * Находит максимальный элемент в массиве
 * Сложность: O(n)
 */
function findMax(arr) {
    if (arr.length === 0) throw new Error("Массив пуст");
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

/**
 * Удаляет дубликаты из массива
 * Сложность: O(n)
 */
function removeDuplicates(arr) {
    const seen = new Set();
    const result = [];
    
    for (let item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    return result;
}

/**
 * Сортирует массив методом пузырьковой сортировки
 * Сложность: O(n²)
 */
function bubbleSort(arr) {
    const sortedArr = [...arr]; // Создаем копию
    let n = sortedArr.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (sortedArr[i] > sortedArr[i + 1]) {
                // Меняем элементы местами
                [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    
    return sortedArr;
}

/**
 * Бинарный поиск в отсортированном массиве
 * Сложность: O(log n)
 */
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (sortedArr[mid] === target) {
            return mid;
        } else if (sortedArr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// ===== УТИЛИТАРНЫЕ ФУНКЦИИ =====

/**
 * Форматирует денежную сумму
 * Сложность: O(1)
 */
function formatCurrency(amount, currency = '₽') {
    return `${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')} ${currency}`;
}

/**
 * Проверяет валидность email адреса
 * Сложность: O(1)
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Генерирует случайный пароль
 * Сложность: O(n)
 */
function generatePassword(length = 8) {
    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    const allChars = Object.values(charset).join('');
    let password = '';
    
    // Гарантируем наличие хотя бы одного символа из каждой категории
    password += charset.lowercase[Math.floor(Math.random() * charset.lowercase.length)];
    password += charset.uppercase[Math.floor(Math.random() * charset.uppercase.length)];
    password += charset.numbers[Math.floor(Math.random() * charset.numbers.length)];
    password += charset.symbols[Math.floor(Math.random() * charset.symbols.length)];
    
    // Заполняем оставшуюся длину
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Перемешиваем пароль
    return password.split('').sort(() => Math.random() - 0.5).join('');
}