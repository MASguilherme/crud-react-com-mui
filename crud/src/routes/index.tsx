import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UseDrawerContext } from '../shared/contexts';
import { Dashboard, Pessoas, DetalheDePessoa, Cidades, DetalheCidades } from '../pages';

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
      {
        icon: 'location_city',
        path: 'cidades',
        label: 'Cidades',
      }
    ]);
  }, []);

  return (
    <Routes>

      <Route path='pagina-inicial' element={<Dashboard />} />

      <Route path='pessoas' element={<Pessoas />} />
      <Route path='pessoas/detalhe/:id' element={<DetalheDePessoa />} />

      <Route path='cidades' element={<Cidades />} />
      <Route path='cidades/detalhe/:id' element={<DetalheCidades />} />

      <Route path='*' element={<Navigate to='pagina-inicial' />} />

    </Routes>
  );
};