import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components/';

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina titulo='Página Inicial'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputDaBusca/>
            }>
            Conteúdo
        </LayoutBaseDePagina>
    );
};