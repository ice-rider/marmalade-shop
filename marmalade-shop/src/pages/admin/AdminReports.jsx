import React from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';

const AdminReports = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Отчеты
      </Typography>
      <Typography color="text.secondary">
        Раздел в разработке
      </Typography>
    </Container>
  );
};

export default AdminReports;