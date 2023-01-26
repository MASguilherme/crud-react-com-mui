import { createTheme } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
      dark: yellow[900],
      light: yellow[600],
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: red[800],
      dark: red[900],
      light: red[600],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5'
    }
  },

});