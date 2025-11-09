import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('week');

    // Имитация загрузки данных с API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Имитация API запроса
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock данные
                const mockData = {
                    visitors: Math.floor(Math.random() * 10000),
                    sales: Math.floor(Math.random() * 1000),
                    revenue: Math.floor(Math.random() * 50000),
                    conversion: (Math.random() * 10).toFixed(1),
                    chartData: {
                        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                        values: [120, 190, 300, 250, 200, 180, 400]
                    }
                };
                
                setData(mockData);
                setError(null);
            } catch (err) {
                setError('Ошибка загрузки данных');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dateRange]);

    // Простой график на CSS
    const SimpleChart = ({ data }) => {
        if (!data) return null;
        
        const maxValue = Math.max(...data.values);
        
        return (
            <div className="simple-chart">
                {data.values.map((value, index) => (
                    <div key={index} className="chart-bar-container">
                        <div className="chart-bar" style={{ height: `${(value / maxValue) * 100}%` }}></div>
                        <span className="chart-label">{data.labels[index]}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка данных...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <p>❌ {error}</p>
                <button onClick={() => window.location.reload()}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <div className="analytics-dashboard">
            <h1>📊 Аналитический дашборд</h1>
            
            {/* Фильтры по дате */}
            <div className="date-filters">
                <button 
                    className={dateRange === 'week' ? 'active' : ''}
                    onClick={() => setDateRange('week')}
                >
                    Неделя
                </button>
                <button 
                    className={dateRange === 'month' ? 'active' : ''}
                    onClick={() => setDateRange('month')}
                >
                    Месяц
                </button>
                <button 
                    className={dateRange === 'year' ? 'active' : ''}
                    onClick={() => setDateRange('year')}
                >
                    Год
                </button>
            </div>

            {/* Статистические карточки */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>👥 Посетители</h3>
                    <p className="stat-number">{data.visitors.toLocaleString()}</p>
                    <span className="stat-change">+12% с прошлой недели</span>
                </div>
                
                <div className="stat-card">
                    <h3>💰 Продажи</h3>
                    <p className="stat-number">{data.sales}</p>
                    <span className="stat-change">+8% с прошлой недели</span>
                </div>
                
                <div className="stat-card">
                    <h3>💵 Выручка</h3>
                    <p className="stat-number">${data.revenue.toLocaleString()}</p>
                    <span className="stat-change">+15% с прошлой недели</span>
                </div>
                
                <div className="stat-card">
                    <h3>📈 Конверсия</h3>
                    <p className="stat-number">{data.conversion}%</p>
                    <span className="stat-change">+2% с прошлой недели</span>
                </div>
            </div>

            {/* График */}
            <div className="chart-section">
                <h2>Трафик по дням</h2>
                <SimpleChart data={data.chartData} />
            </div>

            {/* Простая таблица */}
            <div className="table-section">
                <h2>Последние действия</h2>
                <div className="simple-table">
                    <div className="table-row header">
                        <div>Пользователь</div>
                        <div>Действие</div>
                        <div>Время</div>
                    </div>
                    <div className="table-row">
                        <div>user123</div>
                        <div>Покупка</div>
                        <div>2 мин назад</div>
                    </div>
                    <div className="table-row">
                        <div>user456</div>
                        <div>Регистрация</div>
                        <div>5 мин назад</div>
                    </div>
                    <div className="table-row">
                        <div>user789</div>
                        <div>Отзыв</div>
                        <div>10 мин назад</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;