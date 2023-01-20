import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { UseDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawer } = UseDrawerContext();

  return (
    <Routes>
      <Route path='pagina-inicial'
        element={<Button color='primary' variant='contained' onClick={toggleDrawer}>Toggle Drawer</Button>} />

      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};