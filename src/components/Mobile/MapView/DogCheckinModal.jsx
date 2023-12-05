// imports

import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

// This imports the DogCheckIn component.
// DogCheckIn and was refactored from its original implementation as part of the Route component (../Route/Route.jsx)
import DogCheckIn from '../Route/CheckIn'

// MUI imports
import { Accordion, AccordionSummary, AccordionDetails, Stack, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DirectionsIcon from '@mui/icons-material/Directions';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//style for modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function DogCheckinModal ({modalData, open, setOpen, route, setMarkers}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => setOpen(false);

  // this function checks-in all dogs of a given client via the maps view. This finalized a major feature improvement,
  // allowing employees/users to use the interactive maps view to keep track of dogs they have checked in fo the day.
  // duplicates some of the logic of the 'checkInDog()' function in the imported DogCheckIn component

  const checkinAllDogs = (modalData) => {
    // console.log('in checkinAllDogs', modalData.checkinStatus);
    for ( let dog of modalData.dogs ) {
      const dogID = dog.dog_id;
      const routeID = dog.route_id;
      let updatedDog = {};
      // if client's dogs are not yet *all* checked in (FALSE), checks in all dogs with 'status_check_in'
      if ( !modalData.checkinStatus ) {
        updatedDog = { id: dogID, checked_in: true, no_show: false, cancelled: false, routeID: routeID }
      // if client's dogs are already all checked in (TRUE), sets each dog to cancelled and then checks in all dogs with status 'status_cancelled'.
      } else {
        updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: false, routeID: routeID }
      }
      dispatch({ type: 'CHECK_IN', payload: updatedDog });
    }
    // updates UI
    updateMarkers(modalData);
    // setOpen(false);
  }

  // Creates a copy of map markers data and resets using new status
  const updateMarkers = (modalData) => {
    // switches modal checkin status (all checked in or not all checked-in)
    modalData.checkinStatus = !modalData.checkinStatus;
    //calls prop function setMarkers to update marker status.
    // this repopulates markers reducer with new marker status
    setMarkers((markers) => {
      const updatedMarkers = markers.map((client) => {
        if (client.client_id === modalData.client_id) {
          return { ...client, ...modalData }; // Spread the existing object properties and apply the updated properties
        }
        return client;
      });
      return updatedMarkers;
    });
  };

  // sets color for each dog in modal pop-up
  const determineStatus = (dog) => {
    // console.log('determine dog status', dog.checked_in);
    if (dog.checked_in) {
      return '#B5E3E0';
    }
    else if (dog.no_show) {
      return '#FBA89D';
    } else if (dog.cancelled) {
      return 'lightgrey';
    }
  }

  // this button opens up google maps either in the app or a new browser window 
  const openMap = async (dog) => {
    // takes in address details and encodes them into URI 
    const destination = encodeURIComponent(`${dog.street} ${dog.zip}`);
    // based off of street address and city it pulls up a google map page
    const link = `https://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  return (
  <>
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
          {modalData && route.filter( dogs => dogs.client_id === modalData.client_id).map((dog,j) => (
            <Accordion
              key={j}
              expanded={expanded === dog.dog_id}
              onChange={handleChange(dog.dog_id)}
              sx={{ backgroundColor: () => determineStatus(dog), mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <List>
                  <ListItem 
                    sx={{
                      height: 2,
                      backgroundColor: () => determineStatus(dog)
                    }}
                    disablePadding
                    key={dog.dog_id}
                  >
                    <ListItemText
                      primary={dog.name}
                      sx={{ textDecoration: dog.cancelled ? 'line-through' : null }}
                    />
                  </ListItem>
                </List>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction='row' spacing={1}>
                  <DogCheckIn dog={dog} />
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
          <Divider />
        <Stack spacing={2}>
          { !modalData.checkinStatus ?
            <Button 
              sx={{mt: 1}}
              variant='contained'
              size='small' 
              onClick={() => checkinAllDogs(modalData)}
            >
              Check in all dogs
            </Button>
          :
            <Button 
              sx={{mt: 1}}
              variant='contained'
              color='success'
              size='small' 
              onClick={() => checkinAllDogs(modalData)}
            >
              All dogs checked in
            </Button>
          }
          <Button 
            sx={{mt: 1}}
            variant='contained' 
            endIcon={<DirectionsIcon />} 
            size='small' 
            onClick={() => openMap(modalData)}
          >
              Directions
          </Button>
        </Stack>
      </Box>
    </Modal>
  </>
  )
}

export default DogCheckinModal;