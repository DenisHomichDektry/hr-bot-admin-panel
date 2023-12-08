import { Box, styled } from '@mui/material';

export const GreyBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  animation: 'pulse .7s infinite',
}));
