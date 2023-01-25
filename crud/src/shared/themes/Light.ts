import { createTheme } from '@mui/material';
import { indigo, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[800],
      dark: yellow[900],
      light: yellow[600],
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: indigo[800],
      dark: indigo[900],
      light: indigo[600],
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5'
    }
  },
  typography: {
    allVariants: {
      color: '#000000'
      
    }
  }

});