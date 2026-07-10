import Box from '@mui/material/Box';
import {FlightTable} from '../../components/table/FlightTable.tsx';
import {FlightMap} from '../../components/map/FlightMap.tsx';
import {DetailsView} from '../../components/details/DetailsView/DetailsView.tsx';
import styles from './AircraftsView.module.css';

export function AircraftsView() {
    return (
        <Box className={styles.main}>
            <Box className={styles.left}>
                <Box className={styles.flighttable}>
                    <FlightTable />
                </Box>
                <Box className={styles.detailsView}>
                    <DetailsView />
                </Box>
            </Box>
            <Box className={styles.right}>
                <FlightMap />
            </Box>
        </Box>
    );
}
