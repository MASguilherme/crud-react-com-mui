import { createTheme } from '@mui/material';
import { indigo, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: indigo[800],
      dark: indigo[900],
      light: indigo[600],
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
      paper: '#F5F5F5'
    }
  },


});