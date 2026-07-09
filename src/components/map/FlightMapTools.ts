import {paramsToTowerIcon} from './icon/towerIconUtils.ts';
import {paramsToGroundIcon} from './icon/groundIconUtils.ts';
import {paramsToFlightIcon} from './icon/flightIconUtils.ts';

export const getClassNameByMarkerCount = (count: number): string => {
    if (count > 100) {
        return 'cluster-large';
    }

    if (count > 10) {
        return 'cluster-medium';
    }

    return 'cluster-small';
};

export const paramsToIcon = (
    colorMarker: undefined | string,
    marker: undefined | boolean,
    heading: undefined | number
) => {
    if (colorMarker === 'TWR') {
        return paramsToTowerIcon(marker);
    }
    if (colorMarker === 'GND') {
        return paramsToGroundIcon(marker, heading);
    }

    return paramsToFlightIcon(marker, heading);
};

export const degreeToRadians = (degree: number): number => (degree * Math.PI) / 180;
