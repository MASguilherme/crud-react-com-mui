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
    useMediaQuery
} from '@mui/material';
import { Box } from '@mui/system';

import { useDrawerContext } from '../../contexts';

interface MenuLateralProps {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<MenuLateralProps> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawer } = useDrawerContext();

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
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary='Página inicial' />
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