import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppThemeContext, useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDeCidade } from '../pages';

export const AppRoutes = () => {
    const { toggleTheme } = useAppThemeContext();
    const { toggleDrawer, setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: 'Página Inicial',
                icon: 'home',
                path: '/pagina-incial'
            }, 
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            <Route path="/cidades" element={<ListagemDeCidade />}/>
            {/* <Route path="cidades/detalhe/:id" element={<ListagemDeCidade />} /> */}

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>);
};