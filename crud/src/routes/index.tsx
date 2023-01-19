import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { UseAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleTheme } = UseAppThemeContext();

    return (
        <Routes>
            <Route path='pagina-inicial'
                element={<Button color='primary' variant='contained' onClick={toggleTheme}>Toggle Theme</Button>} />

            <Route path='*' element={<Navigate to='pagina-inicial' />} />
        </Routes>
    );
}