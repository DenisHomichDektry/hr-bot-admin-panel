import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export const Error: FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.log('test');
  console.error(error);

  return (
    <Box
      sx={{
        py: 12,
        maxWidth: 480,
        mx: 'auto',
        display: 'flex',
        height: '100%',
        // minHeight: '100vh',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h3" sx={{ color: 'text.secondary' }}>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Box>
  );
};
