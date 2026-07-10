import Box from '@mui/material/Box';
import {FlightMap} from '../../components/map/FlightMap.tsx';
import {DetailsView} from '../../components/details/DetailsView/DetailsView.tsx';
import styles from './RadarView.module.css';

export function RadarView() {
    return (
        <Box className={styles.main}>
            <Box className={styles.left}>
                <Box className={styles.flightTable}></Box>
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
