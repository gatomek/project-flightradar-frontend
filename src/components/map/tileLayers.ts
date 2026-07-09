import type {CustomTileLayer} from './FlightMap.types.ts';

export const stadiaMapsTileLayer: CustomTileLayer = {
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
    attribution: '&copy; Stadia Maps'
};

export const openstreetTileLayer: CustomTileLayer = {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

export const basemapsTileLayer: CustomTileLayer = {
    url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
};
