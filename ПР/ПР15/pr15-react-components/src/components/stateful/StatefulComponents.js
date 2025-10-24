// src/components/stateful/StatefulComponents.js
import React, { Component } from 'react';
import './StatefulComponents.css';

// 3.1. Классовый компонент Counter
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="counter">
        <h3>Счетчик: {this.state.count}</h3>
        <div className="counter-buttons">
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.reset}>Сброс</button>
          <button onClick={this.increment}>+1</button>
        </div>
      </div>
    );
  }
}

// 3.2. Классовый компонент LoginForm
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    return password.length >= 6;
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!this.state.email) {
      errors.email = 'Email обязателен';
    } else if (!this.validateEmail(this.state.email)) {
      errors.email = 'Некорректный email';
    }

    if (!this.state.password) {
      errors.password = 'Пароль обязателен';
    } else if (!this.validatePassword(this.state.password)) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      alert('Форма отправлена успешно!');
      this.setState({ email: '', password: '', errors: {} });
    }
  };

  render() {
    return (
      <div className="login-form">
        <h3>Форма входа</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              className={this.state.errors.email ? 'error' : ''}
            />
            {this.state.errors.email && (
              <span className="error-message">{this.state.errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className={this.state.errors.password ? 'error' : ''}
            />
            {this.state.errors.password && (
              <span className="error-message">{this.state.errors.password}</span>
            )}
          </div>

          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }
}

// 3.3. Классовый компонент ColorPicker
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: null,
      colors: [
        { id: 1, name: "Красный", value: "#ff0000" },
        { id: 2, name: "Зеленый", value: "#00ff00" },
        { id: 3, name: "Синий", value: "#0000ff" },
        { id: 4, name: "Желтый", value: "#ffff00" },
        { id: 5, name: "Фиолетовый", value: "#800080" }
      ]
    };
  }

  selectColor = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <div className="color-picker">
        <h3>Выбор цвета</h3>
        <div className="color-options">
          {this.state.colors.map(color => (
            <div
              key={color.id}
              className={`color-option ${this.state.selectedColor?.id === color.id ? 'selected' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => this.selectColor(color)}
              title={color.name}
            />
          ))}
        </div>
        {this.state.selectedColor && (
          <div className="selected-color">
            <p>Выбранный цвет: <strong>{this.state.selectedColor.name}</strong></p>
            <div 
              className="color-preview"
              style={{ backgroundColor: this.state.selectedColor.value }}
            />
          </div>
        )}
      </div>
    );
  }
}

// 4.1. Классовый компонент TodoList
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
  }

  addTodo = () => {
    if (this.state.newTodo.trim()) {
      const newTodo = {
        id: Date.now(),
        text: this.state.newTodo,
        completed: false
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
        newTodo: ''
      });
    }
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  };

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  };

  render() {
    return (
      <div className="todo-list">
        <h3>Список задач</h3>
        <div className="todo-input">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Введите новую задачу..."
          />
          <button onClick={this.addTodo}>Добавить</button>
        </div>
        <ul className="todos">
          {this.state.todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => this.toggleTodo(todo.id)}>
                {todo.text}
              </span>
              <button onClick={() => this.deleteTodo(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
        {this.state.todos.length === 0 && (
          <p className="no-todos">Задачи отсутствуют</p>
        )}
      </div>
    );
  }
}

// 4.2. Классовый компонент SearchBox
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      allItems: [
        "React компоненты",
        "JavaScript программирование",
        "HTML и CSS",
        "Веб разработка",
        "Node.js сервер",
        "Базы данных",
        "API интеграция",
        "Тестирование кода"
      ]
    };
  }

  handleSearch = (event) => {
    const query = event.target.value;
    this.setState({ query });

    if (query.trim()) {
      const results = this.state.allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ results });
    } else {
      this.setState({ results: [] });
    }
  };

  clearSearch = () => {
    this.setState({ query: '', results: [] });
  };

  render() {
    return (
      <div className="search-box">
        <h3>Поиск</h3>
        <div className="search-input">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleSearch}
            placeholder="Введите запрос..."
          />
          {this.state.query && (
            <button onClick={this.clearSearch}>×</button>
          )}
        </div>
        {this.state.results.length > 0 && (
          <ul className="search-results">
            {this.state.results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
        {this.state.query && this.state.results.length === 0 && (
          <p className="no-results">Ничего не найдено</p>
        )}
      </div>
    );
  }
}

// Основной компонент для демонстрации
class StatefulComponents extends Component {
  render() {
    return (
      <div className="stateful-components">
        <div className="component-demo">
          <Counter />
        </div>
        
        <div className="component-demo">
          <LoginForm />
        </div>
        
        <div className="component-demo">
          <ColorPicker />
        </div>
        
        <div className="component-demo">
          <TodoList />
        </div>
        
        <div className="component-demo">
          <SearchBox />
        </div>
      </div>
    );
  }
}

export default StatefulComponents;