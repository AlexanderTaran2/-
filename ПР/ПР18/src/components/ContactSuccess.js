import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  return (
    <div className="page">
      <div className="success-message">
        <h2>Сообщение отправлено!</h2>
        <p>Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.</p>
        
        {formData && (
          <div className="submitted-data">
            <h3>Ваши данные:</h3>
            <p><strong>Имя:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Сообщение:</strong> {formData.message}</p>
          </div>
        )}
        
        <div className="success-actions">
          <button onClick={() => navigate('/')} className="btn primary">
            На главную
          </button>
          <Link to="/contact" className="btn secondary">
            Отправить еще одно сообщение
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;