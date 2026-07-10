import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Link, useLocation} from 'react-router-dom';
import styles from './FileNotFoundView.module.css';

export function FileNotFoundView() {
    const location = useLocation();

    return (
        <Box className={styles.root}>
            <Stack className={styles.stack} direction={'column'}>
                <h3>Path Not Found</h3>
                <div>{location.pathname}</div>
                <Box className={styles.info}>
                    Go <Link to={'/'}>Home</Link>
                </Box>
            </Stack>
        </Box>
    );
}
