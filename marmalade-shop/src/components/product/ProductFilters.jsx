import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { TASTE_OPTIONS, SHAPE_OPTIONS, COLLECTION_OPTIONS } from '../../utils/constants';

const ProductFilters = ({ filters, onChange }) => {
  const handleTasteChange = (event) => {
    const { value } = event.target;
    onChange({
      ...filters,
      taste: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleShapeChange = (event) => {
    const { value } = event.target;
    onChange({
      ...filters,
      shape: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleCollectionChange = (event) => {
    const { value } = event.target;
    onChange({
      ...filters,
      collection: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSugarChange = (event) => {
    const { checked } = event.target;
    onChange({
      ...filters,
      sugar: checked ? false : null, // false - без сахара, null - все
    });
  };

  const handleReset = () => {
    onChange({
      taste: [],
      shape: [],
      collection: [],
      sugar: null,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>
      <FormGroup>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="taste-label">Вкус</InputLabel>
          <Select
            labelId="taste-label"
            multiple
            value={filters.taste}
            onChange={handleTasteChange}
            label="Вкус"
          >
            {TASTE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="shape-label">Форма</InputLabel>
          <Select
            labelId="shape-label"
            multiple
            value={filters.shape}
            onChange={handleShapeChange}
            label="Форма"
          >
            {SHAPE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="collection-label">Коллекция</InputLabel>
          <Select
            labelId="collection-label"
            multiple
            value={filters.collection}
            onChange={handleCollectionChange}
            label="Коллекция"
          >
            {COLLECTION_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.sugar === false}
              onChange={handleSugarChange}
            />
          }
          label="Без сахара"
        />
        <Button onClick={handleReset} sx={{ mt: 2 }}>
          Сбросить фильтры
        </Button>
      </FormGroup>
    </Box>
  );
};

export default ProductFilters;