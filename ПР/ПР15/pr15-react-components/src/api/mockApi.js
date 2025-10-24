// Mock API для тестирования компонентов
export const mockApi = {
    // Имитация задержки сети
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Получение пользователя
    getUser: async () => {
      await mockApi.delay(500);
      return {
        id: 1,
        name: "Иван Иванов",
        email: "ivan@example.com",
        avatar: "https://via.placeholder.com/150",
        isOnline: true
      };
    },
    
    // Получение списка задач
    getTodos: async () => {
      await mockApi.delay(800);
      return [
        { id: 1, text: "Изучить React", completed: false },
        { id: 2, text: "Сделать практическую работу", completed: true },
        { id: 3, text: "Написать тесты", completed: false }
      ];
    },
    
    // Получение данных о размере (имитация)
    getWindowSize: async () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    
    // Цвета для ColorPicker
    getColors: async () => {
      await mockApi.delay(300);
      return [
        { id: 1, name: "Красный", value: "#ff0000" },
        { id: 2, name: "Зеленый", value: "#00ff00" },
        { id: 3, name: "Синий", value: "#0000ff" },
        { id: 4, name: "Желтый", value: "#ffff00" },
        { id: 5, name: "Фиолетовый", value: "#800080" }
      ];
    }
  };
  
  export default mockApi;