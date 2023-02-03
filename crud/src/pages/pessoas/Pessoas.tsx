import { useMemo, useEffect, useState } from 'react';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, LinearProgress, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { PessoasService, IListagemPessoa } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from './../../shared/hooks';
import { Environment } from '../../shared/environment';

export const Pessoas: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca)
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

  }, [busca]);

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
      <TableContainer component={Paper} variant='outlined' sx={{ width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Cidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>Ações</TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.cidadeId}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {
            totalCount === 0 && !isLoading && (
              <Typography sx={{ padding: 1 }}>
                {Environment.LISTAGEM_VAZIA}
              </Typography>)
          }

          {isLoading && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  );
};