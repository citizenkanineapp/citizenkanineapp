import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const { palette } = createTheme();
const font = "'Noto Sans', sans-serif";


export const theme = createTheme({

  palette: {
    type: 'light',
    primary: {
      main: '#e0603f',
      contrastText: '#fbfaf8',
      dark: '#f8614D',
    },
    secondary: {
      main: '#53b0d1',
      contrastText: '#fbfaf8',
      dark: '#53c8d1',
    },
    error: {
      main: '#f8614d',
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
    // button: { textTransform: "none" }
    h4: {
        fontWeight: "300",
        fontSize: "2.5rem",
      },
  },
  

// palette: {
//         type: 'light',
//         primary: {
//           main: '#ff5e4a',
//           contrastText: '#fbfaf8',
//           dark: '#fd8c2a',
//         },
//         secondary: {
//           main: '#53b0d1',
//           contrastText: '#fbfaf8',
//           dark: '#53c8d1',
//         },
//         error: {
//           main: '#f8614d',
//           contrastText: '#fbfaf8',
//         },
//         warning: {
//           main: '#FF7E1E',
//           contrastText: '#fbfaf8',
//         },
//         success: {
//           main: '#7BCEC8',
//           contrastText: '#fbfaf8',
//         },
//         info: {
//           main: '#4a5061',
//         },
//         background: {
//           paper: '#f4f2ec',
//           default: '#FFFFFF',
//         },
//       },
      
});