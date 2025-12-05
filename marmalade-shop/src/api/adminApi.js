import { mockProducts, mockOrders } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const adminApi = {
  // Товары
  createProduct: async (product) => {
    await delay(500);
    const newProduct = {
      ...product,
      id: mockProducts.length + 1
    };
    console.log('Товар создан:', newProduct);
    return newProduct;
  },

  updateProduct: async (id, product) => {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Товар не найден');
    mockProducts[index] = { ...mockProducts[index], ...product };
    console.log('Товар обновлен:', mockProducts[index]);
    return mockProducts[index];
  },

  deleteProduct: async (id) => {
    await delay(500);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Товар не найден');
    const deleted = mockProducts.splice(index, 1);
    console.log('Товар удален:', deleted);
  },

  // Отчеты
  getReports: async (period) => {
    await delay(500);
    // Простая имитация отчета
    const orders = mockOrders.filter(order => {
      const orderDate = new Date(order.date);
      const now = new Date();
      let startDate;
      if (period === 'week') {
        startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (period === 'month') {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
      } else {
        startDate = new Date(0); // Все время
      }
      return orderDate >= startDate;
    });

    const total = orders.reduce((sum, order) => sum + order.total, 0);
    const popularProducts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        popularProducts[item.productId] = (popularProducts[item.productId] || 0) + item.quantity;
      });
    });

    return {
      totalOrders: orders.length,
      totalRevenue: total,
      popularProducts: Object.entries(popularProducts)
        .map(([productId, count]) => ({
          productId: Number(productId),
          count
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    };
  }
};