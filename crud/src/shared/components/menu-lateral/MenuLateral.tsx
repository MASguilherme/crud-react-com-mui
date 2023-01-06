import {
    Drawer,
    useTheme,
    Avatar,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Icon,
    ListItemIcon,
    useMediaQuery,
    Box
} from '@mui/material';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

import { useAppThemeContext, useDrawerContext } from '../../contexts';

interface MenuLateralProps {
    children: React.ReactNode;
}

interface ListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ label, icon, to, onClick }) => {

    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);

    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };
    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};



export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawer, drawerOption } = useDrawerContext();
    const { toggleTheme } = useAppThemeContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'}
                onClose={toggleDrawer}>
                <Box width={theme.spacing(26)} height='100%'
                    padding={theme.spacing(2)} display='flex' flexDirection='column'>

                    <Box width='100%' height={theme.spacing(20)}
                        display='flex' alignItems='center'
                        justifyContent='center'>

                        <Avatar
                            sx={{ width: theme.spacing(12), height: theme.spacing(12) }}>
                            User
                        </Avatar>

                    </Box>

                    <Divider />

                    <Box flex='1'>
                        <List component='nav'>
                            {drawerOption.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    label={drawerOption.label}
                                    to={drawerOption.path}
                                    onClick={smDown ? toggleDrawer : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Alterar Tema' />
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>
            </Drawer>
            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(30.5)}>
                {children}
            </Box>
        </>
    );
};