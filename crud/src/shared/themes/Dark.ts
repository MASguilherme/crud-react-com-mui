import { createTheme } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: amber[700],
            dark: amber[800],
            light: amber[500],
            contrastText: amber[50]
        },
        secondary: {
            main: indigo[50],
            dark: indigo[50],
            light: indigo[400],
            contrastText: indigo[600],
        },
        background: {
            default: '#000000',
            paper: '#080808',
        }
    },
    typography: {
        allVariants: {
            color: '#FFF',
        }
    }
});
