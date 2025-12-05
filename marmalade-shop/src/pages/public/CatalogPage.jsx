import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ProductCard from '../../components/product/ProductCard';
import ProductFilters from '../../components/product/ProductFilters';
import { productsApi } from '../../api/productsApi';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    taste: [],
    shape: [],
    collection: [],
    sugar: null,
  });

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productsApi.getAll();
      setProducts(data);
      setFilteredProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      let result = products;

      if (searchQuery) {
        result = await productsApi.search(searchQuery);
      }

      if (filters.taste.length > 0 || filters.shape.length > 0 || filters.collection.length > 0 || filters.sugar !== null) {
        result = await productsApi.filter(filters);
      }

      setFilteredProducts(result);
    };

    applyFilters();
  }, [searchQuery, filters, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог мармелада
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <ProductFilters filters={filters} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            fullWidth
            label="Поиск товаров"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 3 }}
          />
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CatalogPage;