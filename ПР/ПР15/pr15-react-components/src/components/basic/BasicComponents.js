// src/components/basic/BasicComponents.js
import React from 'react';
import './BasicComponents.css';

// 1.1. Компонент WelcomeMessage
const WelcomeMessage = ({ name, age }) => {
  return (
    <div className="welcome-message">
      <h3>Добро пожаловать, {name}!</h3>
      <p>Вам {age} лет</p>
    </div>
  );
};

// 1.2. Компонент UserCard
const UserCard = ({ user }) => {
  return (
    <div className={`user-card ${user.isOnline ? 'online' : 'offline'}`}>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <div className="user-info">
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <span className="status">
          {user.isOnline ? '🟢 В сети' : '🔴 Не в сети'}
        </span>
      </div>
    </div>
  );
};

// 1.3. Компонент Button
const Button = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  const buttonClass = `button ${variant} ${size}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

// 2.1. Компонент Card
const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// 2.2. Компонент Toggle
const Toggle = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  return (
    <div className="toggle">
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </Button>
      {isVisible && (
        <div className="toggle-content">
          {children}
        </div>
      )}
    </div>
  );
};

// 2.3. Компонент ConditionalMessage
const ConditionalMessage = ({ status }) => {
  const messages = {
    success: { text: 'Операция выполнена успешно!', className: 'success' },
    error: { text: 'Произошла ошибка!', className: 'error' },
    warning: { text: 'Внимание! Требуется проверка.', className: 'warning' }
  };
  
  const message = messages[status] || { text: 'Неизвестный статус', className: 'default' };
  
  return (
    <div className={`message ${message.className}`}>
      {message.text}
    </div>
  );
};

// Основной компонент для демонстрации
const BasicComponents = () => {
  const testUser = {
    name: "Анна Петрова",
    email: "anna@example.com",
    avatar: "https://via.placeholder.com/150",
    isOnline: true
  };
  
  return (
    <div className="basic-components">
      <div className="component-demo">
        <h3>WelcomeMessage</h3>
        <WelcomeMessage name="Никитка Дубров" age={25} />
      </div>
      
      <div className="component-demo">
        <h3>UserCard</h3>
        <UserCard user={testUser} />
      </div>
      
      <div className="component-demo">
        <h3>Button</h3>
        <Button variant="primary" size="large">Основная кнопка</Button>
        <Button variant="secondary">Вторичная кнопка</Button>
        <Button size="small">Маленькая кнопка</Button>
      </div>
      
      <div className="component-demo">
        <h3>Card</h3>
        <Card title="Пример карточки">
          <p>Это содержимое карточки с детьми (children)</p>
          <Button>Кнопка внутри карточки</Button>
        </Card>
      </div>
      
      <div className="component-demo">
        <h3>Toggle</h3>
        <Toggle>
          <p>Это скрытое содержимое, которое можно показать или скрыть!</p>
          <UserCard user={testUser} />
        </Toggle>
      </div>
      
      <div className="component-demo">
        <h3>ConditionalMessage</h3>
        <ConditionalMessage status="success" />
        <ConditionalMessage status="error" />
        <ConditionalMessage status="warning" />
        <ConditionalMessage status="unknown" />
      </div>
    </div>
  );
};

export default BasicComponents;