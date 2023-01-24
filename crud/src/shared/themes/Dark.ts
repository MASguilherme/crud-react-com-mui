import { createTheme } from '@mui/material';
import { indigo, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[800],
      dark: indigo[900],
      light: indigo[600],
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
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
