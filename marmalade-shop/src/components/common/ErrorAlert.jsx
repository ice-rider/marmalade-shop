import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              <RefreshIcon sx={{ mr: 1 }} />
              Повторить
            </Button>
          )
        }
      >
        <AlertTitle>Ошибка</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;