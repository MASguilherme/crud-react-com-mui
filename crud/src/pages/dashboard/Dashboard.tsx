import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard: React.FC = () => {

  const [totalCountCidades, setTotalCountCidade] = useState(0);
  const [totalCountPessoas, setTotalCountPessoa] = useState(0);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);

  useEffect(() => {

    setIsLoadingPessoas(true);
    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPessoa(result.totalCount);
        }
      });

    setIsLoadingCidades(true);
    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCidade(result.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBaseDePagina titulo='Página Inicial'
      barraDeFerramentas={
        <FerramentaDeListagem mostrarBotaoNovo={false} />
      }
    >
      <Box>
        <Grid container>
          <Grid item container gap={2}>
            <Grid item xs={12} md={8} lg={5}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>
                  <Box paddingY={3} minHeight={115}>
                    {!isLoadingPessoas && (<Typography variant='h1' align='center'>
                      {totalCountPessoas}
                    </Typography>)}
                    {isLoadingPessoas && (<Typography variant='h3' align='center'>
                      Carregando...
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={5}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>
                  <Box padding={3} minHeight={115}>
                    {!isLoadingCidades && (<Typography variant='h1' align='center'>
                      {totalCountCidades}
                    </Typography>)}

                    {isLoadingCidades && (<Typography variant='h3' align='center'>
                      Carregando...
                    </Typography>)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};