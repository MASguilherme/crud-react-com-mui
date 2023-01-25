import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';


interface IFerramentaDeDetalheProps {
  textoBotaoNovo: string;

  mostrarBotaoSalvarEVoltar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoNovo?: boolean;

  aoClicarSalvarEVoltar?: () => void;
  aoClicarSalvar?: () => void;
  aoClicarVoltar?: () => void;
  aoClicarApagar?: () => void;
  aoClicarNovo?: () => void;
}


export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoSalvarEVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoNovo = true,
  
  aoClicarSalvarEVoltar,
  aoClicarApagar,
  aoClicarSalvar,
  aoClicarVoltar,
  aoClicarNovo,

}) => {

  const theme = useTheme();

  return (
    <Box display='flex'
      height={theme.spacing(6)}
      alignItems='center'
      component={Paper}
      paddingX={2}
      padding={1}
      marginX={2}
      gap={1}
    >
      <Button variant='contained'
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>

      <Button variant='outlined'
        startIcon={<Icon>save</Icon>}
      >
        Salvar e Voltar
      </Button>

      <Button variant='outlined'
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>

      <Button variant='outlined'
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>

      <Divider variant='middle' orientation='vertical' />

      <Button variant='outlined'
        startIcon={<Icon>add</Icon>}
      >
        {textoBotaoNovo}
      </Button>


    </Box>
  );
};