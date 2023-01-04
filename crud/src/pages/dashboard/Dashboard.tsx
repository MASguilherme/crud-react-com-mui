import { LayoutBaseDePagina } from '../../shared/layouts';
export const Dashboard = () => {
    return (
        <LayoutBaseDePagina titulo='Página Inicial'
            barraDeFerramentas={<>Barra de Ferramentas</>}>
            Conteúdo
        </LayoutBaseDePagina>
    );
};