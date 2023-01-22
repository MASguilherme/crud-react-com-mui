import { createContext, useContext, useState, useCallback } from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOption: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const UseDrawerContext = () => {
  return useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawer = useCallback(() => {
    return setIsDrawerOpen(statusDrawerOpen => !statusDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOption: IDrawerOption[]) => {
    return setDrawerOptions(newDrawerOption);
  }, []);

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, toggleDrawer, drawerOptions, setDrawerOptions: handleSetDrawerOptions }}
    >
      {children}
    </DrawerContext.Provider>
  );
};