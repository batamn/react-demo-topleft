import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#F6EEDC',
            light: '#F8D0C3',
            dark: '#C19F94',
        },
        text: {
            secondary: 'white',
        },
    },
});

export default theme;