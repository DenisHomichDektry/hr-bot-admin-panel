import { FC, ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { useResponsive } from '~/hooks/use-responsive';
import { HEADER, NAV } from '~/constants';

// ----------------------------------------------------------------------

const SPACING = 8;
interface IMainProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}
export const Main: FC<IMainProps> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive({ query: 'up', start: 'lg' });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}>
      {children}
    </Box>
  );
};
