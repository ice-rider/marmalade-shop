import { mockOrders } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ordersApi = {
  // Создать заказ
  create: async (order) => {
    await delay(500);
    // Генерируем ID заказа
    const newOrder = {
      ...order,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      status: 'Новый'
    };
    // В реальном приложении здесь был бы POST запрос
    console.log('Заказ создан:', newOrder);
    return newOrder;
  },

  // Получить заказы пользователя
  getByUser: async (userId) => {
    await delay(500);
    return mockOrders.filter(order => order.userId === userId);
  },

  // Получить все заказы (для админа)
  getAll: async () => {
    await delay(500);
    return mockOrders;
  },

  // Обновить статус заказа
  updateStatus: async (orderId, status) => {
    await delay(500);
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) throw new Error('Заказ не найден');
    order.status = status;
    console.log(`Статус заказа ${orderId} изменен на ${status}`);
    return order;
  }
};