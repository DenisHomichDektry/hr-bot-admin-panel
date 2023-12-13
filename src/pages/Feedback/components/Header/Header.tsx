import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

export const Header: FC = () => {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Feedback</Typography>
      </Stack>
    </>
  );
};
