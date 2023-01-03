import { Box, IconButton, Icon, Typography, useTheme, useMediaQuery, Theme } from '@mui/material';

interface ILayoutBaseDePaginaProps {
    titulo: string;

    children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> =
    ({ children, titulo }) => {

        const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
        const theme = useTheme();
        return (
            <Box height="100%" display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center"
                    padding={1} height={theme.spacing(12)} gap={1}>
                    {smDown && (<IconButton>
                        <Icon>menu</Icon>
                    </IconButton>)
                    }
                    <Typography variant='h5' component='h1'>
                        {titulo}
                    </Typography>
                </Box>
                <Box>
                    Caixa de Ferramentas
                </Box>
                <Box>
                    {children}
                </Box>
            </Box>
        );
    };