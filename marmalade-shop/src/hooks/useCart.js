import { useContext } from 'react';
import CartContext from '../context/CartContext'; // Импортируем default экспорт

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};