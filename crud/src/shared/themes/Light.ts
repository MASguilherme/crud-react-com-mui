import { createTheme } from '@mui/material';
import { indigo, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: indigo[700],
            dark: indigo[800],
            light: indigo[500],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: '#FFFFFF'
        },
        background: {
            default: '#FFFFFF',
            paper: '#E7FBF0'
        }
    },


});