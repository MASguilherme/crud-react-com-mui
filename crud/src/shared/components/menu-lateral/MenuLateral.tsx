import {
  ListItemButton, ListItemIcon,
  ListItemText, Icon,
  Drawer, useTheme,
  Divider, List,
  Box, Avatar,
  useMediaQuery
} from '@mui/material';

import { UseDrawerContext } from '../../contexts';

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();

  const { isDrawerOpen, toggleDrawer } = UseDrawerContext();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Drawer open={isDrawerOpen}
        variant={smDown || mdDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawer}
      >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)}
            display='flex' alignItems='center' justifyContent='center'
          >
            <Avatar sx={{ width: theme.spacing(12), height: theme.spacing(12) }}>
              G
            </Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Página Inicial' />
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown || mdDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};