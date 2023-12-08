import { FC, forwardRef } from 'react';
import { Box, Link, SxProps, Theme } from '@mui/material';

import { RouterLink } from '~/routes/components/RouterLink';

// ----------------------------------------------------------------------
interface ILogoProps {
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
}
export const Logo: FC<ILogoProps> = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img"
      src="assets/apple-touch-icon-76x76.png"
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});
