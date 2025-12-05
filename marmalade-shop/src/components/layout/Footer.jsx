import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Магазин мармелада. Все права защищены.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          <Link color="inherit" href="/about">
            О нас
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/contacts">
            Контакты
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/policy">
            Политика конфиденциальности
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;