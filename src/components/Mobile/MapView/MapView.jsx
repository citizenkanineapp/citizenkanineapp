import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, Overlay } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'


import DogCheckinModal from './DogCheckinModal';

//MUI
import {IconButton, Typography, Grid,} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function MapView() {
  useEffect(() => {
    populateMarkers()
  }, [])

  // const dispatch = useDispatch();
  // const user = useSelector(store => store.user);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(false);
  
  const handleOpen = (data) => {
    setModalData(data)
    setOpen(true);
  } 
  
  const route = useSelector(store => store.routeReducer)
  const thisRoute = route[0].route_id
  // console.log('thisRoute', thisRoute);
  //May need to update the below map key in the future 
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright') 
  const [markers, setMarkers] = useState([])
  const history = useHistory();
  
  /*This function handles the logic to populate markers */
  const populateMarkers = () => {
    let idArray = [];
      for (let dogObject of route) {
        idArray.push(dogObject.client_id)
      }
      //finds the unique customer IDs
    let uniqueIds = [...new Set(idArray)]
    //Groups dogs by client ID
    const group = route.reduce((acc, item) => {
      if (!acc[item.client_id]) {
        acc[item.client_id] = [];
      }
      acc[item.client_id].push(item);
      return acc;
    }, {})
    //creates markers based on families and the dogs in the family
    let clientMarkers = []
      for (let i = 0; i < uniqueIds.length; i++) {
        let preClient= group[uniqueIds[i]]
        const { client_name,  street, zip, client_id, lat, long } = preClient[0];
        const client = {client_name, street, zip, client_id, lat, long}
        let dogsPreFilter = preClient.map(dog => { return ({route_id: thisRoute, dog_name: dog.name, dog_id: dog.dog_id, checked_in: dog.checked_in, no_show: dog.no_show, cancelled: dog.cancelled}) })
        client.dogs = dogsPreFilter;
          
        // assigns initial checkin status; determines if all dogs are cancelled.
        let checkinArray = [];
        let cancelledArray = [];
          for (let dog of client.dogs) {
            if (dog.cancelled || dog.no_show || dog.checked_in) {
              checkinArray.push(true)
            } else {
              checkinArray.push(false)
            }
            cancelledArray.push(dog.cancelled)
          }
        
      //  returns TRUE if any of the dog status is either FALSE (already checked in) or NULL (auto-populated and not-checked in)
        if (cancelledArray.some((status) => status != true )) {
          if (checkinArray.length === checkinArray.reduce((a,b)=>a+b,0)) {
            client.checkinStatus=true
            // console.log(checkinArray.length, checkinArray.reduce((a,b)=>a+b,0))
          } else {
            client.checkinStatus=false
          }
        } else {
          client.checkinStatus = null
        }

          clientMarkers.push(client)
      }
      setMarkers(clientMarkers);
      // console.log("markers",clientMarkers)
  }

  const setMarkerColor = (status)=> {
    // console.log(status);
    if (status === true) {
      return 'rgb(79, 6, 214)';
    } else if (status === false) {
      return 'rgb(83, 79, 82)';
    }
  }

  const getRouteColor = (route) => {
    switch (route[0].route) {
      case 'Tangletown': return '#4a5061';
      case 'Emerson': return '#539bd1';
      case 'Far': return '#3DA49D';
      case 'Misfits': return '#f5a572';
      case 'Unassigned': return '#f37e2d';
      default: return '#f8614d';
    }
  }

    const openMap = async (dog) => {
    // takes in address details and encodes them into URI 
    const destination = encodeURIComponent(`${dog.street} ${dog.zip}`);
    // based off of street address and city it pulls up a google map page
    const link = `https://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  return (
    <Grid container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1
      }}>

        <Grid item xs={8} spacing={4} sx={{display:'flex',flexDirection:'row', justifyContent: 'center', alignItems:'center'}}>
          <Grid item xs={4} sx={{mr:4, mb:0 }}>
            <IconButton edge="end" 
              sx={{border: 1, mt: 1,
                flexDirection: 'column', px: 2}}
                onClick={(event) => history.push(`/m/route/${thisRoute}`)}
                >
              <ArrowBackIcon sx={{fontSize: 25, mb: 0}} />
              <Typography>Back</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', ml:4, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
            <Typography variant='h6' sx={{ textAlign: 'center' }}>
              {route[0].route}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.914450, -93.304140]} defaultZoom={13}>
            {/*this modal opens to display more details  */}
            <DogCheckinModal route={route} modalData={modalData} setMarkers={setMarkers} open={open} setOpen={setOpen}/>
            {markers.filter(marker => marker.checkinStatus != null).map((oneMarker, i) => (
              <Marker 
                width={50} 
                anchor={[Number(oneMarker.lat), Number(oneMarker.long)]}
                key={i}
                color={setMarkerColor(oneMarker.checkinStatus)}
                onClick={() => handleOpen(oneMarker)}
              />   
            ))}
              
          </Map>
        </Grid>
    </Grid>
  );
}

export default MapView;
