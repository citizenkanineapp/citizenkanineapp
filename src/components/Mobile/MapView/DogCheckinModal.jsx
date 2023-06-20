import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, Overlay } from "pigeon-maps"
import { maptiler } from 'pigeon-maps/providers'


//MUI
import { Accordion, AccordionSummary, AccordionDetails, Collapse, ListItemAvatar, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, IconButton, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

function DogCheckinModal ({modalData, open, setOpen, route, setMarkers, markers}) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const handleClose = () => setOpen(false);

  const user = useSelector(store => store.user);

  const checkIn = (dog) => {
      const dogID = dog.dog_id;
      const routeID = dog.route_id;
      const updatedDog = { id: dogID, checked_in: true, no_show: false, cancelled: false, routeID: routeID }
      dispatch({ type: 'CHECK_IN', payload: updatedDog });
    }
  
  const noShow = (dog) => {
    const dogID = dog.dog_id;
    const routeID = dog.route_id;
    const updatedDog = { id: dogID, checked_in: false, no_show: true, cancelled: false, routeID: routeID }
    dispatch({ type: 'NO_SHOW', payload: updatedDog });

  }

  const cancelWalk = (dog) => {
    console.log('cancelWalk')
    const dogID = dog.dog_id;
    const routeID = dog.route_id;
    let updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }

    if (dog.cancelled) {
      updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: false, routeID: routeID }
    } else {
      updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }
    }
    //correct this for abvoe if/else
    dispatch({ type: 'CANCEL_WALK', payload: updatedDog });
  }

  const determineStatus = (dog) => {
    // console.log('determine dog status', dog);
    if (dog.checked_in) {
      return '#B5E3E0';
    }
    else if (dog.no_show) {
      return '#FBA89D';
    } else if (dog.cancelled) {
      return 'lightgrey';
    }
  }

  //chat GPT came through with how to handle this--creating a copy of markers in order to update!
  const updateMarkers = (modalData) => {
    console.log('checkinStatus')
    modalData.checkinStatus = 'complete'
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
          {dog.cancelled ?
          <>
              {user.admin ?
                  <Button edge="end" variant='contained' color='info' onClick={(event) => cancelWalk(dog)} >
                      <AddCircleIcon sx={{ mr: 2, p: 1 }} />
                      ADD DOG
                  </Button>
                  :
                  null
              }
          </>

          :
          <>
              <Button edge="end" onClick={(event) => checkIn(dog)} variant='contained' color='success' sx={{ mr: 1, fontSize: 10 }} size='small'>
              <CheckBoxIcon sx={{ mr: .5 }} />
              CHECK IN
              </Button>
              <Button edge="end" onClick={(event) => noShow(dog)} variant='contained' color='error' sx={{ fontSize: 10 }} size='small'>
              <EventBusyIcon sx={{ mr: .5 }} />
              NO SHOW
              </Button>
              {user.admin ?
                  <Button edge="end" onClick={(event) => cancelWalk(dog)} variant='contained' color='info' sx={{ mr: 1, fontSize: 10 }} size='small'>
                      <CancelIcon sx={{ mr: .5}} />
                      CANCEL WALK
                  </Button>
                  
                  :
                  null
              }
          </>
      }
          </Stack>

        </AccordionDetails>

      </Accordion>

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
              <Button 
                sx={{mt: 1}}
                variant='contained'
                color='success'
                size='small' 
                onClick={() => updateMarkers(modalData)}
              >
                      Complete Check In?
              </Button>
            </ListItem>
        </List>


      </Box>
    </Modal>
  </>
  )
}

export default DogCheckinModal;