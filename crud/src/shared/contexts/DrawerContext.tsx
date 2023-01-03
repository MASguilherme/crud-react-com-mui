import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerProviderProps {
    children: React.ReactNode;
}

interface IDrawerOption {
    label: string;
    path: string;
    icon: string;

}

interface IDrawerContext {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
    drawerOption: IDrawerOption[];
    setDrawerOption: (newDrawerOption: IDrawerOption[]) => void;
}



const DrawerContext = createContext({} as IDrawerContext);

export const useDrawerContext = () => { return useContext(DrawerContext); };

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const [drawerOption, setDrawerOption] = useState<IDrawerOption[]>([]);

    const toggleDrawer = useCallback(() => {
        setDrawerOpen((oldDrawerOpen) => {
            return !oldDrawerOpen;
        });
    }, []);

    const handleSetDrawerOption = useCallback((newDrawerOption: IDrawerOption[]) => {
        setDrawerOption(newDrawerOption);
    }, []);

    return (
        <DrawerContext.Provider value={{
            isDrawerOpen, drawerOption, toggleDrawer,
            setDrawerOption: handleSetDrawerOption
        }}>
            {children}
        </DrawerContext.Provider>
    );
};