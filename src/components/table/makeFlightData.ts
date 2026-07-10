import type {Airplane} from './model/Airplane.ts';
import type {AircraftData} from '../query/model/AircraftData.ts';
import type {Aircraft} from '../query/model/Aircraft.ts';

function makeAircraftInfo(military: boolean, interesting: boolean, selected: boolean) {
    const flags: string[] = [];
    if (military) {
        flags.push('MIL');
    }
    if (interesting) {
        flags.push('INT');
    }
    if (selected) {
        flags.push('SEL');
    }
    return flags.join(',');
}

function isMilitary(ac: Aircraft) {
    return !!(ac.dbFlags && (ac.dbFlags & 1) === 1);
}

function isInteresting(ac: Aircraft) {
    return !!(ac.dbFlags && (ac.dbFlags & 2) === 2);
}

export function makeFlightData(data: undefined | AircraftData, icao: string): Airplane[] {
    if (!data) return [];

    return data.ac
        .toSorted((a: Aircraft, b: Aircraft) => a.hex.localeCompare(b.hex))
        .map((ac: Aircraft) => {
            const hex = ac.hex;
            const military: boolean = isMilitary(ac);
            const interesting: boolean = isInteresting(ac);

            const selected: boolean = hex === icao;
            return {
                hex,
                type: ac.t,
                desc: ac.desc,
                registration: ac.r,
                flight: ac.flight,
                latitude: ac.lat,
                longitude: ac.lon,
                altitude: ac.alt_baro,
                info: makeAircraftInfo(military, interesting, selected),
                selected
            };
        });
}
