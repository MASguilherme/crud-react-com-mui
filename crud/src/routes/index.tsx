
import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <Routes>
      <Route path="/pagina-inicial" element={
        <Button color="primary" variant="contained" onClick={toggleTheme}>
          Página inicial
        </Button>
      } />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>);
};