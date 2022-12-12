import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const { palette } = createTheme();
const font = "'Noto Sans', sans-serif";

// width: 8.25vw!important;
// height: 5vh!important;
// margin - left: 0px!important;
// margin - right: 0px!important;
// font - size: 1rem!important;
// color: blue;
export const theme = createTheme({
  // components: {
  //   // Name of the component
  //   MuiDayPicker: {
  //     styleOverrides: {
  //       // Name of the slot
  //       weekDayLabel: {
  //         // Some CSS
  //         width: '8.25vw',
  //         height: '5vh',
  //         marginLeft: '0px',
  //         marginRight: '0px',
  //         fontSize: '1rem',
  //         color: 'black'
  //       }
  //     }
  //   },
  //   MuiDatePickerToolbar: {
  //     styleOverrides: {
  //       root: {
  //         display: 'none'
  //       }
  //     }
  //   },
  //   MuiPickersToolbar: {
  //     styleOverrides: {
  //       root: {
  //         display: 'none'
  //       }
  //     }
  //   },
  //   MuiCalendarPicker: {
  //     styleOverrides: {
  //       root: {
  //         width: '60vw !important',
  //         minHeight: '100vh !important',
  //         borderRadius: '10px !important'
  //       }
  //     }
  //   }
  // },
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


});