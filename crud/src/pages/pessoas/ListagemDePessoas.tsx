import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    TableContainer, Table,
    TableHead, TableBody,
    TableRow, TableCell,
    Paper, TableFooter,
    LinearProgress,
    Pagination
} from '@mui/material';

import { PessoaService, IListagemPessoas } from '../../shared/services/api/pessoas/PessoaService';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoas[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return searchParams.get('pagina') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoaService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    }
                });
        });

    }, [busca]);


    return (
        <LayoutBaseDePagina titulo='Listagem de Pessoas'
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputDaBusca
                    textoBotao='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }>

            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>E-mail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {!totalCount && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}
                    <TableFooter>
                        {isLoading &&
                            (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) &&
                            (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Pagination
                                            count={10} 

                                        />
                                    </TableCell>
                                </TableRow>
                            )

                        }
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    );
};