// ЗАДАНИЕ 1: Создание и вставка элементов

// 1.1. Создайте функцию createCard, которая создает карточку с заголовком и текстом
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const heading = document.createElement('h4');
    heading.textContent = title;
    
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    
    card.appendChild(heading);
    card.appendChild(paragraph);
    
    const target = document.getElementById('target1');
    target.appendChild(card);
}

// 1.2. Создайте функцию createList, которая создает нумерованный список
function createList(items) {
    const list = document.createElement('ol');
    
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    
    const target = document.getElementById('target1');
    target.appendChild(list);
}

// ЗАДАНИЕ 2: Навигация по DOM

// 2.1. Создайте функцию countChildren, которая возвращает количество дочерних элементов
function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent.children.length;
}

// 2.2. Создайте функцию findSpecialChild, которая находит элемент с классом "special"
function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    const specialChild = parent.querySelector('.special');
    return specialChild ? specialChild.textContent : null;
}

// 2.3. Создайте функцию getParentBackground, которая возвращает цвет фона родительского элемента
function getParentBackground() {
    const child = document.querySelector('.child');
    const parent = child.parentElement;
    return window.getComputedStyle(parent).backgroundColor;
}

// Вспомогательная функция для тестирования навигации
function testNavigation() {
    document.getElementById('child-count').textContent = countChildren();
    document.getElementById('special-text').textContent = findSpecialChild();
    document.getElementById('parent-bg').textContent = getParentBackground();
}

// ЗАДАНИЕ 3: Работа с классами и стилями

// 3.1. Создайте функцию toggleStyle, которая переключает класс "active-style"
function setupStyleToggle() {
    const toggleButton = document.getElementById('toggle-style');
    const styleTarget = document.getElementById('style-target');
    
    toggleButton.addEventListener('click', function() {
        styleTarget.classList.toggle('active-style');
    });
}

// 3.2. Создайте функцию changeHeaderColor, которая меняет цвет фона header
function changeHeaderColor() {
    const header = document.getElementById('main-header');
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    header.style.background = `linear-gradient(135deg, ${randomColor} 0%, #764ba2 100%)`;
}

// 3.3. Создайте функцию animateElement, которая добавляет анимацию
function animateElement() {
    const element = document.getElementById('style-target');
    
    element.classList.add('animated');
    
    // Удаляем класс анимации после завершения
    setTimeout(() => {
        element.classList.remove('animated');
    }, 1000);
}

// ЗАДАНИЕ 4: Обработка событий

// 4.1. Создайте функцию setupClickCounter, которая подсчитывает клики
function setupClickCounter() {
    let count = 0;
    const clickBtn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    clickBtn.addEventListener('click', function() {
        count++;
        counter.textContent = count;
    });
}

// 4.2. Создайте функцию setupInputDisplay, которая отображает введенный текст
function setupInputDisplay() {
    const textInput = document.getElementById('text-input');
    const inputDisplay = document.getElementById('input-display');
    
    textInput.addEventListener('input', function() {
        inputDisplay.textContent = this.value;
    });
}

// 4.3. Создайте функцию setupKeyboardEvents, которая обрабатывает нажатия клавиш
function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        console.log(`Key DOWN: KeyCode=${event.keyCode}, Key=${event.key}`);
    });
    
    document.addEventListener('keyup', function(event) {
        console.log(`Key UP: KeyCode=${event.keyCode}, Key=${event.key}`);
    });
}

// ЗАДАНИЕ 5: Динамические списки

// 5.1. Создайте функцию addListItem, которая добавляет новый элемент в список
function addListItem() {
    const itemInput = document.getElementById('item-input');
    const dynamicList = document.getElementById('dynamic-list');
    
    const itemText = itemInput.value.trim();
    
    if (itemText) {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = itemText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Удалить';
        deleteBtn.onclick = removeListItem;
        
        listItem.appendChild(textSpan);
        listItem.appendChild(deleteBtn);
        
        dynamicList.appendChild(listItem);
        
        // Очищаем input
        itemInput.value = '';
    }
}

// 5.2. Создайте функцию removeListItem, которая удаляет элемент списка
function removeListItem(event) {
    const listItem = event.target.closest('.list-item');
    if (listItem) {
        listItem.remove();
    }
}

// 5.3. Создайте функцию clearList, которая очищает весь список
function clearList() {
    const dynamicList = document.getElementById('dynamic-list');
    dynamicList.innerHTML = '';
}

// 5.4. Создайте функцию setupListEvents, которая настраивает все обработчики
function setupListEvents() {
    const addButton = document.getElementById('add-item-btn');
    const clearButton = document.getElementById('clear-list-btn');
    const itemInput = document.getElementById('item-input');
    
    addButton.addEventListener('click', addListItem);
    
    clearButton.addEventListener('click', clearList);
    
    // Добавление по Enter
    itemInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addListItem();
        }
    });
    
    // Делегирование событий для удаления
    const dynamicList = document.getElementById('dynamic-list');
    dynamicList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            removeListItem(event);
        }
    });
}

// ЗАДАНИЕ 6: Работа с формами

// 6.1. Создайте функцию validateForm, которая проверяет форму
function validateForm(formData) {
    const errors = {};
    
    // Проверка имени
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Введите корректный email адрес';
    }
    
    // Проверка возраста
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Возраст должен быть числом от 1 до 120';
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
}

// 6.2. Создайте функцию displayFormErrors, которая показывает ошибки валидации
function displayFormErrors(errors) {
    const formOutput = document.getElementById('form-output');
    formOutput.innerHTML = '';
    
    for (const field in errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errors[field];
        formOutput.appendChild(errorDiv);
    }
}

// 6.3. Создайте функцию displayFormSuccess, которая показывает успешное сообщение
function displayFormSuccess(userData) {
    const formOutput = document.getElementById('form-output');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    
    successDiv.innerHTML = `
        <h3>✅ Форма успешно отправлена!</h3>
        <p><strong>Имя:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Возраст:</strong> ${userData.age}</p>
    `;
    
    formOutput.innerHTML = '';
    formOutput.appendChild(successDiv);
}

// 6.4. Создайте функцию handleFormSubmit, которая обрабатывает отправку формы
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        age: form.age.value
    };
    
    const errors = validateForm(formData);
    
    if (errors) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(formData);
        form.reset();
    }
}

// 6.5. Создайте функцию setupForm, которая настраивает обработчик для формы
function setupForm() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);
}

// Инициализация всех обработчиков событий при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
    
    console.log('Все обработчики событий инициализированы!');
});