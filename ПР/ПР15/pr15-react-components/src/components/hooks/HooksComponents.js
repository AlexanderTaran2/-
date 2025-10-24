// src/components/hooks/HooksComponents.js
import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';
import mockApi from '../../api/mockApi';

// 6.1. Функциональный компонент CounterWithHooks
const CounterWithHooks = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-hooks">
      <h3>Счетчик с Hooks: {count}</h3>
      <div className="counter-buttons">
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Сброс</button>
        <button onClick={increment}>+1</button>
      </div>
    </div>
  );
};

// 6.2. Компонент UserProfile с использованием useState
const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Профиль сохранен!');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="user-profile">
      <h3>Профиль пользователя</h3>
      
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Введите имя"
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Введите email"
            />
          </div>
          
          <div className="form-group">
            <label>Возраст:</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleInputChange}
              placeholder="Введите возраст"
            />
          </div>
          
          <div className="form-group">
            <label>О себе:</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              placeholder="Расскажите о себе"
              rows="3"
            />
          </div>
          
          <button onClick={handleSave}>Сохранить</button>
        </div>
      ) : (
        <div className="profile-view">
          <div className="profile-info">
            <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
            <p><strong>Email:</strong> {user.email || 'Не указано'}</p>
            <p><strong>Возраст:</strong> {user.age || 'Не указано'}</p>
            <p><strong>О себе:</strong> {user.bio || 'Не указано'}</p>
          </div>
          <button onClick={handleEdit}>Редактировать</button>
        </div>
      )}
    </div>
  );
};

// 6.3. Компонент EffectDemo с использованием useEffect
const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect без зависимостей (componentDidMount + componentDidUpdate)
  useEffect(() => {
    console.log('EffectDemo component mounted or updated');
  });

  // useEffect с пустым массивом зависимостей (только componentDidMount)
  useEffect(() => {
    console.log('EffectDemo component mounted (only once)');
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function (componentWillUnmount)
    return () => {
      console.log('EffectDemo cleanup');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect с зависимостями (componentDidUpdate для конкретных значений)
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log(`Name changed to: ${name}`);
  }, [name]);

  return (
    <div className="effect-demo">
      <h3>Демонстрация useEffect</h3>
      
      <div className="demo-section">
        <h4>Счетчик: {count}</h4>
        <button onClick={() => setCount(count + 1)}>
          Увеличить счетчик
        </button>
        <p>Заголовок страницы обновляется при изменении счетчика</p>
      </div>
      
      <div className="demo-section">
        <h4>Имя: {name || 'Не указано'}</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
        <p>Консоль логируется при изменении имени</p>
      </div>
      
      <div className="demo-section">
        <h4>Ширина окна: {windowWidth}px</h4>
        <p>Ширина обновляется при изменении размера окна</p>
      </div>
      
      <div className="console-info">
        <p><strong>Откройте консоль для просмотра логов useEffect</strong></p>
      </div>
    </div>
  );
};

// 7.1. Кастомный хук useLocalStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Компонент использующий useLocalStorage
const LocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="local-storage-demo">
      <h3>useLocalStorage Demo</h3>
      
      <div className="form-group">
        <label>Имя (сохраняется в localStorage):</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
        <p>Текущее имя: {name || 'Не указано'}</p>
      </div>
      
      <div className="form-group">
        <label>Тема:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
          <option value="blue">Синяя</option>
        </select>
        <p>Выбранная тема: {theme}</p>
      </div>
      
      <button onClick={() => {
        setName('');
        setTheme('light');
      }}>
        Сбросить настройки
      </button>
    </div>
  );
};

// 7.2. Кастомный хук useFetch
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Имитация API запроса
        await mockApi.delay(1000);
        const todos = await mockApi.getTodos();
        setData(todos);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Компонент использующий useFetch
const FetchDemo = () => {
  const { data, loading, error } = useFetch('/api/todos');

  return (
    <div className="fetch-demo">
      <h3>useFetch Demo - Список задач</h3>
      
      {loading && <div className="loading">Загрузка задач...</div>}
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      
      {data && !loading && (
        <ul className="todos-list">
          {data.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 7.3. Создание Context для темы
const ThemeContext = createContext();

// Провайдер темы
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Компонент использующий useContext
const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

  return (
    <div className={`theme-toggle ${theme}`}>
      <h3>Theme Toggle (useContext)</h3>
      <p>Текущая тема: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Переключить на {isDark ? 'светлую' : 'темную'} тему
      </button>
      <div className="theme-preview">
        <p>Это пример текста в {theme} теме</p>
      </div>
    </div>
  );
};

// Основной компонент для демонстрации
const HooksComponents = () => {
  return (
    <ThemeProvider>
      <div className="hooks-components">
        <div className="component-demo">
          <CounterWithHooks />
        </div>
        
        <div className="component-demo">
          <UserProfile />
        </div>
        
        <div className="component-demo">
          <EffectDemo />
        </div>
        
        <div className="component-demo">
          <LocalStorageDemo />
        </div>
        
        <div className="component-demo">
          <FetchDemo />
        </div>
        
        <div className="component-demo">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HooksComponents;