import React from 'react';
import { MapContainer, TileLayer, ZoomControl, LayersControl, FeatureGroup } from 'react-leaflet';
import Markers from './Markers';
// import Bounds from './Bounds';
import 'leaflet/dist/leaflet.css';

import nationalparks from '../data/nationalparks.json';
import europe from '../data/europe.json';


const mapCenter = [39.8283, -98.5795];
const defaultZoom = 3;


const MyMap = () => {

    const mapSettings = {
        zoomControl: false,
        center: mapCenter,
        zoom: defaultZoom
    };
    
    return (
        <MapContainer className='map' {...mapSettings} >
            <ZoomControl position='bottomright' />
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
            <LayersControl position='topright' collapsed={false} >
                <LayersControl.BaseLayer checked name='US National Parks' >
                    <FeatureGroup>
                        <Markers data={nationalparks} />
                    </FeatureGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name='Europe' >
                    <FeatureGroup>
                        <Markers data={europe} name='Europe'/>
                    </FeatureGroup>
                </LayersControl.BaseLayer>
            </LayersControl>
            {/* <Bounds /> */}
        </MapContainer>
    )
};

export default MyMap;
