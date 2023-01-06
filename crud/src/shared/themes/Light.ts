import { createTheme } from '@mui/material';
import { amber, grey, indigo } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: amber[700],
            dark: amber[800],
            light: amber[500],
            contrastText: amber[50]
        },
        secondary: {
            main: indigo[600],
            dark: indigo[800],
            light: indigo[400],
            contrastText: indigo[50],
        },
        background: {
            default: grey[300],
            paper: grey[50]
        }
    }
});
