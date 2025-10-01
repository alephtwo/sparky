import * as React from "react";
import { createRoot } from "react-dom/client";
import { Sparky } from "./Sparky";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme();

const component = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Sparky />
  </ThemeProvider>
);

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(component);
