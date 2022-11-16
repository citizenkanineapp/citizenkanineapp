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

  const getDogDetails = (dogID) => {
    console.log(dogID);
    dispatch({ type: 'FETCH_DOG_DETAILS', payload: dogID })
  }

  return (
    <>
      {route[0] ?
        <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>

          <Grid item xs={8} sx={{ background: () => getRouteColor(route), color: 'white', mt: 3, textAlign: 'center', textTransform: 'uppercase', borderRadius: 2 }}>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {route[0].route}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mx: 2 }}>


            {route && route.map && route.map((dog) => (

              <List>
                <ListItem onClick={(event) => getDogDetails(dog.dog_id)} secondaryAction={
                  <>
                    <IconButton edge="end" >
                      <CheckBoxIcon sx={{ fill: '#7BCEC8' }} />
                    </IconButton>
                    <IconButton edge="end" >
                      <EventBusyIcon sx={{ fill: '#F8614D' }} />
                    </IconButton>
                  </>
                }
                >
                  <ListItemAvatar>
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