import {
  ListItemButton, ListItemIcon,
  ListItemText, Icon,
  Drawer, useTheme,
  Divider, List,
  useMediaQuery,
  Box, Avatar,
} from '@mui/material';
import { useNavigate, useResolvedPath ,useMatch } from 'react-router-dom';

import { UseDrawerContext } from '../../contexts';

interface IMenuLateralProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  icon: string
  label: string;
  toPage: string;
  onClick: (() => void) | undefined;
}


const ListItemLink: React.FC<IListItemLinkProps> = ({ toPage, icon, label, onClick }) => {

  const resolvedPath = useResolvedPath(toPage);
  const match = useMatch({path: resolvedPath.pathname, end: false});
  const navigate = useNavigate();

  const closeMenu = () => {
    navigate(toPage);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={closeMenu}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

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
              <ListItemLink
                toPage='pagina-inicial'
                icon='home'
                label='Página Inicial'
                onClick={smDown || mdDown ? toggleDrawer : undefined}
              />
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