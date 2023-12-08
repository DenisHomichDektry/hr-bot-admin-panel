import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';

export const Header: FC = () => {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">User management</Typography>

        <Button
          href={import.meta.env.VITE_BOT_LINK + '?start=create_user'}
          target="_blank"
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}>
          New user
        </Button>
      </Stack>
    </>
  );
};
