import { Map, Marker, Overlay } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";



//MUI
import { Typography, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


//style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





function MapView() {
  
useEffect(() => {
   populateMarkers()
  }, [])
  
  const route = useSelector(store => store.routeReducer)
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright')
  const [markers, setMarkers] = useState([])

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  
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



  // const markerRef = useRef()
  // const tooltipRef = useRef()
  // const {styles, attributes} = usePopper(markerRef.current, tooltipRef.current)


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
                // onClick={() => openMap(oneMarker)}
                // onClick={handleOpen}
                // onMouseOver={({event: HTMLMouseEvent, anchor: Point}) => console.log('hiii')}
                
                 /> 
           ))}
          </Map>
        </Grid>
    </Grid>
  );
}

export default MapView;
