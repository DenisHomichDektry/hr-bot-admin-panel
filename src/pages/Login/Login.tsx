import { FC, useEffect } from 'react';
import { alpha, Box, Button, Card, Link, Stack, Typography, useTheme } from '@mui/material';

import { bgGradient } from '~/theme/css.ts';
import { Logo } from '~/components/atoms/Logo';
import { Iconify } from '~/components/atoms/Iconify';
import { ENDPOINTS, ROUTES } from '~/constants';
import { isTokenExist } from '~/utils';
import { router } from '~/routes';

const Login: FC = () => {
  const theme = useTheme();

  useEffect(() => {
    if (isTokenExist()) {
      router.navigate(ROUTES.ONBOARDING);
    }
  }, []);

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
          <Typography variant="h4">Sign in to HR Bot Admin Panel</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              href={import.meta.env.VITE_API_URL + ENDPOINTS.LOGIN}
              onClick={(e) => {
                // fix to prevent some browser from opening the link in a new tab
                e.preventDefault();
                window.location.href = import.meta.env.VITE_API_URL + ENDPOINTS.LOGIN;
              }}
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}>
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default Login;
