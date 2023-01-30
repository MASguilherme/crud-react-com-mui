import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Pessoas: React.FC = () => {
  return (
    <LayoutBaseDePagina titulo='Listagem de Pessoas'>
      <FerramentaDeListagem
        textoBotaoNovo='Nova'
        mostrarInputDeBusca
      />
    </LayoutBaseDePagina>
  );
};