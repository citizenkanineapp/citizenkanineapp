import { Map, Marker, Overlay } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'
import MobileTopNav from '../MobileNav/MobileTopNav';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";



//MUI
import { Typography, Grid, Button, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsIcon from '@mui/icons-material/Directions';

//style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 120,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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



function MapView() {
  
useEffect(() => {
   populateMarkers()

  }, [])
  
  const route = useSelector(store => store.routeReducer)
  const thisRoute = route[0].route_id
  //May need to update the below map key in the future 
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright') 
  const [markers, setMarkers] = useState([])
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(false);
  const handleOpen = (text) => {
    // console.log(text)
    setModalData(text)
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);
  
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
          let dogsPreFilter = preClient.map(dog => { return ({dog_name: dog.name, dog_id: dog.dog_id }) })
          client.dogs = dogsPreFilter
        // console.log('clients after filter', client)
          clientMarkers.push(client)
      }
      setMarkers(clientMarkers);
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

        <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', mt: 3, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
          <Typography variant='h5' sx={{ textAlign: 'center', px: 5}}>
            {route[0].route}
          </Typography>
        </Grid>
        <Grid item xs={8} sx={{display: 'flex', flexDirection: 'row-reverse', mb: 0}}>
              <IconButton edge="end" 
                  sx={{border: 1, mt: 1,
                  flexDirection: 'column', px: 2}} >
                  <ArrowBackIcon 
                      sx={{fontSize: 25, mb: 0}}
                      onClick={(event) => history.push(`/m/route/${thisRoute}`)}/>
                      <Typography>Back</Typography>
              </IconButton>
        </Grid>
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.914450, -93.304140]} defaultZoom={13}>
            {/*this modal opens to display more details  */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <List>
                    <ListItem disablePadding>
                        <ListItemText primary={modalData.client_name} />
                    </ListItem>
                    {modalData && modalData.dogs.map(dog => (
                    <ListItem disablePadding key={dog.dog_id}>
                        <ListItemIcon>
                          <PetsIcon fontSize="small" />
                        </ListItemIcon>
                          <ListItemText secondary={dog.dog_name} />
                    </ListItem>
                    ))}
                  </List>
                    <Divider />
                  <List>
                    <ListItem disablePadding>
                        <Button 
                        sx={{mt: 1}}
                          variant='contained' 
                          endIcon={<DirectionsIcon />} 
                          size='small' 
                          onClick={() => openMap(modalData)}>
                                Directions
                        </Button>
                      </ListItem>
                      <ListItem disablePadding>
                        <Button 
                        sx={{mt: 1}}
                          variant='contained' 
                          endIcon={<DirectionsIcon />} 
                          size='small' 
                          onClick={() => openMap(modalData)}>
                                CHECK-IN
                        </Button>
                      </ListItem>
                  </List>
                </Box>
            </Modal>
            {/* this maps through markers and displays them on the map */}
              {markers.map((oneMarker, index) => (
                <Marker 
                    width={50} 
                    anchor={[Number(oneMarker.lat), Number(oneMarker.long)]}
                    key={index}
                    onClick={() => handleOpen(oneMarker)}
                    /> 
                ))}
            </Map>
            </Grid>
    </Grid>
  );
}

export default MapView;
