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
    error: {
      main: '#e0923f',
      contrastText: '#fbfaf8',
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


});