import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const { palette } = createTheme();
const font = "'Noto Sans', sans-serif";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#e0603f',
      contrastText: '#fbfaf8',
      dark: '#bf4a2d',
    },
    secondary: {
      main: '#53b0d1',
      contrastText: '#fbfaf8',
      dark: '#3f89a4',
    },
    tertiary: {
      main: '#cfd8dc',
      contrastText: '#37474f',
      dark:'#808e95'
    },
    error: {
      main: '#e0923f',
      contrastText: '#bd7222',
    },
    warning: {
      main: '#ff5e4a',
      contrastText: '#fbfaf8',
    },
    success: {
      main: '#7BCEC8',
      contrastText: '#fbfaf8',
    },
    info: {
      main: '#4a5061',
    },
    background: {
      paper: '#fbfaf8',
      default: '#ffffff',
    },
    navColor: palette.augmentColor({ color: {
           main: "#fbfaf8"
    } }),
  },

  typography: {
    // fontFamily: font,
    // button: { textTransform: "none" },
    h4: {
        fontWeight: "300",
        fontSize: "2.5rem",
      },
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 570,
  //     md: 900,
  //     lg: 1200,
  //     xl: 1536,
  //   },
  // }

});