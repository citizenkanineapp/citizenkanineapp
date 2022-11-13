import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper, Stack, Avatar, Box, Divider, Typography, Button, Grid } from '@mui/material';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';

function Home() {
  const history = useHistory();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const adminTime = () => {
    dispatch({ type: 'POPULATE_DAILY_DOGS' });
    alert("Don't forget to turn your phone sideways!");
    history.push('/m/routes/admin');
  }

  return (
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      
      {/*----PORTRAIT HEADER----*/}
      <Grid item sx={{  display: {xs: 'flex', sm: 'none'}, height: '5%', width: '100%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
      </Grid>

      {/*----LANDSCAPE HEADER----*/}
      <Grid item sx={{ 
            height: '7%',
            width: '100%',  
            display: {xs: 'none', sm: 'flex'},
            flexDirection: 'row', 
            bgcolor: '#e0923f' }}>

        <Button onClick={() => history.push('/m/user')} sx={{color: 'whitesmoke', width: '15%'}}>Home</Button>
        <Button onClick={() => history.push('/m/routes')} sx={{color: 'whitesmoke', width: '15%'}}>Routes</Button>
        <Button onClick={() => history.push('/m/map')} sx={{color: 'whitesmoke', width: '15%'}}>Map</Button>
        <Button onClick={() => history.push('/m/employees')} sx={{color: 'whitesmoke', width: '15%'}}>Schedule</Button>
      </Grid>

      <Grid item sx={{ height: '95%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, pt: '10%' }}>
      
        <Avatar sx={{ width: 150, height: 150, fontSize: 100, my: 1 }}>{user.username[0].toUpperCase() || ''}</Avatar>

        <Paper sx={{ p: 2, borderRadius: 5, textAlign: 'center', backgroundColor: '#539BD1', color: 'white' }}>
          WELCOME {user.username.toUpperCase()}:
        </Paper>

        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/routes')}>ROUTES</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/employees')}>Schedule</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/resetpass')}>Account</Button>
          {user.admin ?
            <Button color='secondary' variant='outlined' onClick={(event) => adminTime()}>Load Balancing</Button>
            :
            null
          }
          <LogOutButton />
        </Stack>

      </Grid>
    </Grid>
  )
}

export default Home;