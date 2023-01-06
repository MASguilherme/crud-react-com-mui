import { Box, Paper, Button, useTheme, Icon, Divider } from '@mui/material';


export const FerramentasDeDetalhes: React.FC = () => {
    const theme = useTheme();
    return (
        <Box
            component={Paper}
            display='flex'
            height={theme.spacing(5)}
            paddingX={2}
            padding={1}
            margin={1}
            gap={1}
            alignItems='center'
        >
            <Button
                variant='contained'
                color='primary'
                startIcon={<Icon>save</Icon>}
            >
                Salvar
            </Button>
            <Button
                variant='outlined'
                color='primary'
                startIcon={<Icon>save</Icon>}
            >
                Salvar e Continuar
            </Button>
            <Button
                variant='outlined'
                color='primary'
                startIcon={<Icon>delete_outline</Icon>}
            >
                Apagar
            </Button>
            <Button
                variant='outlined'
                color='primary'
                startIcon={<Icon>add</Icon>}
            >
                Novo
            </Button>

            <Divider variant='middle' orientation='vertical' />

            <Button
                variant='outlined'
                color='primary'
                startIcon={<Icon>arrow_back</Icon>}
            >
                Voltar
            </Button>
        </Box>
    );
};