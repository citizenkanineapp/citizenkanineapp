import { Map, Marker } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
//MUI
import { Typography, Grid } from '@mui/material';



function MapView(){

  const maptilerProvider = maptiler('JAXJd8TmToDTZ2jWk33G', 'bright')

  const pins = [
    {
      lat: 44.923864498868795,
      lng: -93.29356509914665,
      // id
      //color
      //route
    },
    {
      lat: 44.91754385749898,
      lng: -93.29588252759712
      //id
      //color
      //route
    },
    {
      lat:44.929272957132945,
      lng: -93.31150371196686
      //id
      //color
      //route
    }
  ];

    return (
        <Grid container 
          sx={{ display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-Start', 
                alignItems: 'center', 
                gap: 1 }}>

          <MobileTopNav/>
          <Typography variant="h4" sx={{ m: 0 }}> Routes </Typography>
          <Grid item sx={{width: '100%', height: '70rem'}}>
            <Map provider={maptilerProvider} defaultCenter={[44.92306458149502, -93.30491066897952]} defaultZoom={14}>
              {/* <Marker width={50} anchor={[50.879, 4.6997]} /> */}
              { pins.map((pin, i) => (
                <Marker key={i} width={50} anchor={[pin.lat, pin.lng]} />
              ))}

            </Map>
          </Grid>
        </Grid>
      );
}

export default MapView;