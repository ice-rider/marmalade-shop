import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { ordersApi } from '../../api/ordersApi';
import { DELIVERY_METHODS, PAYMENT_METHODS } from '../../utils/constants';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    name: isAuthenticated ? user.name : '',
    email: isAuthenticated ? user.email : '',
    phone: isAuthenticated ? user.phone : '',
    address: '',
    delivery: 'cdek',
    payment: 'online',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const delivery = DELIVERY_METHODS.find(d => d.value === formData.delivery)?.price || 0;
    return totalPrice + delivery;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const order = {
        userId: isAuthenticated ? user.id : null,
        customer: formData.name,
        email: formData.email,
        phone: formData.phone,
        total: calculateTotal(),
        delivery: formData.delivery,
        payment: formData.payment,
        address: formData.address,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const createdOrder = await ordersApi.create(order);
      clearCart();
      navigate('/order-success', { state: { orderId: createdOrder.id } });
    } catch (err) {
      setError(err.message || 'Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Оформление заказа
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Контактная информация
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Имя"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Способ доставки
            </Typography>
            <RadioGroup
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
            >
              {DELIVERY_METHODS.map((method) => (
                <FormControlLabel
                  key={method.value}
                  value={method.value}
                  control={<Radio />}
                  label={`${method.label} ${method.price > 0 ? `(+${method.price} ₽)` : '(бесплатно)'}`}
                />
              ))}
            </RadioGroup>
            
            {formData.delivery !== 'pickup' && (
              <TextField
                required
                fullWidth
                name="address"
                label="Адрес доставки"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Способ оплаты
            </Typography>
            <RadioGroup
              name="payment"
              value={formData.payment}
              onChange={handleChange}
            >
              {PAYMENT_METHODS.map((method) => (
                <FormControlLabel
                  key={method.value}
                  value={method.value}
                  control={<Radio />}
                  label={method.label}
                />
              ))}
            </RadioGroup>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Ваш заказ
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    {item.price * item.quantity} ₽
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Товары</Typography>
                <Typography>{totalPrice} ₽</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Доставка</Typography>
                <Typography>
                  {DELIVERY_METHODS.find(d => d.value === formData.delivery)?.price || 0} ₽
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Итого</Typography>
              <Typography variant="h6" color="primary">
                {calculateTotal()} ₽
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Оформление...' : 'Подтвердить заказ'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;