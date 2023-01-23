import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from '../pages';
import { UseDrawerContext } from '../shared/contexts';

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
          <Dashboard />
        }
      />


      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};