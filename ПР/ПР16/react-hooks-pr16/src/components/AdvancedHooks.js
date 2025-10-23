import React, { useReducer, useContext, useCallback, useMemo, useRef, createContext } from 'react';

// Контекст для useContext
const ThemeContext = createContext();
const UserContext = createContext();

// Редуктор для useReducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_VALUE':
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

const AdvancedHooks = () => {
  // useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // useContext
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  // useRef
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const previousCount = useRef(state.count);
  
  renderCount.current++;

  // useCallback
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'INCREMENT' });
  }, []);

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'DECREMENT' });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const handleSetValue = useCallback((value) => {
    dispatch({ type: 'SET_VALUE', payload: value });
  }, []);

  // useMemo - дорогостоящие вычисления
  const expensiveCalculation = useMemo(() => {
    console.log('Выполняется дорогостоящее вычисление...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += state.count;
    }
    return result;
  }, [state.count]);

  // Фокус на input с useRef
  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  // Следим за предыдущим значением
  React.useEffect(() => {
    previousCount.current = state.count;
  }, [state.count]);

  return (
    <div className="component" style={{ 
      backgroundColor: theme === 'dark' ? '#2d3748' : '#f7fafc',
      color: theme === 'dark' ? 'white' : 'black',
      border: `2px solid ${theme === 'dark' ? '#4a5568' : '#cbd5e0'}`
    }}>
      <h2>⚡ Продвинутые хуки</h2>
      <p>Пользователь: <strong>{user}</strong></p>

      <div className="section">
        <h3>useReducer - Управление состоянием</h3>
        <p>Текущий счет: <strong>{state.count}</strong></p>
        <p>Предыдущий счет: <strong>{previousCount.current}</strong></p>
        <div className="button-group">
          <button onClick={handleIncrement}>+1</button>
          <button onClick={handleDecrement}>-1</button>
          <button onClick={handleReset}>Сброс</button>
          <button onClick={() => handleSetValue(100)}>Установить 100</button>
        </div>
      </div>

      <div className="section">
        <h3>useMemo - Оптимизация</h3>
        <p>Результат вычисления: <strong>{expensiveCalculation}</strong></p>
        <small>Вычисление выполняется только при изменении count</small>
      </div>

      <div className="section">
        <h3>useRef - Прямой доступ к DOM</h3>
        <p>Компонент отрендерен: <strong>{renderCount.current}</strong> раз</p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Нажмите кнопку для фокуса"
          className="input"
        />
        <button onClick={focusInput}>Фокус на input</button>
      </div>

      <div className="section">
        <h3>useCallback - Мемоизация функций</h3>
        <p>Функции не пересоздаются при каждом рендере</p>
        <small>Проверьте в React DevTools</small>
      </div>
    </div>
  );
};

// Обертка для предоставления контекста
const AdvancedHooksWrapper = () => (
  <ThemeContext.Provider value="dark">
    <UserContext.Provider value="Иван Иванов">
      <AdvancedHooks />
    </UserContext.Provider>
  </ThemeContext.Provider>
);

export default AdvancedHooksWrapper;