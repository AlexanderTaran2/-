// src/components/lifecycle/LifecycleComponents.js
import React, { Component } from 'react';
import './LifecycleComponents.css';
import mockApi from '../../api/mockApi';

// 5.1. Классовый компонент Timer
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isRunning: false
    };
    this.timerId = null;
  }

  componentDidMount() {
    console.log('Timer component mounted');
  }

  componentWillUnmount() {
    console.log('Timer component will unmount');
    this.stopTimer();
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerId = setInterval(() => {
        this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      this.setState({ isRunning: false });
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ seconds: 0 });
  };

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  render() {
    return (
      <div className="timer">
        <h3>Секундомер</h3>
        <div className="timer-display">
          {this.formatTime(this.state.seconds)}
        </div>
        <div className="timer-controls">
          {!this.state.isRunning ? (
            <button onClick={this.startTimer}>Старт</button>
          ) : (
            <button onClick={this.stopTimer}>Стоп</button>
          )}
          <button onClick={this.resetTimer}>Сброс</button>
        </div>
        <p>Статус: {this.state.isRunning ? 'Запущен' : 'Остановлен'}</p>
      </div>
    );
  }
}

// 5.2. Компонент WindowSizeTracker
class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    console.log('WindowSizeTracker component mounted');
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    console.log('WindowSizeTracker component will unmount');
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return (
      <div className="window-size-tracker">
        <h3>Размер окна браузера</h3>
        <div className="size-info">
          <p>Ширина: <strong>{this.state.width}px</strong></p>
          <p>Высота: <strong>{this.state.height}px</strong></p>
        </div>
        <div className="size-visual">
          <div 
            className="window-visual"
            style={{
              width: `${Math.min(this.state.width / 10, 200)}px`,
              height: `${Math.min(this.state.height / 10, 150)}px`
            }}
          />
        </div>
      </div>
    );
  }
}

// 5.3. Компонент DataFetcher
class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
      userId: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    
    try {
      await mockApi.delay(1000); // Имитация загрузки
      const user = await mockApi.getUser();
      this.setState({ data: user, loading: false });
    } catch (error) {
      this.setState({ 
        error: 'Ошибка загрузки данных', 
        loading: false 
      });
    }
  };

  changeUser = () => {
    this.setState(prevState => ({ 
      userId: prevState.userId === 1 ? 2 : 1 
    }));
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div className="data-fetcher">
        <h3>Загрузка данных пользователя</h3>
        <button onClick={this.changeUser} disabled={loading}>
          Сменить пользователя
        </button>
        
        {loading && <div className="loading">Загрузка...</div>}
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        
        {data && !loading && (
          <div className="user-data">
            <img src={data.avatar} alt={data.name} className="avatar" />
            <h4>{data.name}</h4>
            <p>{data.email}</p>
            <p>Статус: {data.isOnline ? '🟢 В сети' : '🔴 Не в сети'}</p>
          </div>
        )}
      </div>
    );
  }
}

// Основной компонент для демонстрации
class LifecycleComponents extends Component {
  render() {
    return (
      <div className="lifecycle-components">
        <div className="component-demo">
          <Timer />
        </div>
        
        <div className="component-demo">
          <WindowSizeTracker />
        </div>
        
        <div className="component-demo">
          <DataFetcher />
        </div>
      </div>
    );
  }
}

export default LifecycleComponents;