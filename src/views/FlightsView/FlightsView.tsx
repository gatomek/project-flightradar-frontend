import Box from '@mui/material/Box';
import styles from './FlightsView.module.css';
import {FlightTable} from '../../components/table/FlightTable.tsx';
import {FlightMap} from '../../components/map/FlightMap.tsx';

export function FlightsView() {
    return (
        <Box className={styles.main}>
            <Box className={styles.left}>
                <Box className={styles.flighttable}>
                    <FlightTable />
                </Box>
                <Box className={styles.detailsView}></Box>
            </Box>
            <Box className={styles.right}>
                <FlightMap />
            </Box>
        </Box>
    );
}
