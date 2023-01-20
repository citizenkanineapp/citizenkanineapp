import { Map, Marker } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
import { useDispatch, useSelector } from 'react-redux';


//MUI
import { Typography, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { useState, useEffect } from "react";

function MapView() {
  
useEffect(() => {
   populateMarkers()
  }, [])
  
  const route = useSelector(store => store.routeReducer)
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright')
  const [markers, setMarkers] = useState([])
 
  const populateMarkers = () => {
   const markers = route.map(client => {
    return {lat: Number(client.lat), long: Number(client.long), name: client.name}
   })
  //  console.log(markers)
   setMarkers(markers)
   testFunction()
  }
  const testFunction = () => {
    console.log('markers right now ------>', markers)
    // for (let marker of markers){
    //   console.log(marker[lat])
    // }
  }

  return (
    <Grid container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-Start',
        alignItems: 'center',
        gap: 1
      }}>

      {/* <MobileTopNav /> */}
      <Typography variant="h4" sx={{ m: 0 }}> Routes </Typography>
      <button onClick={populateMarkers}>Test</button>
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.92306458149522, -93.30491066897952]} defaultZoom={14}>
           {markers.map((oneMarker, index) => (
            <Marker 
              width={50} 
              anchor={[oneMarker.lat, oneMarker.long]}
              key={index}
              onHover={() => console.log('hi')}
              onClick={() => console.log('this is dog', oneMarker.name)}
              />
           ))}
            {/* <Marker 
              width={50} 
              anchor={[44.92306458149502, -93.30491066897952]} 
              />
            <Marker 
            width={50} 
            anchor={[44.924, -93.305]} 
            /> */}
          </Map>
        </Grid>
    </Grid>
  );
}

export default MapView;
