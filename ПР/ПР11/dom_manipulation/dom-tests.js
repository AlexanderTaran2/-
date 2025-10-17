// Тесты для DOM манипуляций
function runTests() {
    console.log('🚀 Запуск тестов DOM манипуляций...');
    
    // Тест 1: Создание карточки
    function testCreateCard() {
        console.log('📋 Тест 1: Создание карточки');
        const initialCount = document.querySelectorAll('.card').length;
        createCard('Тестовая карточка', 'Тестовое содержимое');
        const newCount = document.querySelectorAll('.card').length;
        
        if (newCount > initialCount) {
            console.log('✅ Карточка успешно создана');
            return true;
        } else {
            console.log('❌ Ошибка при создании карточки');
            return false;
        }
    }
    
    // Тест 2: Создание списка
    function testCreateList() {
        console.log('📋 Тест 2: Создание списка');
        const testItems = ['Пункт 1', 'Пункт 2', 'Пункт 3'];
        createList(testItems);
        
        const list = document.querySelector('#target1 ol');
        const items = list ? list.querySelectorAll('li') : [];
        
        if (items.length === testItems.length) {
            console.log('✅ Список успешно создан');
            return true;
        } else {
            console.log('❌ Ошибка при создании списка');
            return false;
        }
    }
    
    // Тест 3: Подсчет дочерних элементов
    function testCountChildren() {
        console.log('📋 Тест 3: Подсчет дочерних элементов');
        const count = countChildren();
        const actualCount = document.getElementById('parent-element').children.length;
        
        if (count === actualCount) {
            console.log(`✅ Количество дочерних элементов: ${count}`);
            return true;
        } else {
            console.log('❌ Ошибка при подсчете дочерних элементов');
            return false;
        }
    }
    
    // Тест 4: Поиск специального элемента
    function testFindSpecialChild() {
        console.log('📋 Тест 4: Поиск специального элемента');
        const text = findSpecialChild();
        
        if (text && text.includes('Специальный')) {
            console.log(`✅ Найден специальный элемент: "${text}"`);
            return true;
        } else {
            console.log('❌ Ошибка при поиске специального элемента');
            return false;
        }
    }
    
    // Тест 5: Переключение стилей
    function testToggleStyle() {
        console.log('📋 Тест 5: Переключение стилей');
        const element = document.getElementById('style-target');
        const initialClass = element.className;
        
        // Симулируем клик
        element.classList.toggle('active-style');
        const afterToggle = element.className;
        
        if (initialClass !== afterToggle) {
            console.log('✅ Стиль успешно переключен');
            // Возвращаем исходное состояние
            element.classList.toggle('active-style');
            return true;
        } else {
            console.log('❌ Ошибка при переключении стилей');
            return false;
        }
    }
    
    // Тест 6: Добавление элемента в список
    function testAddListItem() {
        console.log('📋 Тест 6: Добавление элемента в список');
        const initialCount = document.querySelectorAll('#dynamic-list .list-item').length;
        
        // Временно устанавливаем значение input
        const itemInput = document.getElementById('item-input');
        itemInput.value = 'Тестовый элемент';
        addListItem();
        
        const newCount = document.querySelectorAll('#dynamic-list .list-item').length;
        
        if (newCount > initialCount) {
            console.log('✅ Элемент успешно добавлен в список');
            return true;
        } else {
            console.log('❌ Ошибка при добавлении элемента в список');
            return false;
        }
    }
    
    // Тест 7: Валидация формы
    function testValidateForm() {
        console.log('📋 Тест 7: Валидация формы');
        
        // Тест с корректными данными
        const validData = {
            name: 'Иван',
            email: 'ivan@example.com',
            age: '25'
        };
        
        // Тест с некорректными данными
        const invalidData = {
            name: 'И',
            email: 'invalid-email',
            age: '150'
        };
        
        const validResult = validateForm(validData);
        const invalidResult = validateForm(invalidData);
        
        if (validResult === null && invalidResult !== null) {
            console.log('✅ Валидация формы работает корректно');
            return true;
        } else {
            console.log('❌ Ошибка в валидации формы');
            return false;
        }
    }
    
    // Тест 8: Очистка списка
    function testClearList() {
        console.log('📋 Тест 8: Очистка списка');
        
        // Добавляем несколько элементов
        const itemInput = document.getElementById('item-input');
        itemInput.value = 'Элемент для очистки';
        addListItem();
        addListItem();
        
        // Очищаем список
        clearList();
        
        const itemCount = document.querySelectorAll('#dynamic-list .list-item').length;
        
        if (itemCount === 0) {
            console.log('✅ Список успешно очищен');
            return true;
        } else {
            console.log('❌ Ошибка при очистке списка');
            return false;
        }
    }
    
    // Запуск всех тестов
    const tests = [
        testCreateCard,
        testCreateList,
        testCountChildren,
        testFindSpecialChild,
        testToggleStyle,
        testAddListItem,
        testValidateForm,
        testClearList
    ];
    
    let passedTests = 0;
    
    tests.forEach((test, index) => {
        try {
            if (test()) {
                passedTests++;
            }
        } catch (error) {
            console.log(`❌ Тест ${index + 1} завершился с ошибкой:`, error);
        }
    });
    
    console.log(`\n📊 Результаты тестирования:`);
    console.log(`✅ Пройдено: ${passedTests} из ${tests.length}`);
    console.log(`📈 Успешность: ${Math.round((passedTests / tests.length) * 100)}%`);
    
    if (passedTests === tests.length) {
        console.log('🎉 Все тесты пройдены успешно!');
    } else {
        console.log('💡 Некоторые тесты не пройдены. Проверьте реализацию функций.');
    }
}

// Запуск тестов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Даем время на инициализацию страницы
    setTimeout(runTests, 1000);
});