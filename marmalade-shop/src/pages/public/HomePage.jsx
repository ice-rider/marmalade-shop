import React from 'react';
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Box  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { mockProducts } from '../../api/mockData';

const HomePage = () => {
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Добро пожаловать в магазин мармелада!
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Мы предлагаем натуральный мармелад ручной работы с самыми разными вкусами.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 8 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/catalog"
        >
          Перейти в каталог
        </Button>
      </Box>

      <Typography variant="h4" component="h2" gutterBottom>
        Популярные товары
      </Typography>
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {product.price} ₽
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={RouterLink}
                  to={`/product/${product.id}`}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;