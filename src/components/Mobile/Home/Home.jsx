import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Stack, Avatar, Box, Divider, Typography, Button, Grid } from '@mui/material';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';
import MobileTopNav from '../MobileNav/MobileTopNav';
import MobileNav from '../MobileNav/MobileNav';

function Home() {
  const history = useHistory();
  const user = useSelector(store => store.user);
  const dailyDogsCheck = useSelector(store => store.dailyDogz);
  const dispatch = useDispatch();

  // on page load - populate the daily dogs table using day of the week and the scheduled dogs for the day
  // useEffect(() => {
  //   if (user.admin) {
  //     dispatch({
  //       type: 'POPULATE_DAILY_DOGS'
  //     })
  //   }


  // }, [])

  // in case the on page load fails - this runs on navigation to the routes page so that the daily dogs
  // should be accessible 
  const adminTime = () => {
    dispatch({ type: 'POPULATE_DAILY_DOGS' });
    history.push('/m/routes');
  }

  return (
    <Grid container spacing={2} wrap="nowrap" sx={{ pb: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>

      <MobileNav />

      <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center', gap: 1, m: 0 }}>

        <img src="Images/dogwalker3.png" height="250px" width="250px" />

        <Paper sx={{ p: 2, borderRadius: 5, textAlign: 'center', backgroundColor: '#539BD1', color: 'white' }}>
          WELCOME {user.username.toUpperCase()}:
        </Paper>
      </Grid>
      <Grid item sx={{ pb: '100px'}} >
        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={0.5}>
          {user.admin ?
            <Button color='secondary' variant='outlined' onClick={(event) => adminTime()}>Routes</Button>
            :
            <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/routes')}>ROUTES</Button>
          }
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/search')}>Search Dogs</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/schedule')}>Schedule</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/resetpass')}>Account</Button>
          <LogOutButton />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Home;