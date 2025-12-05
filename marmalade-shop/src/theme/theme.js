import { createTheme } from '@mui/material/styles';

// Кастомная тема для магазина мармелада
// Яркие, "вкусные" цвета
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B9D', // Розовый (основной цвет бренда)
      light: '#FFB3CC',
      dark: '#CC3D6B',
    },
    secondary: {
      main: '#FFC947', // Жёлтый (акцентный цвет)
      light: '#FFE5A0',
      dark: '#E6A700',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;