import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';

const AdminProducts = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Товары
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/admin/products/new"
        >
          Добавить товар
        </Button>
      </Box>
      <Typography color="text.secondary">
        Раздел в разработке
      </Typography>
    </Container>
  );
};

export default AdminProducts;