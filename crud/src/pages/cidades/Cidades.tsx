import { useMemo, useEffect, useState } from 'react';

import {
  TableContainer,
  LinearProgress,
  TableFooter,
  Typography,
  Pagination,
  IconButton,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Table,
  Paper,
  Icon,
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { CidadesService, IListagemCidade } from '../../shared/services/api/cidades/CidadesService';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from './../../shared/hooks';
import { Environment } from '../../shared/environment';

export const Cidades: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
          else {
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }

        });
    });

  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar o item selecionado?')) {
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows((oldRows) => {
              return [
                ...oldRows.filter(oldRow => oldRow.id !== id),
              ];
            });
            alert('Apagado com sucesso.');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Cidade'
      barraDeFerramentas={
        <FerramentaDeListagem
          mostrarInputDeBusca
          textoDeBusca={busca}
          textoBotaoNovo='Nova'
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer component={Paper} variant='outlined' sx={{ width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome da Cidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      size='small'
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.nomeCidade}</TableCell>
                </TableRow>
              );
            })}

            {totalCount === 0 && !isLoading && (
              <TableRow>
                <TableCell>
                  <Typography sx={{ padding: 1 }}>
                    {Environment.LISTAGEM_VAZIA}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() },
                      { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};