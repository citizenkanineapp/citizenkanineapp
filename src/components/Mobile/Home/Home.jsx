import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Stack, Avatar, Divider, Typography, Button, Grid } from '@mui/material';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';
import MobileTopNav from '../MobileNav/MobileTopNav';

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
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%'}}>
    
      <MobileTopNav/>

      <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center', gap: 1, m: 3}}>
      
        <Avatar sx={{ width: 150, height: 150, fontSize: 100, my: 1 }}>{user.username[0].toUpperCase() || ''}</Avatar>

        <Paper sx={{ p: 2, borderRadius: 5, textAlign: 'center', backgroundColor: '#539BD1', color: 'white', mb: 1 }}>
          WELCOME {user.username.toUpperCase()}:
        </Paper>

        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={0.5}>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/routes')}>ROUTES</Button>
          <Button color='secondary' variant='outlined' onClick={(event) => history.push('/m/schedule')}>Schedule</Button>
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