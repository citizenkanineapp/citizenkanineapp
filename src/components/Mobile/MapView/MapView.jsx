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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PetsIcon from '@mui/icons-material/Pets';
import ListItemButton from '@mui/material/ListItemButton';

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


function MapView() {
  
useEffect(() => {
   populateMarkers()
  }, [])
  
  const route = useSelector(store => store.routeReducer)
  const maptilerProvider = maptiler('WjRnaGgNsm0nHmNUpFSq', 'bright')
  const [markers, setMarkers] = useState([])

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(false);
  const handleOpen = (text) => {
    // console.log(text)
    setModalData(text)
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);
  
  const populateMarkers = () => {

    let idArray = [];
      for (let dogObject of route) {
     
        idArray.push(dogObject.client_id)
      }

  
    let uniqueIds = [...new Set(idArray)]
    const group = route.reduce((acc, item) => {
      if (!acc[item.client_id]) {
        acc[item.client_id] = [];
      }

      acc[item.client_id].push(item);
      return acc;
    }, {})

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
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
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
      <Typography variant="h4" sx={{ m: 0 }}> {route[0].route} </Typography>
      {/* <button onClick={populateMarkers}>Test</button> */}
        <Grid item sx={{ width: '100%', height: '45rem' }}>
          <Map provider={maptilerProvider} defaultCenter={[44.914450, -93.304140]} defaultZoom={13}>
          
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
          <ListItemButton color="primary">
              <ListItemText secondary="Open Google Maps"
                onClick={() => openMap(modalData)}
                secondaryTypographyProps={{
                  color: 'secondary',
                  fontWeight: 'medium',
                  variant: 'body2',
                }} />
          </ListItemButton>
          </ListItem>
        </List>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalData.client_name}
          </Typography>
          {modalData && modalData.dogs.map(dog => (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {dog.dog_name}
          </Typography>
          ))}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}  onClick={() => openMap(modalData)} >
            Open Google Maps
          </Typography> */}
        </Box>
      </Modal>
           {markers.map((oneMarker, index) => (
             
             <Marker 
                width={50} 
                anchor={[Number(oneMarker.lat), Number(oneMarker.long)]}
                key={index}
                // onClick={() => openMap(oneMarker)}
                onClick={() => handleOpen(oneMarker)}
                // onMouseOver={({event: HTMLMouseEvent, anchor: Point}) => console.log('hiii')}
                
                 /> 
           ))}
          </Map>
        </Grid>
    </Grid>
  );
}

export default MapView;
