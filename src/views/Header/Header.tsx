import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RadarIcon from '@mui/icons-material/Radar';
import {useKeycloak} from '@react-keycloak/web';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {NavLink} from 'react-router-dom';
import {type PageConfig, PAGES} from '../../constants/pages.ts';
import styles from './Header.module.css';

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const {keycloak} = useKeycloak();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (): void => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" className={styles.root} variant={'outlined'}>
            <Toolbar variant={'dense'}>
                <RadarIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none'
                    }}
                >
                    FlightRadar
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{display: {xs: 'block', md: 'none'}}}
                    >
                        {PAGES.map((page: PageConfig) => (
                            <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                <NavLink to={page.path} className={styles.xsNavLink}>
                                    {page.label}
                                </NavLink>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <RadarIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />

                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        mr: 1,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none'
                    }}
                >
                    FlightRadar
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {PAGES.map((page: PageConfig) => (
                        <NavLink
                            key={page.path}
                            to={page.path}
                            className={styles.mdNavLink}
                            style={({isActive}) => {
                                return {
                                    textDecoration: isActive ? 'underline' : 'none'
                                };
                            }}
                        >
                            {page.label}
                        </NavLink>
                    ))}
                </Box>

                <Box>
                    {keycloak.authenticated ? (
                        <Box className={styles.logout}>
                            <Typography>{keycloak.tokenParsed?.preferred_username}</Typography>
                            <Tooltip title="Logout">
                                <IconButton onClick={() => keycloak.logout()}>
                                    <PowerSettingsNewIcon className={styles.white} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Tooltip title="Login">
                            <IconButton onClick={() => keycloak.login()}>
                                <PersonIcon className={styles.white} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
