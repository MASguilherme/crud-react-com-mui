
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();
    const { toggleDrawer } = useDrawerContext();

    return (
        <Routes>
            <Route path="/pagina-inicial" element={
                <>
                    <Button color="primary" variant="contained" onClick={toggleTheme}>
                      Página inicial
                    </Button>
                    <Button color="primary" variant="contained" onClick={toggleDrawer}>
                      Toggle Drawer
                    </Button>
                </>
            } />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>);
};