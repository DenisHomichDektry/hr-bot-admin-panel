import { FC } from 'react';
import { alpha, Box, Card, Stack, Typography, useTheme } from '@mui/material';

import { bgGradient } from '~/theme/css.ts';
import { Logo } from '~/components/atoms/Logo';

const NoAccess: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            textAlign: 'center',
          }}>
          <Typography variant="h4">Your user does not have access to the HR Bot Admin Panel</Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Please contact your administrator
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
};

export default NoAccess;
