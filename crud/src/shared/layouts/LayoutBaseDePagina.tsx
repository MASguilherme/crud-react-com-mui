import { ReactNode } from 'react';
import { Box, Typography, useTheme, IconButton, Icon, useMediaQuery, Theme } from '@mui/material';

import { UseDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string;
  barraDeFerramentas?: ReactNode;
  children: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = (
  { children, titulo, barraDeFerramentas }) => {

  const theme = useTheme();

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { toggleDrawer } = UseDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>

      <Box
        height={theme.spacing(smDown ? 4 : mdDown ? 8 : 12)}
        display='flex' alignItems='center' gap={1}
      >

        {
          mdDown && (
            <IconButton onClick={toggleDrawer}>
              <Icon>menu</Icon>
            </IconButton>
          )
        }

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          textOverflow='ellipsis'
          whiteSpace='nowrap'
          overflow='hidden'
          component='h1'
          padding={1}
        >
          {titulo}
        </Typography>

      </Box>

      {barraDeFerramentas &&
        (<Box>
          {barraDeFerramentas}
        </Box>)
      }

      <Box flex='1' overflow='auto'>
        {children}
      </Box>

    </Box>
  );
};