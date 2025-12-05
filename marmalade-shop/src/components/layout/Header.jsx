import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  const menuItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'Корзина', path: '/cart', icon: <CartIcon />, badge: totalItems },
  ];

  if (isAuthenticated) {
    if (user.role === 'admin') {
      menuItems.push({ label: 'Админ', path: '/admin' });
    }
    menuItems.push({ label: 'Профиль', path: '/profile', icon: <PersonIcon /> });
  }

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.label}
          component={RouterLink}
          to={item.path}
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      {isAuthenticated ? (
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Выйти" />
        </ListItem>
      ) : (
        <>
          <ListItem
            component={RouterLink}
            to="/login"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Войти" />
          </ListItem>
          <ListItem
            component={RouterLink}
            to="/register"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Регистрация" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Магазин мармелада
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.label}
                  {item.badge > 0 && (
                    <Badge
                      badgeContent={item.badge}
                      color="secondary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Button>
              ))}
              {isAuthenticated ? (
                <Button color="inherit" onClick={logout}>
                  Выйти
                </Button>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Войти
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register">
                    Регистрация
                  </Button>
                </>
              )}
            </Box>
          )}
          {isMobile && (
            <IconButton
              component={RouterLink}
              to="/cart"
              color="inherit"
              aria-label="cart"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;