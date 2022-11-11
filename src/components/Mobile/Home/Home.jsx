import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Stack, CardContent, Card, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';

function Home() {
  const history = useHistory();
  const user = useSelector(store => store.user);

  return (
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 7 }}>

        <Avatar sx={{ width: 200, height: 200, fontSize: 100, my: 1 }}>{user.username[0].toUpperCase() || ''}</Avatar>

      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 2, borderRadius: 5, textAlign: 'center', backgroundColor: '#539BD1', color: 'white' }}>
          WELCOME {user.username.toUpperCase()}:
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/routes')}>ROUTES</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/employees')}>Schedule</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/employees')}>Account</Button>
          <LogOutButton />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default Home;