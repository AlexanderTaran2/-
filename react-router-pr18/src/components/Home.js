import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page">
      <h2>Добро пожаловать в наш магазин!</h2>
      <p>Мы предлагаем лучшие электронные товары по доступным ценам.</p>
      <div className="home-links">
        <Link to="/products" className="btn primary">Смотреть товары</Link>
        <Link to="/about" className="btn secondary">Узнать о нас</Link>
      </div>
    </div>
  );
};

export default Home;