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

  return (
    <Grid container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-Start',
        alignItems: 'center',
        gap: 1
      }}>

      <MobileTopNav />
      <Typography variant="h4" sx={{ m: 0 }}> Routes </Typography>
      <Grid item sx={{ width: '100%', height: '70rem' }}>
        <Map provider={maptilerProvider} defaultCenter={[44.92306458149502, -93.30491066897952]} defaultZoom={14}>
          <Marker 
            width={50} 
            anchor={[44.92306458149502, -93.30491066897952]} 
            // color={color} 
            // onClick={setHue(hue+20)} 
            />
        </Map>
      </Grid>
    </Grid>
  );
}

export default MapView;