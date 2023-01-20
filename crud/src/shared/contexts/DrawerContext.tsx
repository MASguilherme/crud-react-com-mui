import { createContext, useContext, useState, useCallback } from 'react';


interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
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

  const toggleDrawer = useCallback(() => {
    return setIsDrawerOpen(statusDrawerOpen => !statusDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};