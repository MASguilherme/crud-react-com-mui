import { createContext, useState, useCallback, useMemo, useContext } from 'react';
import { ThemeProvider, Box } from '@mui/material';

import { DarkTheme, LightTheme } from './../themes';

interface IThemeContext {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;

  themeText?: string;
  toggleTextTheme?: () => void;
}
interface IAppThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContext);

export const UseAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }} >
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );

};