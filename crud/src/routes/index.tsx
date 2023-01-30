import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/contexts';
import { Dashboard, Pessoas } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = UseDrawerContext();

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
        element={
          <Dashboard />
        }
      />

      <Route path='pessoas'
        element={
          <Pessoas />
        }
      />

      {/* <Route path='pessoas/detalhe/:id'
        element={
          <Pessoas />
        }
      /> */}


      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};