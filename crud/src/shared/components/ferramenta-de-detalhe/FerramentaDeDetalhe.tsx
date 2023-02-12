import {
  Typography, useMediaQuery,
  Icon, Divider, Skeleton,
  useTheme, Button,
  Box, Paper,
} from '@mui/material';


interface IFerramentaDeDetalheProps {
  textoBotaoNovo: string;
  textoBotaoSalvar?: string;
  textoBotaoSalvarEFechar?: string;

  mostrarBotaoSalvarEFechar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoNovo?: boolean;

  mostrarBotaoSalvarEFecharCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;

  aoClicarSalvarEFechar?: () => void;
  aoClicarSalvar?: () => void;
  aoClicarVoltar?: () => void;
  aoClicarApagar?: () => void;
  aoClicarNovo?: () => void;
}


export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',
  textoBotaoSalvar = 'Salvar',
  textoBotaoSalvarEFechar = 'Salvar e Fechar',

  mostrarBotaoSalvarEFechar = false,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoNovo = true,

  mostrarBotaoSalvarEFecharCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoNovoCarregando = false,

  aoClicarSalvarEFechar,
  aoClicarApagar,
  aoClicarSalvar,
  aoClicarVoltar,
  aoClicarNovo,

}) => {

  const theme = useTheme();

  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box display='flex'
      // height={theme.spacing(6)}
      alignItems='center'
      component={Paper}
      paddingX={2}
      padding={2}
      marginX={1}
      gap={1}
      flexDirection={smDown ? 'column-reverse' : 'row'}
    >
      {/* Salvar */}
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) &&
        (<Button variant='contained'
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarSalvar}
        >
          <Typography variant='button' noWrap>
            {textoBotaoSalvar}
          </Typography>
        </Button>)
      }
      {mostrarBotaoSalvarCarregando &&
        (<Skeleton width={theme.spacing(13.8)} height={theme.spacing(7.8)} />)
      }

      {/* Salvar e Fechar */}
      {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !mdDown) &&
        (<Button variant='outlined'
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarSalvarEFechar}
        >
          <Typography variant='button' noWrap>
            {textoBotaoSalvarEFechar}
          </Typography>
        </Button>)

      }
      {(mostrarBotaoSalvarEFecharCarregando && !mdDown) &&
        (<Skeleton width={theme.spacing(22.6)} height={theme.spacing(7.8)} />)
      }

      {/* Apagar */}
      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) &&
        (<Button variant='outlined'
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarApagar}
        >
          <Typography variant='button' noWrap>
            Apagar
          </Typography>
        </Button>)
      }
      {mostrarBotaoApagarCarregando &&
        (<Skeleton width={theme.spacing(13.8)} height={theme.spacing(7.8)} />)
      }

      {/* Voltar */}
      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&
        (<Button variant='outlined'
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarVoltar}
        >
          <Typography variant='button' noWrap>
            Voltar
          </Typography>
        </Button>)
      }
      {mostrarBotaoVoltarCarregando &&
        (<Skeleton width={theme.spacing(13.8)} height={theme.spacing(7.8)} />)
      }

      {/* Divider */}
      {!smDown && (<Divider variant='middle' orientation='vertical' />)}

      {/* Novo */}
      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) &&
        (<Button variant='outlined'
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarNovo}
        >
          <Typography variant='button' noWrap>
            {textoBotaoNovo}
          </Typography>
        </Button>)
      }
      {(mostrarBotaoNovoCarregando && !smDown) &&
        (<Skeleton width={theme.spacing(13.8)} height={theme.spacing(7.8)} />)
      }

    </Box>
  );
};