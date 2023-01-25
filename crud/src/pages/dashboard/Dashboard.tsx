import { FerramentaDeListagem, FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBaseDePagina titulo='Página Inicial'
      barraDeFerramentas={
        <FerramentaDeDetalhe
          textoBotaoNovo='Novo'
        />
      }
    >
      Layout Base
    </LayoutBaseDePagina>
  );
};