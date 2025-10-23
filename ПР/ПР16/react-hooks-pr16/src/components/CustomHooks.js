import React, { useState, useEffect, useCallback } from 'react';

// Кастомный хук для localStorage
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения из localStorage: ${error}`);
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Ошибка записи в localStorage: ${error}`);
    }
  }, [key]);

  return [value, setStoredValue];
};

// Кастомный хук для API запросов
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Кастомный хук для переключения состояния
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggle];
};

// Кастомный хук для отслеживания размера окна
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const CustomHooks = () => {
  // Использование кастомных хуков
  const [username, setUsername] = useLocalStorage('username', '');
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isVisible, toggleVisible] = useToggle(true);
  const windowSize = useWindowSize();
  
  const { data, loading, error } = useApi('https://jsonplaceholder.typicode.com/posts/1');

  return (
    <div className="component" style={{ 
      backgroundColor: isDarkMode ? '#1a202c' : 'white',
      color: isDarkMode ? 'white' : 'black'
    }}>
      <h2>🛠 Кастомные хуки</h2>

      <div className="section">
        <h3>useLocalStorage - Сохранение данных</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите имя пользователя"
          className="input"
        />
        <p>Сохраненное имя: <strong>{username}</strong></p>
        <button onClick={() => setUsername('')}>Очистить</button>
      </div>

      <div className="section">
        <h3>useToggle - Переключение состояния</h3>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
        </button>
        <br />
        <button onClick={toggleVisible}>
          {isVisible ? '👁 Скрыть' : '👁 Показать'} контент
        </button>
        {isVisible && (
          <div style={{ padding: '10px', margin: '10px 0', border: '1px dashed #ccc' }}>
            📝 Этот контент можно скрыть/показать!
          </div>
        )}
      </div>

      <div className="section">
        <h3>useWindowSize - Размер окна</h3>
        <p>Ширина окна: <strong>{windowSize.width}px</strong></p>
        <p>Высота окна: <strong>{windowSize.height}px</strong></p>
      </div>

      <div className="section">
        <h3>useApi - Запросы к API</h3>
        {loading && <p>⏳ Загрузка данных...</p>}
        {error && <p style={{ color: 'red' }}>❌ Ошибка: {error}</p>}
        {data && (
          <div style={{ textAlign: 'left', background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Title:</strong> {data.title}</p>
            <p><strong>Body:</strong> {data.body}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomHooks;