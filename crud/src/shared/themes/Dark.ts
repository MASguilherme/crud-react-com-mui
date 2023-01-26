import { createTheme } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c'
    },
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
      
    }
  }
});
