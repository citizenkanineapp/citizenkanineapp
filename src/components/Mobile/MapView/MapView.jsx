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
  const handleOpen = (text) => {
    console.log(text)
    setModalData(text)
    setOpen(true);
  } 
  
  const route = useSelector(store => store.routeReducer)
  const thisRoute = route[0].route_id
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
        let dogsPreFilter = preClient.map(dog => { return ({dog_name: dog.name, dog_id: dog.dog_id, checked_in: dog.checked_in, no_show: dog.no_show, cancelled: dog.cancelled}) })
        client.dogs = dogsPreFilter;
          
        // assigns initial checkin status; determines if all dogs are cancelled.
        let checkinArray = [];
          for (let dog of client.dogs) {
            checkinArray.push(dog.cancelled)
          }
          //returns TRUE if any of the dog status is either FALSE (already checked in) or NULL (auto-populated and not-checked in)
          if (checkinArray.some((status) => status != true )) {
            client.checkinStatus = 'incomplete'
          } else {
            client.checkinStatus = 'cancelled'
          }

          clientMarkers.push(client)
      }
      setMarkers(clientMarkers);
      console.log("markers",clientMarkers)
  }


  const setMarkerColor = (status)=> {
    // console.log(status);
    if (status === 'incomplete') {
      return 'rgb(79, 6, 214)';
    } else if (status === 'complete') {
      return 'rgb(83, 79, 82)';
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

        <Grid item xs={8} sx={{display: 'flex', flexDirection: 'row-reverse', mb: 0}}>
          <IconButton edge="end" 
            sx={{border: 1, mt: 1,
            flexDirection: 'column', px: 2}}
            onClick={(event) => history.push(`/m/route/${thisRoute}`)}
          >
            <ArrowBackIcon sx={{fontSize: 25, mb: 0}} />
            <Typography>Back</Typography>
          </IconButton>
        </Grid>
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.914450, -93.304140]} defaultZoom={13}>
            {/*this modal opens to display more details  */}
            <DogCheckinModal route={route} modalData={modalData} setModalData={setModalData} setMarkers={setMarkers} markers={markers} open={open} setOpen={setOpen}/>
            {markers.filter(marker => marker.checkinStatus != 'cancelled').map((oneMarker, i) => (
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
