import { forwardRef, ForwardRefExoticComponent } from "react";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";

interface IIconifyProps {
  icon: any;
  sx?: any;
  width?: number;
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
