import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = {
    1: { name: 'Смартфон iPhone 14', price: 79990, description: 'Новейший смартфон от Apple с улучшенной камерой' },
    2: { name: 'Ноутбук MacBook Pro', price: 129990, description: 'Мощный ноутбук для профессиональной работы' },
    3: { name: 'Наушники AirPods', price: 15990, description: 'Беспроводные наушники с премиальным звуком' },
    4: { name: 'Планшет iPad Air', price: 49990, description: 'Универсальный планшет для работы и творчества' }
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="page">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/products')} className="btn primary">
          Вернуться к товарам
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="btn secondary">
        Назад
      </button>
      <div className="product-detail">
        <h2>{product.name}</h2>
        <p className="price">{product.price} ₽</p>
        <p className="description">{product.description}</p>
        <p><strong>ID товара:</strong> {id}</p>
        <button onClick={() => navigate('/contact')} className="btn primary">
          Заказать
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;