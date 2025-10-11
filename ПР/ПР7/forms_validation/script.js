document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');
    
    // Объект с функциями валидации для каждого поля
    const validators = {
        firstName: validateFirstName,
        lastName: validateLastName,
        email: validateEmail,
        phone: validatePhone,
        username: validateUsername,
        password: validatePassword,
        confirmPassword: validateConfirmPassword,
        birthDate: validateBirthDate,
        terms: validateTerms
    };
    
    // Добавляем обработчики событий для всех полей ввода
    inputs.forEach(input => {
        // Валидация при потере фокуса
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Валидация при вводе (для некоторых полей)
        if (input.type !== 'checkbox' && input.type !== 'select-one') {
            input.addEventListener('input', function() {
                // Для подтверждения пароля проверяем оба поля
                if (this.id === 'password' || this.id === 'confirmPassword') {
                    validateField(document.getElementById('password'));
                    validateField(document.getElementById('confirmPassword'));
                } else {
                    validateField(this);
                }
            });
        }
        
        // Для чекбоксов
        if (input.type === 'checkbox') {
            input.addEventListener('change', function() {
                validateField(this);
            });
        }
    });
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Валидируем все поля
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            alert('Форма успешно отправлена!');
            // Здесь обычно отправка данных на сервер
            // form.submit();
        } else {
            alert('Пожалуйста, исправьте ошибки в форме.');
        }
    });
    
    // Функция валидации отдельного поля
    function validateField(field) {
        const fieldName = field.name;
        const validator = validators[fieldName];
        
        if (validator) {
            return validator(field);
        }
        
        return true;
    }
    
    // Функции валидации для каждого поля
    
    function validateFirstName(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('firstNameError');
        
        if (!value) {
            showError(field, errorElement, 'Имя обязательно для заполнения');
            return false;
        }
        
        if (value.length < 2) {
            showError(field, errorElement, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateLastName(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('lastNameError');
        
        if (!value) {
            showError(field, errorElement, 'Фамилия обязательна для заполнения');
            return false;
        }
        
        if (value.length < 2) {
            showError(field, errorElement, 'Фамилия должна содержать минимум 2 символа');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateEmail(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            showError(field, errorElement, 'Email обязателен для заполнения');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(field, errorElement, 'Введите корректный email адрес');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validatePhone(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('phoneError');
        
        // Если поле не заполнено, оно валидно (не обязательное)
        if (!value) {
            hideError(field, errorElement);
            return true;
        }
        
        // Простая проверка формата телефона
        const phoneRegex = /^[\+]\d{1,3}\s?[\(]?\d{1,4}[\)]?\s?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
        
        if (!phoneRegex.test(value)) {
            showError(field, errorElement, 'Введите телефон в формате +7 (999) 999-99-99');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateUsername(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById('usernameError');
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        
        if (!value) {
            showError(field, errorElement, 'Имя пользователя обязательно для заполнения');
            return false;
        }
        
        if (value.length < 3) {
            showError(field, errorElement, 'Имя пользователя должно содержать минимум 3 символа');
            return false;
        }
        
        if (value.length > 20) {
            showError(field, errorElement, 'Имя пользователя должно содержать не более 20 символов');
            return false;
        }
        
        if (!usernameRegex.test(value)) {
            showError(field, errorElement, 'Имя пользователя может содержать только латинские буквы, цифры и символ подчеркивания');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validatePassword(field) {
        const value = field.value;
        const errorElement = document.getElementById('passwordError');
        
        if (!value) {
            showError(field, errorElement, 'Пароль обязателен для заполнения');
            return false;
        }
        
        if (value.length < 8) {
            showError(field, errorElement, 'Пароль должен содержать минимум 8 символов');
            return false;
        }
        
        // Проверка сложности пароля
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
        
        if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
            showError(field, errorElement, 'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateConfirmPassword(field) {
        const value = field.value;
        const passwordValue = document.getElementById('password').value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (!value) {
            showError(field, errorElement, 'Подтверждение пароля обязательно');
            return false;
        }
        
        if (value !== passwordValue) {
            showError(field, errorElement, 'Пароли не совпадают');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateBirthDate(field) {
        const value = field.value;
        const errorElement = document.getElementById('birthDateError');
        
        // Если поле не заполнено, оно валидно (не обязательное)
        if (!value) {
            hideError(field, errorElement);
            return true;
        }
        
        const birthDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120); // Максимальный возраст 120 лет
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 13); // Минимальный возраст 13 лет
        
        if (birthDate < minDate) {
            showError(field, errorElement, 'Дата рождения не может быть раньше ' + formatDate(minDate));
            return false;
        }
        
        if (birthDate > maxDate) {
            showError(field, errorElement, 'Вам должно быть не менее 13 лет для регистрации');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    function validateTerms(field) {
        const isChecked = field.checked;
        const errorElement = document.getElementById('termsError');
        
        if (!isChecked) {
            showError(field, errorElement, 'Необходимо принять условия использования');
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }
    
    // Вспомогательные функции
    
    function showError(field, errorElement, message) {
        field.style.borderColor = '#dc3545';
        errorElement.textContent = message;
        errorElement.setAttribute('aria-live', 'polite');
    }
    
    function hideError(field, errorElement) {
        field.style.borderColor = '';
        errorElement.textContent = '';
    }
    
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
});