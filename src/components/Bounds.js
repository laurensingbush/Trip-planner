import { useEffect } from 'react';
import {useMap} from 'react-leaflet';

import nationalparks from '../data/nationalparks';
import europe from '../data/europe.json';


const Bounds = () => {
  const map = useMap();
  const nationalParkCoords = [];
  const europeCoords = []
  nationalparks.features.map((location) => {
    nationalParkCoords.push(location.geometry.coordinates.slice().reverse());
  });
  europe.features.map((location) => {
    europeCoords.push(location.geometry.coordinates.slice().reverse());
  });
  europeCoords.splice(0, 1);
  

  
  useEffect(() => {
    map.on('baselayerchange', (e) => {
      switch (e.name) {
        case 'US National Parks':
          map.fitBounds(nationalParkCoords, {padding: [50,50]});
          break;
        case 'Europe':
          map.fitBounds(europeCoords, {padding: [50,50]});
          break;
        default: 
          return;
      }
    });
  }, []);
    
  return null;

};

export default Bounds;

