import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { ordersApi } from '../../api/ordersApi';
import { ORDER_STATUS_COLORS } from '../../utils/constants';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        try {
          const data = await ordersApi.getByUser(user.id);
          setOrders(data);
        } catch (error) {
          console.error('Ошибка при загрузке заказов:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadOrders();
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Личный кабинет
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Профиль" />
          <Tab label="Мои заказы" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Личная информация
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Имя:</strong> {user.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Телефон:</strong> {user.phone}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={logout}
          >
            Выйти из аккаунта
          </Button>
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            История заказов
          </Typography>
          
          {loading ? (
            <Typography>Загрузка...</Typography>
          ) : orders.length === 0 ? (
            <Typography color="text.secondary">
              У вас еще нет заказов
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Номер заказа</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Сумма</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Способ оплаты</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.total} ₽</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={ORDER_STATUS_COLORS[order.status] || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {order.payment === 'online' ? 'Онлайн картой' : 'При получении'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default ProfilePage;