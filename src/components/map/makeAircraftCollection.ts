import type {Feature, GeoJsonProperties, Point} from 'geojson';
import type {AircraftData} from '../query/model/AircraftData.ts';
import type {Aircraft} from '../query/model/Aircraft.ts';

const toColorMarker = (ac: Aircraft): undefined | 'TWR' | 'GND' => {
    if (ac.t === 'TWR') {
        return 'TWR';
    }
    if (ac.alt_baro === 'ground') {
        return 'GND';
    }
    return undefined;
};

export function makeAircraftCollection(data: AircraftData | undefined, icao: string): Feature<Point>[] {
    if (!data) {
        return [];
    }

    return data.ac.map((ac): Feature<Point, GeoJsonProperties> => {
        const {hex, lon, lat, alt_baro, t, desc, mag_heading, true_heading, track} = ac;
        const heading = mag_heading ?? true_heading ?? track;
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon, lat]
            },
            properties: {
                desc: `ICAO: ${hex}<br/>ALT: ${alt_baro}<br/>TYPE: ${t}<br/> DESC: ${desc}`,
                type: t,
                icao: hex,
                marker: icao !== '' && icao === hex,
                colorMarker: toColorMarker(ac),
                ...(heading && {heading: heading})
            }
        };
    });
}
