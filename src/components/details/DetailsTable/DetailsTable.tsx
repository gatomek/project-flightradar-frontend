import {useMemo} from 'react';
import {type MRT_ColumnDef, MRT_Table, useMaterialReactTable} from 'material-react-table';
import {useLiveAirplanesApi} from '../../../hooks/useLiveAirplanesApi.ts';
import {useAppSelector} from '../../../hooks/hooks.ts';

export interface AircraftParam {
    param: string;
    value?: string | number;
}

export const DetailsTable = () => {
    const location: string = useAppSelector((state) => state.radar.location);
    const {data: liveApiData} = useLiveAirplanesApi({location});
    const icao: string = useAppSelector((state): string => state.aircraft.icao);
    const liveData = liveApiData?.ac.find((ac) => ac.hex === icao);

    const columns = useMemo<MRT_ColumnDef<AircraftParam>[]>(
        () => [
            {
                accessorKey: 'param',
                header: 'Param',
                size: 1,
                muiTableBodyCellProps: {
                    align: 'right',
                    sx: {
                        textAlign: 'left',
                        fontSize: '0.7rem'
                    }
                }
            },
            {
                accessorKey: 'value',
                header: 'Value',
                size: 1,
                muiTableBodyCellProps: {
                    align: 'right',
                    sx: {
                        textAlign: 'right',
                        fontSize: '0.7rem'
                    }
                }
            }
        ],
        []
    );

    const data = useMemo(() => {
        return liveData
            ? [
                  {
                      param: 'ICAO',
                      value: icao
                  },
                  {
                      param: 'Desc',
                      value: liveData.desc
                  },
                  {
                      param: 'Flight',
                      value: liveData.flight
                  },
                  {
                      param: 'Altitude',
                      value: liveData.alt_baro
                  },
                  {
                      param: 'GPS',
                      value: liveData.lat && liveData.lon ? `${liveData.lat} | ${liveData.lon}` : undefined
                  },
                  {
                      param: 'Category',
                      value: liveData.category
                  },
                  {
                      param: 'Type',
                      value: liveData.t
                  },
                  {
                      param: 'Register',
                      value: liveData.r
                  },
                  {
                      param: 'Ground Speed',
                      value: liveData.gs
                  },
                  {
                      param: 'Mach Speed',
                      value: liveData.mach
                  },
                  {
                      param: 'Squawk',
                      value: liveData.squawk
                  },
                  {
                      param: 'Emergency',
                      value: liveData.emergency
                  },
                  {
                      param: 'Nav Modes',
                      value: liveData.nav_modes?.join(', ')
                  }
              ]
            : [];
    }, [icao, liveData]);

    const table = useMaterialReactTable({
        columns,
        data,
        enableKeyboardShortcuts: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        enableDensityToggle: false,
        mrtTheme: (theme) => ({
            baseBackgroundColor: theme.palette.background.default
        }),
        muiTableHeadProps: {
            sx: {
                display: 'none'
            }
        },
        muiTableBodyRowProps: {
            sx: {
                padding: '0px',
                margin: '0px'
            }
        },
        initialState: {
            density: 'compact'
        }
    });

    return <MRT_Table table={table} />;
};

export default DetailsTable;
