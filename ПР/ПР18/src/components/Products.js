import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    { id: 1, name: 'Смартфон iPhone 14', price: 79990 },
    { id: 2, name: 'Ноутбук MacBook Pro', price: 129990 },
    { id: 3, name: 'Наушники AirPods', price: 15990 },
    { id: 4, name: 'Планшет iPad Air', price: 49990 }
  ];

  return (
    <div className="page">
      <h2>Наши товары</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">{product.price} ₽</p>
            <Link to={`/products/${product.id}`} className="btn primary">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;