import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components/';

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina titulo='Página Inicial'
            barraDeFerramentas={
                <FerramentasDeDetalhes />
            }>
            Conteúdo
        </LayoutBaseDePagina >
    );
};