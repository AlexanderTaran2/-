// src/components/ComponentTests.js
import React from 'react';
import './ComponentTests.css';

// Простые тестовые компоненты для демонстрации
const TestComponents = () => {
  return (
    <div className="component-tests">
      <h2>Тестирование компонентов</h2>
      
      <div className="test-section">
        <h3>1. Компонент с пропсами</h3>
        <TestComponentWithProps 
          title="Тестовый заголовок" 
          count={5} 
          isActive={true}
        />
      </div>

      <div className="test-section">
        <h3>2. Компонент с состоянием</h3>
        <TestComponentWithState />
      </div>

      <div className="test-section">
        <h3>3. Компонент с событиями</h3>
        <TestComponentWithEvents />
      </div>

      <div className="test-section">
        <h3>4. Компонент с условным рендерингом</h3>
        <TestConditionalRendering />
      </div>

      <div className="test-section">
        <h3>5. Компонент со списком</h3>
        <TestListComponent />
      </div>

      <div className="test-section">
        <h3>6. Форма с валидацией</h3>
        <TestFormComponent />
      </div>

      <div className="testing-info">
        <h4>Информация о тестировании</h4>
        <div className="info-grid">
          <div className="info-item">
            <h5>Jest</h5>
            <p>Фреймворк для unit-тестирования JavaScript кода</p>
          </div>
          <div className="info-item">
            <h5>React Testing Library</h5>
            <p>Библиотека для тестирования React компонентов</p>
          </div>
          <div className="info-item">
            <h5>User Event</h5>
            <p>Симуляция пользовательских событий в тестах</p>
          </div>
          <div className="info-item">
            <h5>Mock Functions</h5>
            <p>Создание mock-функций для тестирования</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Тестовый компонент с пропсами
const TestComponentWithProps = ({ title, count, isActive }) => {
  return (
    <div className={`test-props-component ${isActive ? 'active' : 'inactive'}`}>
      <h4>{title}</h4>
      <p>Количество: {count}</p>
      <p>Статус: {isActive ? 'Активен' : 'Неактивен'}</p>
    </div>
  );
};

// Тестовый компонент с состоянием
const TestComponentWithState = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div className="test-state-component">
      <p>Текущее значение: <strong>{value}</strong></p>
      <div className="button-group">
        <button onClick={() => setValue(prev => prev - 1)}>-1</button>
        <button onClick={() => setValue(0)}>Сброс</button>
        <button onClick={() => setValue(prev => prev + 1)}>+1</button>
      </div>
    </div>
  );
};

// Тестовый компонент с событиями
const TestComponentWithEvents = () => {
  const [clickCount, setClickCount] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Форма отправлена: ${inputValue}`);
    setInputValue('');
  };

  return (
    <div className="test-events-component">
      <div className="click-test">
        <p>Количество кликов: {clickCount}</p>
        <button onClick={handleClick}>Кликни меня!</button>
      </div>
      
      <form onSubmit={handleSubmit} className="form-test">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите текст..."
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

// Тестовый компонент с условным рендерингом
const TestConditionalRendering = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [userType, setUserType] = React.useState('guest');

  return (
    <div className="test-conditional-component">
      <div className="toggle-section">
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Скрыть' : 'Показать'} контент
        </button>
        {isVisible && (
          <div className="conditional-content">
            <p>Этот контент виден только когда isVisible = true</p>
          </div>
        )}
      </div>

      <div className="user-type-section">
        <label>
          Тип пользователя:
          <select 
            value={userType} 
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="guest">Гость</option>
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
        </label>
        
        <div className="user-content">
          {userType === 'guest' && <p>Добро пожаловать, гость!</p>}
          {userType === 'user' && <p>Приветствуем, пользователь!</p>}
          {userType === 'admin' && <p>Здравствуйте, администратор!</p>}
        </div>
      </div>
    </div>
  );
};

// Тестовый компонент со списком
const TestListComponent = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Элемент 1', completed: false },
    { id: 2, name: 'Элемент 2', completed: true },
    { id: 3, name: 'Элемент 3', completed: false }
  ]);
  const [newItemName, setNewItemName] = React.useState('');

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Date.now(),
        name: newItemName,
        completed: false
      };
      setItems([...items, newItem]);
      setNewItemName('');
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="test-list-component">
      <div className="add-item">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Новый элемент..."
        />
        <button onClick={addItem}>Добавить</button>
      </div>
      
      <ul className="items-list">
        {items.map(item => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <span onClick={() => toggleItem(item.id)}>
              {item.name}
            </span>
            <button onClick={() => removeItem(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      
      <div className="list-stats">
        <p>Всего: {items.length} | Выполнено: {items.filter(i => i.completed).length}</p>
      </div>
    </div>
  );
};

// Тестовый компонент формы с валидацией
const TestFormComponent = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Имя должно быть не менее 3 символов';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);
      setErrors({});
      // Сброс формы
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      setErrors(formErrors);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="test-form-component">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Подтверждение пароля:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>

      {isSubmitted && (
        <div className="success-message">
          ✅ Форма успешно отправлена!
        </div>
      )}
    </div>
  );
};

export default TestComponents;