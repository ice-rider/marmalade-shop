import { mockProducts } from './mockData';

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = {
  // Получить все товары
  getAll: async () => {
    await delay(500);
    return mockProducts;
  },

  // Получить товар по ID
  getById: async (id) => {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) throw new Error('Товар не найден');
    return product;
  },

  // Поиск товаров (по имени, вкусу, коллекции и т.д.)
  search: async (query) => {
    await delay(500);
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.taste.toLowerCase().includes(lowerQuery) ||
      p.collection.toLowerCase().includes(lowerQuery)
    );
  },

  // Фильтрация товаров по параметрам
  filter: async (filters) => {
    await delay(500);
    let filtered = [...mockProducts];
    if (filters.taste && filters.taste.length > 0) {
      filtered = filtered.filter(p => filters.taste.includes(p.taste));
    }
    if (filters.shape && filters.shape.length > 0) {
      filtered = filtered.filter(p => filters.shape.includes(p.shape));
    }
    if (filters.collection && filters.collection.length > 0) {
      filtered = filtered.filter(p => filters.collection.includes(p.collection));
    }
    if (filters.sugar !== undefined) {
      filtered = filtered.filter(p => p.sugar === filters.sugar);
    }
    return filtered;
  }
};