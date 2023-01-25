import { Map, Marker, Overlay } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
import { useDispatch, useSelector } from 'react-redux';
import { usePopper } from 'react-popper';


//MUI
import { Typography, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { useState, useEffect, useRef } from "react";

function MapView() {
  
useEffect(() => {
   populateMarkers()
  }, [])
  
  const route = useSelector(store => store.routeReducer)
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright')
  const [markers, setMarkers] = useState([])
 
  const populateMarkers = () => {
  const markers = route.map(client => {
    return {lat: Number(client.lat), 
            long: Number(client.long), 
            name: client.client_name, 
            street: client.street, 
            zip: client.zip}
       })
  //  console.log(markers)
   setMarkers(markers)
  }

    const openMap = async (dog) => {
    // takes in address details and encodes them into URI 
    const destination = encodeURIComponent(`${dog.street} ${dog.zip}`);
    // based off of street address and city it pulls up a google map page
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }



  const markerRef = useRef()
  const tooltipRef = useRef()
  const {styles, attributes} = usePopper(markerRef.current, tooltipRef.current)


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
      {/* <button onClick={populateMarkers}>Test</button> */}
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.92306458149522, -93.30491066897952]} defaultZoom={14}>
           {markers.map((oneMarker, index) => (
          
             <Marker 
                width={50} 
                anchor={[oneMarker.lat, oneMarker.long]}
                key={index}
                
                onClick={() => openMap(oneMarker)}
                 /> 
         
           ))}
          </Map>
        </Grid>
    </Grid>
  );
}

export default MapView;
