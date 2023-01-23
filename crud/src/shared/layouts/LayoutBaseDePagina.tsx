import { Box, Typography, useTheme, IconButton, Icon, useMediaQuery, Theme } from '@mui/material';

import { UseDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string;

  children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }) => {

  const theme = useTheme();

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { toggleDrawer } = UseDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box height={theme.spacing(12)} display='flex' alignItems='center' gap={1}>

        {
          mdDown && (
            <IconButton onClick={toggleDrawer}>
              <Icon>menu</Icon>
            </IconButton>
          )
        }

        <Typography variant='h4' component='h1' padding={1}>
          {titulo}
        </Typography>

      </Box>

      <Box>
        Barra de Ferramentas
      </Box>

      <Box>
        {children}
      </Box>

    </Box>
  );
};