import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';
import NotFound from './components/NotFound';
import './styles.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>Магазин электроники</h1>
        <div className="nav-links">
          <a href="/" className="nav-link">Главная</a>
          <a href="/about" className="nav-link">О нас</a>
          <a href="/products" className="nav-link">Товары</a>
          <a href="/contact" className="nav-link">Контакты</a>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/success" element={<ContactSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;