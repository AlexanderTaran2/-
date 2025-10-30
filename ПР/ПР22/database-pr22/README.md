# Практическая работа №22: Работа с базой данных

## Описание проекта
REST API для управления библиотекой с использованием Node.js, Express.js и SQLite.

## Структура базы данных

### Таблицы:

#### authors
- `id` - PRIMARY KEY, AUTOINCREMENT
- `name` - VARCHAR(100), NOT NULL
- `bio` - TEXT
- `birth_date` - DATE
- `created_at` - DATETIME
- `updated_at` - DATETIME

#### categories
- `id` - PRIMARY KEY, AUTOINCREMENT
- `name` - VARCHAR(50), NOT NULL, UNIQUE
- `description` - TEXT
- `created_at` - DATETIME

#### books
- `id` - PRIMARY KEY, AUTOINCREMENT
- `title` - VARCHAR(255), NOT NULL
- `isbn` - VARCHAR(20), UNIQUE
- `publication_year` - INTEGER
- `price` - DECIMAL(10,2)
- `stock_quantity` - INTEGER
- `author_id` - INTEGER, FOREIGN KEY
- `category_id` - INTEGER, FOREIGN KEY
- `description` - TEXT
- `created_at` - DATETIME
- `updated_at` - DATETIME