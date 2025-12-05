import { mockUsers } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  // Вход
  login: async (email, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Неверный email или пароль');
    return { ...user, password: undefined };
  },

  // Регистрация
  register: async (userData) => {
    await delay(500);
    // Проверяем, нет ли уже пользователя с таким email
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      role: 'user'
    };
    // В реальном приложении здесь был бы POST запрос
    console.log('Пользователь зарегистрирован:', newUser);
    return { ...newUser, password: undefined };
  },

  // Выход
  logout: async () => {
    await delay(500);
    console.log('Пользователь вышел');
  }
};