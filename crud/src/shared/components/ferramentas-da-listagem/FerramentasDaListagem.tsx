
import { Box, Button, TextField, Paper, useTheme, Icon } from '@mui/material';

interface IFerramentasDaListagem {
    textoDaBusca?: string;
    mostrarInputDaBusca?: boolean;
    aoMudarTextoDaBusca?: (novoTexto: string) => void;
    textoBotao?: string;
    mostrarBotao?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagem> = ({
    textoDaBusca = '',
    mostrarInputDaBusca = false,
    aoMudarTextoDaBusca,
    textoBotao = 'Novo',
    mostrarBotao = true,
    aoClicarEmNovo,
}) => {
    const theme = useTheme();

    return (
        <Box component={Paper}
            height={theme.spacing(5)}
            display='flex'
            paddingX={2}
            padding={1}
            marginX={1}
            gap={1}
            alignItems='center'>

            {mostrarInputDaBusca && (<TextField
                size='small'
                placeholder='Pesquisar...'
                value={textoDaBusca}
                onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)} />)
            }

            <Box display='flex' flex={1} justifyContent='end'>
                {mostrarBotao && (
                    <Button
                        color='primary'
                        variant='contained'
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                    >{textoBotao}
                    </Button>)
                }
            </Box>

        </Box>
    );
};  