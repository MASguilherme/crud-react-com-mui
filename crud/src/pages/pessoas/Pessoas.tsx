import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Pessoas: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Pessoas'
      barraDeFerramentas={
        <FerramentaDeListagem
          mostrarInputDeBusca
          textoDeBusca={busca}
          textoBotaoNovo='Nova'
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >

    </LayoutBaseDePagina>
  );
};