import { createTheme } from '@mui/material';
import { indigo, yellow } from '@mui/material/colors';

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
      main: indigo[600],
      dark: indigo[700],
      light: indigo[500],
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
