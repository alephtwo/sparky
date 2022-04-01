import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Sparky } from './sparky/Sparky';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme();

const component = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Sparky />
  </ThemeProvider>
);

const mount = document.getElementById('app');
ReactDOM.render(component, mount);
