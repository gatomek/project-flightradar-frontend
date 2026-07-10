import {stadiaMapsTileLayer} from './tileLayers.ts';
import {useCallback, useMemo, useState} from 'react';
import {useLiveAirplanesApi} from '../../hooks/useLiveAirplanesApi.ts';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type {Feature, Point} from 'geojson';
import L, {type LatLngTuple, type LeafletMouseEvent} from 'leaflet';
import {MapContainer, Marker, TileLayer, Tooltip, useMapEvent} from 'react-leaflet';
import {makeAircraftCollection} from './makeAircraftCollection.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks.ts';
import {resetIcao, setIcao} from '../../app/aircraft-slice.ts';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import 'leaflet-rotate';
import 'leaflet.markercluster';
import {type CustomTileLayer, type MapClickHandlerProps} from './FlightMap.types.ts';
import {degreeToRadians, getClassNameByMarkerCount, paramsToIcon} from './FlightMapTools.ts';
import styles from './FlightMap.module.css';

const DEFAULT_POSITION: LatLngTuple = [52.162, 20.96];

function TileLayerSetter(props: Readonly<CustomTileLayer>) {
    return <TileLayer url={props.url} attribution={props.attribution} detectRetina={false} />;
}

const MapClickHandler = (props: Readonly<MapClickHandlerProps>) => {
    useMapEvent('click', props.onMapClick); // Attach a click event to the map
    return null;
};

const createClusterCustomIcon = (cluster: L.MarkerCluster) => {
    const count = cluster.getChildCount();
    return L.divIcon({
        html: `<span>${count}</span>`,
        className: `cluster-icon ${getClassNameByMarkerCount(count)}`,
        iconSize: L.point(33, 33, true)
    });
};

export function FlightMap() {
    const [tileLayer] = useState<CustomTileLayer>(stadiaMapsTileLayer);
    const location: string = useAppSelector((state) => state.radar.location);
    const {data} = useLiveAirplanesApi({location});
    const icao: string = useAppSelector((state) => state.aircraft.icao);
    const dispatch = useAppDispatch();

    const aircraftCollection: Feature<Point>[] = useMemo(() => makeAircraftCollection(data, icao), [data, icao]);

    const onMapClickHandler = useCallback(() => dispatch(resetIcao()), [dispatch]);

    const onMarkerClickHandler = useCallback(
        (evt: LeafletMouseEvent, feature: Feature): void => {
            dispatch(setIcao(feature.properties?.icao ?? ''));
            L.DomEvent.stopPropagation(evt);
        },
        [dispatch]
    );

    const featureToMarker = (f: Feature<Point>) => (
        <Marker
            key={f.properties?.icao}
            title={f.properties?.icao}
            position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            icon={paramsToIcon(f.properties?.colorMarker, f.properties?.marker, f.properties?.heading)}
            rotation={degreeToRadians(f.properties?.heading ?? 0)}
            eventHandlers={{
                click: (evt) => {
                    onMarkerClickHandler(evt, f);
                }
            }}
        >
            <Tooltip direction={'top'} opacity={0.75} content={f.properties?.desc} />
        </Marker>
    );

    const markerAircrafts: Feature<Point>[] = [];
    const otherAircrafts: Feature<Point>[] = [];
    for (const f of aircraftCollection) {
        if (f.properties?.icao === icao) {
            markerAircrafts.push(f);
        } else {
            otherAircrafts.push(f);
        }
    }

    return (
        <MapContainer
            className={styles.root}
            center={DEFAULT_POSITION}
            zoom={10}
            scrollWheelZoom={true}
            doubleClickZoom={false}
        >
            <TileLayerSetter url={tileLayer.url} attribution={tileLayer.attribution} />
            <MapClickHandler onMapClick={onMapClickHandler} />
            <MarkerClusterGroup
                chunkedLoading={true}
                maxClusterRadius={100}
                disableClusteringAtZoom={8}
                animateAddingMarkers={false}
                animate={true}
                removeOutsideVisibleBounds={true}
                showCoverageOnHover={false}
                chunkDelay={300}
                chunkInterval={300}
                iconCreateFunction={createClusterCustomIcon}
                spiderfyOnMaxZoom={false}
            >
                {otherAircrafts.map((f) => featureToMarker(f))}
            </MarkerClusterGroup>
            {markerAircrafts.map((f) => featureToMarker(f))}
        </MapContainer>
    );
}
