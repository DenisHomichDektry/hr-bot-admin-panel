/// <reference types="vite/client" />
import * as React from "react";
import "@mui/material/styles";
import "@mui/material/styles/createTypography";
import "@mui/material";

import { ICustomShadows } from "./theme/custom-shadows.ts";

declare module "@mui/material/styles" {
  interface TypeBackground {
    neutral: string;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface FontStyle {
    fontSecondaryFamily: React.CSSProperties["fontFamily"];
    fontWeightSemiBold: React.CSSProperties["fontWeight"];
  }
}

declare module "@mui/material" {
  interface Theme {
    customShadows: ICustomShadows;
  }
  interface BaseTheme {
    customShadows: ICustomShadows;
  }
}
