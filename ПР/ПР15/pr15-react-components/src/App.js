// src/App.js (полная версия)
import React from 'react';
import './App.css';
import BasicComponents from './components/basic/BasicComponents';
import StatefulComponents from './components/stateful/StatefulComponents';
import LifecycleComponents from './components/lifecycle/LifecycleComponents';
import HooksComponents from './components/hooks/HooksComponents';
import ComponentTests from './components/ComponentTests';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Практическая работа №15: React компоненты</h1>
        <p>Освоение создания функциональных и классовых компонентов</p>
      </header>
      
      <main className="main-content">
        <nav className="navigation">
          <a href="#basic">Базовые</a>
          <a href="#stateful">Состояние</a>
          <a href="#lifecycle">Жизненный цикл</a>
          <a href="#hooks">Hooks</a>
          <a href="#tests">Тестирование</a>
        </nav>
        
        <section id="basic">
          <h2>📦 Базовые компоненты</h2>
          <BasicComponents />
        </section>
        
        <section id="stateful">
          <h2>🎯 Компоненты с состоянием</h2>
          <StatefulComponents />
        </section>
        
        <section id="lifecycle">
          <h2>🔄 Жизненный цикл</h2>
          <LifecycleComponents />
        </section>
        
        <section id="hooks">
          <h2>⚛️ React Hooks</h2>
          <HooksComponents />
        </section>
        
        <section id="tests">
          <h2>🧪 Тестирование компонентов</h2>
          <ComponentTests />
        </section>
      </main>
      
      <footer className="App-footer">
        <p>Практическая работа выполнена с использованием React</p>
      </footer>
    </div>
  );
}

export default App;