import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';

const AdminProductsEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isNew ? 'Добавление товара' : 'Редактирование товара'}
      </Typography>
      <Typography color="text.secondary">
        Раздел в разработке
      </Typography>
    </Container>
  );
};

export default AdminProductsEdit;