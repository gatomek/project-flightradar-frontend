import {createTheme, type Theme} from '@mui/material/styles';

export const flightTableTheme: Theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: '0.7rem',
                    padding: '0px',
                    margin: '0px'
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.8rem',
                    padding: '1px',
                    margin: '1px'
                }
            }
        }
    }
});
