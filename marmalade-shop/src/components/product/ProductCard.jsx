import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Вкус: {product.taste} | Форма: {product.shape}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
          {product.price} ₽
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/product/${product.id}`}>
          Подробнее
        </Button>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;