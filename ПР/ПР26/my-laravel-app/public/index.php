<?php
// Упрощенный Laravel-подобный роутер
require_once '../routes/web.php';

// Получаем путь без параметров
$requestUri = $_SERVER['REQUEST_URI'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

echo "<!DOCTYPE html>
<html>
<head>
    <title>Мое Laravel-приложение</title>
    <style>
        body { font-family: Arial; margin: 40px; background: #f0f8ff; }
        .container { max-width: 900px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px; }
        .nav { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .nav a { margin: 0 15px; text-decoration: none; color: #667eea; font-weight: bold; padding: 8px 15px; border-radius: 5px; }
        .nav a:hover { background: #667eea; color: white; }
        .content { padding: 20px; line-height: 1.6; }
        .success { color: #28a745; font-weight: bold; }
        .error { color: #dc3545; font-weight: bold; }
        .param-demo { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🚀 Мое Laravel-подобное приложение</h1>
            <p>Практическая работа №26 - Успешно работает!</p>
        </div>";

// Простой роутинг по пути (без параметров)
switch ($requestPath) {
    case '/':
        echo "<div class='content'>
                <h2>Главная страница</h2>
                <p class='success'>✅ Приложение успешно запущено!</p>
                <p>Это главная страница моего Laravel-подобного приложения.</p>
                <h3>Выполненные задания:</h3>
                <ul>
                    <li>✅ Анализ legacy-кода</li>
                    <li>✅ Установка Laravel-подобного приложения</li>
                    <li>✅ Создание маршрутов</li>
                    <li>✅ Создание Blade-шаблонов</li>
                </ul>
              </div>";
        break;
        
    case '/hello':
        echo "<div class='content'>
                <h2>Привет, мир! 👋</h2>
                <p>Это простой маршрут <span class='success'>/hello</span></p>
                <p>Маршрутизация работает успешно!</p>
              </div>";
        break;
        
    case '/greeting':
        // Подключаем наш "Blade-шаблон"
        include '../resources/views/greeting.php';
        break;
        
    case '/user':
        $name = $_GET['name'] ?? 'Гость';
        echo "<div class='content'>
                <h2>Страница пользователя 👤</h2>
                <p>Привет, <span class='success'>$name</span>!</p>
                <p>Параметры маршрута работают корректно.</p>
                
                <div class='param-demo'>
                    <h3>🔍 GET-параметры в работе:</h3>
                    <p><strong>Полученный параметр:</strong> name = $name</p>
                    <p><strong>Попробуй изменить параметр в URL:</strong></p>
                    <ul>
                        <li><a href='/user?name=Алексей'>/user?name=Алексей</a></li>
                        <li><a href='/user?name=Мария'>/user?name=Мария</a></li>
                        <li><a href='/user?name=Студент'>/user?name=Студент</a></li>
                        <li><a href='/user'>/user (без параметра)</a></li>
                    </ul>
                </div>
              </div>";
        break;
        
    case '/legacy':
        echo "<div class='content'>
                <h2>📋 Демонстрация legacy-кода</h2>
                <div style='background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                    <h4>❌ Проблемный legacy-код:</h4>
                    <pre style='background: #f8f9fa; padding: 10px; border-radius: 3px;'>
// Уязвимость к SQL-инъекциям
\$id = \$_GET['id'];
\$sql = \"SELECT * FROM users WHERE id = \$id\";

// Смешение логики и представления
echo \"&lt;h1&gt;Пользователь: \" . \$row['name'] . \"&lt;/h1&gt;\";
                    </pre>
                </div>
                <div style='background: #d4edda; padding: 15px; border-radius: 5px;'>
                    <h4>✅ Улучшенный код:</h4>
                    <pre style='background: #f8f9fa; padding: 10px; border-radius: 3px;'>
// Защита от SQL-инъекций
\$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
\$stmt = \$pdo-&gt;prepare(\"SELECT * FROM users WHERE id = ?\");
\$stmt-&gt;execute([\$id]);

// Разделение логики и представления
return view('user', ['user' => \$user]);
                    </pre>
                </div>
              </div>";
        break;
        
    default:
        http_response_code(404);
        echo "<div class='content'>
                <h2 class='error'>❌ Страница не найдена - 404</h2>
                <p>Запрошенный адрес: <code>$requestPath</code> не существует</p>
                <p>Это демонстрация обработки ошибок в приложении.</p>
                <p>Попробуйте один из рабочих маршрутов ниже.</p>
              </div>";
}

echo "<div class='nav'>
        <h3>🔗 Тестовые маршруты:</h3>
        <a href='/'>Главная</a>
        <a href='/hello'>Маршрут /hello</a>
        <a href='/greeting'>Blade-шаблон</a>
        <a href='/user?name=Иван'>С параметром (Иван)</a>
        <a href='/user?name=Анна'>С параметром (Анна)</a>
        <a href='/legacy'>Legacy-код</a>
        <a href='/unknown'>404 Ошибка</a>
      </div>
      
      <div class='content' style='background: #f8f9fa; border-radius: 5px;'>
        <h3>📝 Информация о приложении:</h3>
        <p><strong>Версия PHP:</strong> " . PHP_VERSION . "</p>
        <p><strong>Сервер:</strong> " . ($_SERVER['SERVER_SOFTWARE'] ?? 'Built-in PHP Server') . "</p>
        <p><strong>Текущее время:</strong> " . date('d.m.Y H:i:s') . "</p>
        <p><strong>Запрошенный путь:</strong> <code>$requestPath</code></p>
        <p><strong>GET-параметры:</strong> " . (!empty($_GET) ? print_r($_GET, true) : 'нет') . "</p>
      </div>
    </div>
</body>
</html>";
?>