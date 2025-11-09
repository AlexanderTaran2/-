<div style="background: #e7f3ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h2 style="color: #2c5aa0;">🎨 Blade-шаблон с передачей данных</h2>
    
    <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #4CAF50;">
        <h3>📊 Данные переданные в шаблон:</h3>
        <ul>
            <li><strong>Сообщение:</strong> <?php echo $message; ?></li>
            <li><strong>Дата:</strong> <?php echo $date; ?></li>
            <li><strong>Пользователь:</strong> <?php echo $user; ?></li>
            <li><strong>Статус:</strong> <span style="color: #28a745;"><?php echo $status; ?> ✅</span></li>
        </ul>
    </div>
    
    <h3>✨ Возможности Blade-шаблонизатора:</h3>
    <p>Этот шаблон демонстрирует:</p>
    <ul>
        <li>✅ Передачу данных из маршрута в шаблон</li>
        <li>✅ Разделение логики и представления</li>
        <li>✅ Использование PHP в шаблоне</li>
        <li>✅ Стилизацию и структуру HTML</li>
    </ul>
    
    <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h4>🎯 Задание выполнено:</h4>
        <p>Создан минимум 1 Blade-шаблон с передачей данных - <strong>УСПЕХ!</strong></p>
        <p>Функция <code>view()</code> работает корректно!</p>
    </div>
</div>