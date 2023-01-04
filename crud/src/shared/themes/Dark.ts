import { createTheme } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';
import { iconButtonClasses } from '@mui/material/IconButton';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: indigo[50],
            dark: indigo[50],
            light: indigo[400],
            contrastText: indigo[600],
        },
        secondary: {
            main: amber[700],
            dark: amber[800],
            light: amber[500],
            contrastText: amber[50]
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
