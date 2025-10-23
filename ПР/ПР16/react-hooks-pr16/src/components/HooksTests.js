import React from 'react';
import BasicHooks from './BasicHooks';
import AdvancedHooks from './AdvancedHooks';
import CustomHooks from './CustomHooks';

const HooksTests = () => {
  return (
    <div className="tests-container">
      <h1>🧪 Тестирование React Hooks</h1>
      <p className="subtitle">Практическая работа №16 - Изучение хуков React</p>
      
      <BasicHooks />
      <AdvancedHooks />
      <CustomHooks />
    </div>
  );
};

export default HooksTests;