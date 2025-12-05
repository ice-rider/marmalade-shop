import React from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';

const AdminChat = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Чат поддержки
      </Typography>
      <Typography color="text.secondary">
        Раздел в разработке
      </Typography>
    </Container>
  );
};

export default AdminChat;