// imports

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, Button, AccordionDetails, ListItemAvatar, Stack, Avatar, Box, IconButton, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PinDropIcon from '@mui/icons-material/PinDrop';

// module import
import DogCheckIn from './CheckIn';
import RouteSelect from '../RouteSelect/RouteSelect';

// this is the 'to-do' list for a walker ... showing the dogs they need to pick up each day and their status
function DailyRoutes() {

  // redefine imported functions
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // state and reducer definitions
  const [expanded, setExpanded] = useState(false);
  const user = useSelector(store => store.user);
  // reducer getting filled with a specific routes dogs
  const route = useSelector(store => store.routeReducer);

  const setStatus = ()=>{
    if(route[0] && route[0].emp_id === null) {
      return 'unselected';
    } else if ( route[0] && user && route[0].emp_id === user.emp_id) {
      return'selected_user';
    } else if (route[0] && user && route[0].emp_id != user.emp_id) {
      return 'selected_other';
    }
  }
  const [routeSelectStatus, setRouteSelectStatus] = useState(setStatus())

  // on page load - fetch routes, and also fetch specifc route data according to URL route ID
  useEffect(() => {
    setRouteSelectStatus(setStatus());
    console.log('how?: ', route[0] && route[0].emp_id, user.emp_id, routeSelectStatus)

  },);

  // const routeName = route[0].route;

  // expands accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //handles route [selection]
  const handleClick = () => {
    // console.log('old route: ', route[0].emp_id, routeSelectStatus)
    if (routeSelectStatus === 'unselected') {
      dispatch({type: 'SAGA_SET_ROUTE', payload: { emp_id: user.emp_id, route_id: params.id  }});
      setRouteSelectStatus(setStatus());
      // console.log('new route: ',route[0].emp_id,routeSelectStatus)
    } else if (routeSelectStatus === 'selected_user') {
      dispatch({type: 'SAGA_UNSET_ROUTE', payload: { emp_id: user.emp_id, route_id: params.id  }});
      setRouteSelectStatus(setStatus());
      // console.log('new route: ',route[0].emp_id,routeSelectStatus)
    } else if (routeSelectStatus === 'selected_other') {
      setRouteSelectStatus(setStatus());
    }
  }

  //implementation of drag-n-drop feature
  const onDragEnd = (result) => {
    if (!result.destination) return;
    //first dispatch sets state so there's no page lag
    dispatch ({ type: 'SET_DOG_ORDER', payload: result });
    // second dispatch posts to mobile/allDogs with new indices
    dispatch({ type: 'UPDATE_DOG_ORDER', payload: {result, route}});
    // dispatch({ type: 'UPDATE_ROUTE', payload: { routeName: result.destination.droppableId, dogID: result.draggableId } });
  }

  // sets display color based on route
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

  // sets display color based on dog status
  const determineStatus = (dog) => {
    // console.log(dog);
    if (dog.checked_in) {
      return '#B5E3E0';
    }
    else if (dog.no_show) {
      return '#FBA89D';
    } else if (dog.cancelled) {
      return 'lightgrey';
    }
  }

  // push to individual dog details
  const getDogDetails = (dogID) => {
   // console.log(dogID);
    history.push(`/m/dog/${dogID}`)
  }

  const RouteSelectButton = ({ routeSelectStatus, handleClick }) => {
    let buttonText = '';
    let buttonColor = '';
    let isDisabled = false;

    switch (routeSelectStatus) {
      case 'unselected':
        buttonText = 'Accept Route?';
        buttonColor = 'info';
        break;
      case 'selected_user':
        buttonText = 'Route Accepted';
        buttonColor = '#B5E3E0';
        break;
      case 'selected_other':
        buttonText = 'Route Taken';
        buttonColor = 'lightgrey';
        isDisabled = true;
        break;
    }

    return (
      <Button onClick={handleClick} variant="outlined" disabled={isDisabled} sx={{ borderColor: 'black', color: 'black', backgroundColor: buttonColor }} >
        {buttonText}
      </Button>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}> 
      {route[0] ?
        <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mb: 3, mt: 2 }}>
          <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', mt: 3, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {route[0].route}
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', mb: 0}}>
            <Stack direction='row' spacing={10} sx={{alignItems:'center'}}>
              <IconButton edge="end" 
                sx={{border: 1, mt: 1,
                flexDirection: 'column', px: 2}}
                onClick={(event) =>  history.push('/m/map')}
              >
                <PinDropIcon 
                  sx={{fontSize: 30, mb: 0}}
                />
                <Typography>Map</Typography>
              </IconButton>
              <RouteSelectButton routeSelectStatus={routeSelectStatus} handleClick={handleClick} />
            </Stack>
            </Grid>
              <Droppable droppableId={`${route[0].route}`}>
                {(provided, snapshot) => (
                <Grid {...provided.droppableProps} ref={provided.innerRef} 
                  item xs={12} sx={{ mx: 2 }}>
                  <List sx={{ mb: 10 }}>
                    {route && route.map && route.map((dog, j) => (
                      <Draggable draggableId={`${dog.dog_id}`} index={j} key={dog.dog_id} >
                        {(provided, snapshot) => (
                          <Box 
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}   
                          >
                            <Accordion expanded={expanded === dog.dog_id} onChange={handleChange(dog.dog_id)} sx={{ backgroundColor: () => determineStatus(dog), mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <List>
                                <ListItem sx={{ backgroundColor: () => determineStatus(dog) }}>
                                  <ListItemAvatar onClick={(event) => getDogDetails(dog.dog_id)} >
                                    {dog.image ?
                                      <Avatar src={dog.image} />
                                      :
                                      <Avatar>
                                        {dog.name[0]}
                                      </Avatar>
                                    }
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={dog.name}
                                    secondary={dog.client_name}
                                    sx={{ textDecoration: dog.cancelled ? 'line-through' : null }}
                                    />
                                  {dog.flag ?
                                    <IconButton edge="end">
                                      <FlagIcon sx={{ fill: '#F8614D', ml: 6 }} />
                                    </IconButton>
                                    :
                                    null
                                  }
                                </ListItem>
                              </List>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Stack direction='row' spacing={1}>
                                  <DogCheckIn dog={dog} />
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {/* creates space for possible new chip */}
                  {provided.placeholder}
                  </List>
                </Grid>
              )}
              </Droppable>       
        </Grid>
        :
        <RouteSelect />
      }
    </DragDropContext>
  );
}

export default DailyRoutes;