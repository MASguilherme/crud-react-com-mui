import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material';

import { Environment } from '../../environment';

interface IFerramentaDeListagemProps {
  textoDeBusca?: string;
  mostrarInputDeBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

const { INPUT_DE_BUSCA } = Environment;

export const FerramentaDeListagem: React.FC<IFerramentaDeListagemProps> = ({
  mostrarInputDeBusca = false,
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
        {mostrarInputDeBusca &&
          (<TextField size='small' placeholder={INPUT_DE_BUSCA}
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