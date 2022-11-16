import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemAvatar, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FlagIcon from '@mui/icons-material/Flag';
import RouteSelect from '../RouteSelect/RouteSelect';

function DailyRoutes() {
  const dispatch = useDispatch();
  const history = useHistory();

  // reducer getting filled with a specific routes dogs
  const route = useSelector(store => store.routeReducer);
  // const routeName = route[0].route;
  useEffect(() => {
    dispatch({ type: 'CLEAR_ROUTE' })
    dispatch({ type: 'GET_DAILY_ROUTES' });

    // dispatch({ type: 'GET_ROUTE_DETAILS', payload: 1 })
  }, []);

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
    }
  }

  const getDogDetails = (dogID) => {
    console.log(dogID);
    dispatch({ type: 'FETCH_DOG_DETAILS', payload: dogID })
    history.push('/m/dog/')
  }

  const checkIn = (clientID) => {
    console.log('CHECKING IN CLIENT #:', clientID);

  }

  const noShow = (clientID) => {
    console.log('Client # ____ is a No Show:', clientID);
  }

  return (
    <>
      {route[0] ?
        <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

          <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', mt: 3, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {route[0].route}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mx: 2 }}>


            {route && route.map && route.map((dog) => (

              <List>
                <ListItem secondaryAction={
                  <>
                    <IconButton edge="end" onClick={(event) => checkIn(dog.client_id)}>
                      <CheckBoxIcon sx={{ fill: '#7BCEC8' }} />
                    </IconButton>
                    <IconButton edge="end" onClick={(event) => noShow(dog.client_id)} >
                      <EventBusyIcon sx={{ fill: '#F8614D' }} />
                    </IconButton>
                  </>
                }
                  sx={{ backgroundColor: () => determineStatus(dog), }}
                >
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


                  />
                </ListItem>
              </List>

            ))}


          </Grid>
        </Grid>


        :

        <RouteSelect />
      }

    </>
  );
}

export default DailyRoutes;