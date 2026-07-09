import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <AppBar position="sticky" className={styles.root}>
            <Toolbar variant={'dense'} className={styles.center}>
                <Typography noWrap>Gatomek ©2026</Typography>
            </Toolbar>
        </AppBar>
    );
}
