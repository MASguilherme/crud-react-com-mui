import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material';

interface IFerramentaDeListagemProps {
  textoDeBusca?: string;
  mostrartInputDeBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentaDeListagem: React.FC<IFerramentaDeListagemProps> = ({
  mostrartInputDeBusca = false,
  aoMudarTextoDeBusca,
  textoDeBusca = '',

  mostrarBotaoNovo = true,
  textoBotaoNovo = 'Novo',
  aoClicarEmNovo

}) => {

  const theme = useTheme();

  return (
    <Box display='flex'
      height={theme.spacing(6)}
      alignItems='center'
      component={Paper}
      paddingX={2}
      padding={2}
      marginX={2}
      gap={1}
    >

      <Box display='flex' flex={1}>
        {mostrartInputDeBusca &&
          (<TextField size='small' placeholder='Pesquisar...'
            value={textoDeBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          />)
        }
      </Box>

      {mostrarBotaoNovo &&
        (<Button variant='contained' color='primary'
          endIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>)
      }

    </Box>
  );
};