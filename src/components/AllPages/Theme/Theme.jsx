import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#F8614D',
            contrastText: 'rgba(255,255,255,0.87)',
        },
        secondary: {
            main: '#539BD1',
        },
        error: {
            main: '#f8614d',
        },
        warning: {
            main: '#f5a572',
        },
        success: {
            main: '#7BCEC8',
        },
        info: {
            main: '#4a5061',
        },
        background: {
            paper: '#fcf4eb',
        },
    },
});