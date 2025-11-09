<?php
// Помощники для работы приложения
function view($template, $data = []) {
    extract($data);
    include "../resources/views/{$template}.php";
}

function abort($code = 404) {
    http_response_code($code);
    echo "Ошибка $code - Страница не найдена";
    exit;
}
?>