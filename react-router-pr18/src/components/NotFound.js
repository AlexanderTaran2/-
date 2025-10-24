import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page">
      <div className="not-found">
        <h2>404 - Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <Link to="/" className="btn primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;