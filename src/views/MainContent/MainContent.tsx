import Box from '@mui/material/Box';
import {Header} from '../Header/Header.tsx';
import {Outlet} from 'react-router-dom';
import styles from './MainContent.module.css';

export function MainContent() {
    return (
        <Box className={styles.root}>
            <Header />
            <Box className={styles.flexGrow}>
                <Outlet />
            </Box>
        </Box>
    );
}
