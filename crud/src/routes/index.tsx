import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawer, setDrawerOptions } = UseDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: 'pagina-inicial',
        label: 'Página Inicial',
      },
      {
        icon: 'people',
        path: 'pessoas',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>

      <Route path='pagina-inicial'
        element={<Button color='primary' variant='contained'
          onClick={toggleDrawer}>Toggle Drawer</Button>}
      />

      <Route path='pessoas'
        element={<Button color='primary' variant='contained'
          onClick={toggleDrawer}>Toggle Drawer Pessoas</Button>}
      />


      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};