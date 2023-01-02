import { Map, Marker } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
//MUI
import { Typography, Grid } from '@mui/material';

import { useState } from "react";

function MapView() {
  // during our time we were not able to get this working - so it has been disabled / removed from the nav bar

  const maptilerProvider = maptiler('JAXJd8TmToDTZ2jWk33G', 'bright')
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`
  const [markers, setMarkers] = useState([[44.92306458149502, -93.30491066897952], [44.924, -93.305], [44.923, -93.306]])
 

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
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.92306458149502, -93.30491066897952]} defaultZoom={14}>
           {markers.map((oneMarker, index) => (
            <Marker 
              width={50} 
              anchor={[oneMarker[0], oneMarker[1]]}
              key={index}
              onClick={() => console.log('this is dog', index)}/>
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
