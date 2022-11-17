import { useEffect, useState, useRef, MouseEvent } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Collapse, ListItemAvatar, ListItemIcon, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FlagIcon from '@mui/icons-material/Flag';
import CancelIcon from '@mui/icons-material/Cancel';
import RouteSelect from '../RouteSelect/RouteSelect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function DailyRoutes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    dispatch({ type: 'GET_DAILY_ROUTES' });
    dispatch({ type: 'GET_ROUTE_DETAILS', payload: params.id })


    return () => {
      dispatch({
        type: 'CLEAR_ROUTE'
      })
    }
  }, [params.id]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const user = useSelector(store => store.user);
  // reducer getting filled with a specific routes dogs
  const route = useSelector(store => store.routeReducer);
  // const routeName = route[0].route;


  const getRouteColor = (route) => {
    switch (route[0].route) {
      case 'tangletown': return '#4a5061';
      case 'emerson': return '#539bd1';
      case 'far': return '#3DA49D';
      case 'misfits': return '#f5a572';
      case 'unassigned': return '#f37e2d';
      default: return '#f8614d';
    }
  }

  const determineStatus = (dog) => {
    if (dog.checked_in) {
      return '#3DA49D';
    }
    else if (dog.no_show) {
      return '#F8614D';
    } else if (dog.cancelled) {
      return 'lightgrey';
    }
  }

  const getDogDetails = (dogID) => {
    console.log(dogID);
    history.push(`/m/dog/${dogID}`)
  }

  const checkIn = (dog) => {
    console.log('CHECKING IN CLIENT #:', dog.client_id);
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
    const dogID = dog.dog_id;
    const routeID = dog.route_id;
    let updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }

    if (dog.cancelled) {
      updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: false, routeID: routeID }

    } else {
      updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }

    }
    dispatch({ type: 'CANCEL_WALK', payload: updatedDog });
  }

  return (
    <>
      {route[0] ?
        <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', mb: 3, mt: 2 }}>

          <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', mt: 3, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {route[0].route}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mx: 2 }}>


            <List sx={{ mb: 10 }}>
              {route && route.map && route.map((dog) => (

                // <ListItem sx={{ backgroundColor: () => determineStatus(dog) }}
                // secondaryAction={
                //   <>
                //     {dog.cancelled ?

                //       <IconButton edge="end" onClick={(event) => cancelWalk(dog)} >
                //         <AddCircleIcon sx={{ fill: '#3DA49D' }} />
                //       </IconButton>

                //       :
                //       <>
                //         <IconButton edge="end" onClick={(event) => checkIn(dog)}>
                //           <CheckBoxIcon sx={{ fill: '#7BCEC8', mr: 2 }} />
                //         </IconButton>
                //         <IconButton edge="end" onClick={(event) => noShow(dog)} >
                //           <EventBusyIcon sx={{ fill: '#F8614D' }} />
                //         </IconButton>
                //         {user.admin ?
                //           <IconButton edge="end" onClick={(event) => cancelWalk(dog)} >
                //             <CancelIcon sx={{ fill: '#F8614D' }} />
                //           </IconButton>
                //           :
                //           null
                //         }
                //       </>
                //     }
                //   </>
                // }
                // >

                //   <ListItemAvatar onClick={(event) => getDogDetails(dog.dog_id)} >
                //     {dog.image ?
                //       <Avatar src={dog.image} />
                //       :
                //       <Avatar>
                //         {dog.name[0]}
                //       </Avatar>

                //     }
                //   </ListItemAvatar>
                //   <ListItemText
                //     primary={dog.name}
                //     secondary={dog.client_name}
                //     sx={{ textDecoration: dog.cancelled ? 'line-through' : null }}
                //   />
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

                      {dog.cancelled ?
                        <>

                          {user.admin ?
                            <Button edge="end" variant='contained' onClick={(event) => cancelWalk(dog)} >
                              <AddCircleIcon sx={{ mr: 2, p: 1 }} />
                              ADD DOG
                            </Button>

                            :
                            null
                          }
                        </>

                        :
                        <>

                          <Button edge="end" onClick={(event) => checkIn(dog)} variant='contained' color='success' sx={{ mr: 1 }} size='small'>
                            <CheckBoxIcon sx={{ mr: 2 }} />
                            CHECK IN
                          </Button>
                          <Button edge="end" onClick={(event) => noShow(dog)} variant='contained' color='error' size='small'>
                            <EventBusyIcon sx={{ mr: 2 }} />
                            NO SHOW
                          </Button>
                          {user.admin ?
                            <Button edge="end" onClick={(event) => cancelWalk(dog)} variant='contained' color='info' sx={{ mr: 1 }} size='small'>
                              <CancelIcon sx={{ mr: 2 }} />
                              CANCEL WALK
                            </Button>
                            :
                            null
                          }
                        </>}
                    </Stack>

                  </AccordionDetails>

                </Accordion>

              ))}
            </List>


          </Grid>
        </Grid>


        :

        <RouteSelect />
      }

    </>
  );
}

export default DailyRoutes;