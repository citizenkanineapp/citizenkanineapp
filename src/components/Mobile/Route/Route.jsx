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
import PinDropIcon from '@mui/icons-material/PinDrop';

import DogCheckIn from './CheckIn';



function DailyRoutes() {
  // this is the 'to-do' list for a walker ... showing the dogs they need to pick up each day and their status
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // on page load - fetch routes, and also fetch specifc route data according to URL route ID
  useEffect(() => {
    dispatch({ type: 'GET_DAILY_ROUTES' });
    dispatch({ type: 'GET_ROUTE_DETAILS', payload: params.id })


    // return () => {
    //   dispatch({
    //     type: 'CLEAR_ROUTE'
    //   })
    // }
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
      case 'Tangletown': return '#4a5061';
      case 'Emerson': return '#539bd1';
      case 'Far': return '#3DA49D';
      case 'Misfits': return '#f5a572';
      case 'Unassigned': return '#f37e2d';
      default: return '#f8614d';
    }
  }

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

  const getDogDetails = (dogID) => {
   // console.log(dogID);
    history.push(`/m/dog/${dogID}`)
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
          <Grid item xs={8} sx={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', mb: 0}}>
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
            </Grid>
          <Grid item xs={12} sx={{ mx: 2 }}>


            <List sx={{ mb: 10 }}>
              {route && route.map && route.map((dog, j) => (
                <Accordion key={j} expanded={expanded === dog.dog_id} onChange={handleChange(dog.dog_id)} sx={{ backgroundColor: () => determineStatus(dog), mb: 1 }}>
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
                        <DogCheckIn dog={dog} config="routes"/>
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