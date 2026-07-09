import type {MRT_ColumnDef} from 'material-react-table';
import type {Airplane} from './model/Airplane.ts';

export const flightTableColumns: MRT_ColumnDef<Airplane>[] = [
    {
        accessorFn: (row) => row.hex,
        header: 'ICAO',
        size: 50
    },
    {
        accessorKey: 'flight',
        header: 'Flight',
        size: 50
    },
    {
        accessorKey: 'registration',
        header: 'Register',
        size: 50
    },
    {
        accessorKey: 'type',
        header: 'Type',
        size: 50
    },
    {
        accessorKey: 'altitude',
        header: 'Altitude',
        size: 50
    },
    {
        accessorKey: 'info',
        header: 'Info',
        size: 50,
        filterVariant: 'multi-select',
        filterSelectOptions: ['MIL', 'SEL', 'INT'],
        columnFilterModeOptions: ['contains']
    }
];
