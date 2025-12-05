import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Alert,
  TextField,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { productsApi } from '../../api/productsApi';
import { useCart } from '../../hooks/useCart';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/common/ErrorAlert';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getById(Number(id));
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!product) return <ErrorAlert message="Товар не найден" />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={product.taste} color="primary" variant="outlined" />
            <Chip label={product.shape} color="secondary" variant="outlined" />
            <Chip label={product.collection} color="info" variant="outlined" />
            {!product.sugar && <Chip label="Без сахара" color="success" />}
          </Box>

          <Typography variant="h5" color="primary" gutterBottom>
            {product.price} ₽
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Дополнительная информация:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Вес: {product.weight} г
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  В наличии: {product.stock} шт
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Количество"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1, max: product.stock }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{ flexGrow: 1 }}
            >
              {product.stock > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
            </Button>
          </Box>

          {product.stock <= 10 && product.stock > 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Осталось всего {product.stock} шт!
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;