import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMapEvent } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';

import L from 'leaflet';
import './Markers.css';


const Markers = (props) => {
    const context = useLeafletContext();
    const layerRef = useRef();
    const [bounds, setBounds] = useState({});
    const coords = [];
    
    useEffect(() => {
        
        // create geoJSON layer instance
        layerRef.current = new L.geoJSON(props.data, {
            pointToLayer: tripStopPointToLayer
        });
        
        // add layer to a container provided in the context
        const container = context.layerContainer || context.map;
        container.addLayer(layerRef.current);
        
        // add coordinates to an array
        props.data.features.forEach((location) => {
            coords.push(location.geometry.coordinates.slice().reverse());
        });
        // connect marker points with lines
        L.polyline(coords, {color: 'var(--main-blue)'}).addTo(container);

        // update current bounds
        setBounds(layerRef.current.getBounds());
      

        // return clean-up function to remove layer from container
        return () => {
            container.removeLayer(layerRef.current);
        }
        // eslint-disable-next-line
    }, []);
    
   
    // fit bounds on baselayerchange event
    const onChange = useCallback((e) => {
        context.map.fitBounds(bounds);
    }, [bounds, context.map]);
    useMapEvent('baselayerchange', onChange);


    return null;
};

Markers.propTypes = {
    data: PropTypes.object
}

export default Markers;


// function to add markers and popups
function tripStopPointToLayer(feature = {}, latlng) {
    const { properties = {} } = feature;
    const { placename, image, todo = []  } = properties;
    
    let todoListString = '';
    let imageString = '';
    let popupText = '';

    const todoList = todo.map(todoListItem => `<li>${ todoListItem }</li>`);

    if ( Array.isArray(todoList) && todoList.length > 0 ) {
        todoListString = todoList.join('');
        todoListString = `
            <ul class="todo-list">${todoListString}</ul>
        `;
    };

    if ( image ) {
        imageString= `
            <span class="popup-image" style="background-image: url(${image})"></span>
        `;
    };

    if (properties.placename !== 'Des Moines, IA') {
        popupText = `
            <div class="popup">
                ${ imageString }
                <div class="popup-content">
                    <h2>${placename}</h2>
                    <p>Things to do:</p>
                    ${ todoListString }
                </div>
            </div>
        `; 
    } else {
        popupText = `
            <div class="popup-start">
                <div class="popup-start-content popup-content">
                    <h2>${placename}</h2>
                    <p>Where we start!</p>
                </div>
            </div>
        `;
    };

    // create the popup
    const popup = L.popup({
        maxWidth: 400
    }).setContent(popupText);

    //create the marker and bind the popup
    const layer = L.marker( latlng, {
        icon: L.divIcon({
            className: 'icon',
            html: `<span class="marker-icon"></span>`,
            iconSize: 20
        }), riseOnHover: true
    }).bindPopup(popup);
    
    return layer;
};
