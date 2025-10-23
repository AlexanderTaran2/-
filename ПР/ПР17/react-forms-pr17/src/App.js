import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Практическая работа №17: React формы</h1>
      </header>
      
      <main>
        <section>
          <UserRegistrationForm />
        </section>
        
        <section>
          <UserRegistrationFormWithValidation />
        </section>
        
        <section>
          <ContactFormUncontrolled />
        </section>
      </main>
    </div>
  );
}

export default App;