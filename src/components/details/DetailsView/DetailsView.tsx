import {useAppSelector} from '../../../hooks/hooks.ts';
import {Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import DetailsTable from '../DetailsTable/DetailsTable.tsx';
import styles from './DetailsView.module.css';

export function DetailsView() {
    const icao: string = useAppSelector((state): string => state.aircraft.icao);
    const [image, setImage] = useState<undefined | string>();

    useEffect(() => {
        if (icao === '') {
            setImage(undefined);
            return;
        }

        let cancel = false;

        fetch('https://api.planespotters.net/pub/photos/hex/' + icao)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch flight photos: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((res) => {
                if (cancel) {
                    return;
                }

                const photos = res.photos;
                if (Array.isArray(photos) && photos.length > 0) setImage(res.photos?.[0].thumbnail_large?.src);
                else setImage(undefined);
            })
            .catch((error) => {
                if (cancel) {
                    return;
                }
                console.error('Failed to load aircraft image:', error);
                setImage(undefined);
            });

        return () => {
            cancel = true;
        };
    }, [icao]);

    return (
        <Stack className={styles.root} direction={'row'} gap={'1rem'}>
            <Box className={styles.detailsTable}>{icao && <DetailsTable />}</Box>
            <Stack className={styles.gallery}>
                {image && <img className={styles.image} src={image} alt={`Aircraft with ICAO code ${icao}`} />}
            </Stack>
        </Stack>
    );
}
