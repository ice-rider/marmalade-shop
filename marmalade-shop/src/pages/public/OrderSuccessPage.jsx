import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 3 }} />
        
        <Typography variant="h3" component="h1" gutterBottom>
          Заказ оформлен успешно!
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Номер вашего заказа: <strong>{orderId}</strong>
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Спасибо за ваш заказ! Мы отправили подтверждение на указанный email.
          В ближайшее время с вами свяжется наш менеджер для уточнения деталей доставки.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/"
            size="large"
          >
            На главную
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/catalog"
            size="large"
          >
            Продолжить покупки
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;