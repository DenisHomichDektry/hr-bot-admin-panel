import { forwardRef, ForwardRefExoticComponent } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import { Box, SxProps, Theme } from '@mui/material';

interface IIconifyProps {
  icon: string;
  sx?: SxProps<Theme>;
  width?: string | number;
  [x: string]: unknown;
}
export const Iconify: ForwardRefExoticComponent<IIconifyProps> = forwardRef(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  ),
);
