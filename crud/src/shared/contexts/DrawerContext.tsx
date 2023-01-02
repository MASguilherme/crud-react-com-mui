import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerProviderProps {
    children: React.ReactNode;
}

interface IDrawerContext {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;

}

const DrawerContext = createContext({} as IDrawerContext);

export const useDrawerContext = () => { return useContext(DrawerContext); };

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        setDrawerOpen((oldDrawerOpen) => {
            return !oldDrawerOpen;
        });
    }, []);
    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};