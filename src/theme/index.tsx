import { FC, ReactNode, useMemo } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles/createTheme";

import { palette } from "./palette.ts";
import { typography } from "./typography.ts";
import { shadows } from "./shadows.ts";
import { customShadows } from "./custom-shadows.ts";
import { overrides } from "./overrides.ts";

// ----------------------------------------------------------------------

export const ThemeProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const memoizedValue: ThemeOptions = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
