import {useAppSelector} from '../../hooks/hooks.ts';
import {Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import DetailsTable from './DetailsTable.tsx';

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
        <Stack
            direction={'row'}
            gap={'1rem'}
            sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
                padding: '0px',
                margin: '0px'
            }}
        >
            <Box
                sx={{
                    width: '35%',
                    m: 'auto',
                    mt: '0rem',
                    verticalAlign: 'top',
                    maxHeight: '430px',
                    overflow: 'auto'
                }}
            >
                {icao && <DetailsTable />}
            </Box>
            <Stack
                sx={{
                    width: '65%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {image && (
                    <img
                        src={image}
                        alt={`Aircraft with ICAO code ${icao}`}
                        style={{
                            objectFit: 'contain',
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}
