const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Создание и настройка подключения к базе данных
class Database {
    constructor() {
        this.dbPath = path.join(__dirname, 'library.db');
        this.db = null;
    }

    // Подключение к базе данных
    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Ошибка подключения к БД:', err.message);
                    reject(err);
                } else {
                    console.log('✅ Подключение к SQLite установлено');
                    this.enableForeignKeys();
                    resolve(this.db);
                }
            });
        });
    }

    // Включение поддержки внешних ключей
    enableForeignKeys() {
        this.db.run('PRAGMA foreign_keys = ON', (err) => {
            if (err) {
                console.error('Ошибка включения foreign keys:', err);
            } else {
                console.log('✅ Foreign keys включены');
            }
        });
    }

    // Закрытие подключения
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Ошибка закрытия БД:', err.message);
                } else {
                    console.log('✅ Подключение к БД закрыто');
                }
            });
        }
    }

    // Выполнение SQL запроса
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    // Получение одной записи
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Получение всех записей
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

// Создание экземпляра базы данных
const database = new Database();

module.exports = database;