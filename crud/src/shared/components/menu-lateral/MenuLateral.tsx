import {
  ListItemButton, ListItemIcon,
  ListItemText, Icon,
  Drawer, useTheme,
  Divider, List,
  useMediaQuery,
  Box, Avatar,
  Typography
} from '@mui/material';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

import { UseDrawerContext, UseAppThemeContext } from '../../contexts';

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
  const match = useMatch({ path: resolvedPath.pathname, end: false });
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

  const { isDrawerOpen, toggleDrawer, drawerOptions } = UseDrawerContext();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleTheme } = UseAppThemeContext();

  return (
    <Box>

      <Drawer open={isDrawerOpen}
        variant={mdDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawer}
      >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>

          <Box width='100%' height={theme.spacing(20)}
            display='flex' alignItems='center' justifyContent='center'
          >
            <Avatar sx={{ width: theme.spacing(12), height: theme.spacing(12) }}>
              <Typography>G</Typography>
            </Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <List>
              {
                drawerOptions.map((drawerOption) => (
                  <ListItemLink
                    key={drawerOption.path}
                    toPage={drawerOption.path}
                    icon={drawerOption.icon}
                    label={drawerOption.label}
                    onClick={mdDown ? toggleDrawer : undefined}
                  />
                ))
              }
            </List>
          </Box>
          <Box>
            <List>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary='Trocar Tema' />
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={mdDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>

    </Box>
  );
};