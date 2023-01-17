import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppThemeContext, useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDePessoas } from '../pages';

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
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            <Route path="/pessoas" element={<ListagemDePessoas />}/>
            {/* <Route path="pessoas/detalhe/:id" element={<ListagemDeCidade />} /> */}

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>);
};