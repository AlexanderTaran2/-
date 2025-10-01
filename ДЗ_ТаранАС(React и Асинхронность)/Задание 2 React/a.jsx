import React, { useState, useEffect, useMemo } from 'react';
import './AdvancedTodoApp.css';

const AdvancedTodoApp = () => {
    // Состояния
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('medium');
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [language, setLanguage] = useState('ru');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');

    // Локализация
    const translations = {
        ru: {
            title: 'Продвинутый менеджер задач',
            placeholder: 'Введите новую задачу...',
            addButton: 'Добавить',
            all: 'Все',
            active: 'Активные',
            completed: 'Завершенные',
            search: 'Поиск...',
            sort: 'Сортировка:',
            sortCreated: 'По дате',
            sortPriority: 'По приоритету',
            priority: 'Приоритет',
            low: 'Низкий',
            medium: 'Средний',
            high: 'Высокий',
            createdAt: 'Создана',
            completedAt: 'Завершена',
            actions: 'Действия',
            edit: 'Редактировать',
            save: 'Сохранить',
            cancel: 'Отмена',
            delete: 'Удалить',
            complete: 'Завершить',
            activate: 'Активировать',
            tasksLeft: 'осталось задач',
            clearCompleted: 'Удалить завершенные',
            noTasks: 'Задачи не найдены',
            language: 'Язык'
        },
        en: {
            title: 'Advanced Task Manager',
            placeholder: 'Enter new task...',
            addButton: 'Add',
            all: 'All',
            active: 'Active',
            completed: 'Completed',
            search: 'Search...',
            sort: 'Sort by:',
            sortCreated: 'By date',
            sortPriority: 'By priority',
            priority: 'Priority',
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            createdAt: 'Created',
            completedAt: 'Completed',
            actions: 'Actions',
            edit: 'Edit',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            complete: 'Complete',
            activate: 'Activate',
            tasksLeft: 'tasks left',
            clearCompleted: 'Clear completed',
            noTasks: 'No tasks found',
            language: 'Language'
        }
    };

    const t = translations[language];

    // Загрузка задач из localStorage при монтировании
    useEffect(() => {
        const savedTasks = localStorage.getItem('advancedTodoTasks');
        const savedLanguage = localStorage.getItem('todoLanguage');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Сохранение задач в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('advancedTodoTasks', JSON.stringify(tasks));
    }, [tasks]);

    // Сохранение языка в localStorage
    useEffect(() => {
        localStorage.setItem('todoLanguage', language);
    }, [language]);

    // Добавление новой задачи
    const addTask = () => {
        if (newTask.trim()) {
            const task = {
                id: Date.now(),
                text: newTask.trim(),
                completed: false,
                priority: newTaskPriority,
                createdAt: new Date().toISOString(),
                completedAt: null
            };
            setTasks([...tasks, task]);
            setNewTask('');
            setNewTaskPriority('medium');
        }
    };

    // Удаление задачи
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Переключение статуса выполнения
    const toggleTask = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed,
                    completedAt: !task.completed ? new Date().toISOString() : null
                };
            }
            return task;
        }));
    };

    // Начало редактирования
    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingText(task.text);
    };

    // Сохранение редактирования
    const saveEditing = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: editingText.trim() } : task
        ));
        setEditingTaskId(null);
        setEditingText('');
    };

    // Отмена редактирования
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    // Очистка завершенных задач
    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    // Изменение приоритета задачи
    const updatePriority = (id, priority) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, priority } : task
        ));
    };

    // Фильтрация и поиск задач
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesFilter = filter === 'all' ||
                (filter === 'active' && !task.completed) ||
                (filter === 'completed' && task.completed);
            
            const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });
    }, [tasks, filter, searchQuery]);

    // Сортировка задач
    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            switch (sortBy) {
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'createdAt':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });
    }, [filteredTasks, sortBy]);

    // Статистика
    const activeTasksCount = tasks.filter(task => !task.completed).length;
    const completedTasksCount = tasks.filter(task => task.completed).length;

    // Обработчики клавиш
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const handleEditKeyPress = (e, id) => {
        if (e.key === 'Enter') {
            saveEditing(id);
        } else if (e.key === 'Escape') {
            cancelEditing();
        }
    };

    // Получение класса приоритета
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="advanced-todo-app">
            <div className="todo-header">
                <h1>{t.title}</h1>
                <div className="language-switcher">
                    <button
                        className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
                        onClick={() => setLanguage('ru')}
                    >
                        RU
                    </button>
                    <button
                        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Форма добавления задачи */}
            <div className="add-task-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.placeholder}
                        className="task-input"
                    />
                    <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="priority-select"
                    >
                        <option value="low">{t.low}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="high">{t.high}</option>
                    </select>
                    <button onClick={addTask} className="add-btn">
                        {t.addButton}
                    </button>
                </div>
            </div>

            {/* Панель управления */}
            <div className="control-panel">
                <div className="filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        {t.all}
                    </button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        {t.active}
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        {t.completed}
                    </button>
                </div>

                <div className="search-sort">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.search}
                        className="search-input"
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="createdAt">{t.sortCreated}</option>
                        <option value="priority">{t.sortPriority}</option>
                    </select>
                </div>
            </div>

            {/* Статистика */}
            <div className="stats">
                <span>{activeTasksCount} {t.tasksLeft}</span>
                {completedTasksCount > 0 && (
                    <button onClick={clearCompleted} className="clear-btn">
                        {t.clearCompleted} ({completedTasksCount})
                    </button>
                )}
            </div>

            {/* Список задач */}
            <div className="tasks-list">
                {sortedTasks.length === 0 ? (
                    <div className="no-tasks">{t.noTasks}</div>
                ) : (
                    sortedTasks.map(task => (
                        <div
                            key={task.id}
                            className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)}`}
                        >
                            <div className="task-content">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="task-checkbox"
                                />
                                
                                {editingTaskId === task.id ? (
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                                        onBlur={() => saveEditing(task.id)}
                                        className="edit-input"
                                        autoFocus
                                    />
                                ) : (
                                    <div className="task-text">
                                        <span>{task.text}</span>
                                        <div className="task-meta">
                                            <span className="priority-badge">{t[task.priority]}</span>
                                            <span className="date">{t.createdAt}: {formatDate(task.createdAt)}</span>
                                            {task.completedAt && (
                                                <span className="date">{t.completedAt}: {formatDate(task.completedAt)}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="task-actions">
                                {editingTaskId === task.id ? (
                                    <>
                                        <button
                                            onClick={() => saveEditing(task.id)}
                                            className="action-btn save-btn"
                                        >
                                            {t.save}
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="action-btn cancel-btn"
                                        >
                                            {t.cancel}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => startEditing(task)}
                                            className="action-btn edit-btn"
                                            disabled={task.completed}
                                        >
                                            {t.edit}
                                        </button>
                                        <select
                                            value={task.priority}
                                            onChange={(e) => updatePriority(task.id, e.target.value)}
                                            className="priority-action"
                                            disabled={task.completed}
                                        >
                                            <option value="low">{t.low}</option>
                                            <option value="medium">{t.medium}</option>
                                            <option value="high">{t.high}</option>
                                        </select>
                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className="action-btn complete-btn"
                                        >
                                            {task.completed ? t.activate : t.complete}
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="action-btn delete-btn"
                                        >
                                            {t.delete}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdvancedTodoApp;