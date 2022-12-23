import {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext,
} from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';

import { LightTheme, DarkTheme } from './../themes';

interface ThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeContext = createContext({} as ThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
}) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName((oldThemeName) =>
            oldThemeName === 'light' ? 'dark' : 'light'
        );
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme;
    }, [themeName]);

    const bgColor = theme.palette.background.default;

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={bgColor}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
