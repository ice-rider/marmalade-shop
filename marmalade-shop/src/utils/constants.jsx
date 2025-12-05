// Константы для приложения

// Статусы заказов
export const ORDER_STATUS = {
  NEW: 'Новый',
  PROCESSING: 'В обработке',
  SHIPPED: 'Отправлен',
  DELIVERED: 'Доставлен',
  CANCELLED: 'Отменен',
};

// Цвета статусов для Chip компонента
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.NEW]: 'info',
  [ORDER_STATUS.PROCESSING]: 'warning',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
};

// Способы доставки
export const DELIVERY_METHODS = [
  { value: 'cdek', label: 'СДЭК', price: 300 },
  { value: 'boxberry', label: 'Boxberry', price: 250 },
  { value: 'pickup', label: 'Самовывоз', price: 0 },
];

// Способы оплаты
export const PAYMENT_METHODS = [
  { value: 'online', label: 'Онлайн картой' },
  { value: 'cash', label: 'При получении' },
];

// Фильтры для товаров
export const TASTE_OPTIONS = [
  'Ассорти',
  'Кислые фрукты',
  'Ягоды',
  'Цитрус',
  'Тропические фрукты',
];

export const SHAPE_OPTIONS = [
  'Медведи',
  'Червячки',
  'Дольки',
  'Кольца',
  'Фигурки',
];

export const COLLECTION_OPTIONS = [
  'Классика',
  'Кислинка',
  'ЗОЖ',
  'Премиум',
];

// Роли пользователей
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};