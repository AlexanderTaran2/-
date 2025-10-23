import React, { useRef } from 'react';
import './UserRegistrationForm.css';

const ContactFormUncontrolled = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
      category: categoryRef.current.value
    };

    console.log('Данные формы (неуправляемая):', formData);
    alert('Форма обратной связи отправлена! Проверьте консоль.');

    // Сброс формы
    e.target.reset();
  };

  return (
    <div className="form-container">
      <h2>Форма обратной связи (неуправляемая)</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <select id="category" ref={categoryRef}>
            <option value="general">Общий вопрос</option>
            <option value="technical">Техническая поддержка</option>
            <option value="billing">Биллинг</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            ref={messageRef}
            rows="4"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Отправить сообщение
        </button>
      </form>
    </div>
  );
};

export default ContactFormUncontrolled;