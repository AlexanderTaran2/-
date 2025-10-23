import React, { useState, useEffect } from 'react';

const BasicHooks = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect без зависимостей - componentDidMount
  useEffect(() => {
    console.log('Компонент смонтирован');
    
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []);

  // useEffect с зависимостями - componentDidUpdate
  useEffect(() => {
    document.title = `Счетчик: ${count}`;
    console.log(`Count обновлен: ${count}`);
  }, [count]);

  // useEffect для обработки событий
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="component">
      <h2>🔄 Базовые хуки</h2>
      
      <div className="section">
        <h3>useState - Счетчик</h3>
        <p>Текущее значение: <strong>{count}</strong></p>
        <div className="button-group">
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(count - 1)}>-1</button>
          <button onClick={() => setCount(0)}>Сброс</button>
        </div>
      </div>

      <div className="section">
        <h3>useState - Форма</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите ваше имя"
          className="input"
        />
        <p>Привет, <strong>{name || 'незнакомец'}</strong>! 👋</p>
      </div>

      <div className="section">
        <h3>useEffect - Состояние сети</h3>
        <p>Статус подключения: 
          <span style={{ color: isOnline ? 'green' : 'red', fontWeight: 'bold' }}>
            {isOnline ? ' Online ✅' : ' Offline ❌'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BasicHooks;