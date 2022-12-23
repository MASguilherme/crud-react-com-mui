import { createTheme } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
      dark: indigo[800],
      light: indigo[400],
      contrastText: indigo[50],
    },
    secondary: {
      main: amber[700],
      dark: amber[800],
      light: amber[500],
      contrastText: amber[50]
    },
    background: {
      default: '#0A2647',
      paper: '#205295',
    }
  },
});
