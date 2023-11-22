import { forwardRef, FC } from 'react';

import { Box, SxProps, Theme } from '@mui/material';

// ----------------------------------------------------------------------
interface ISvgColorProps {
  src: string;
  sx?: SxProps<Theme>;
}
export const SvgColor: FC<ISvgColorProps> = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));
