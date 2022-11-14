import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

//CALENDAR 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//MUI
import { Chip, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';

function EmployeeSchedule() {
  const history = useHistory();
  const [value, onChange] = useState(new Date());


  return (
    <Grid container sx={{ height: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
       {/*----PORTRAIT HEADER----*/}
      <Grid item sx={{  display: {xs: 'flex', sm: 'none'}, height: '5%', width: '100%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
      </Grid>

      {/*----LANDSCAPE HEADER----*/}
      <Grid item sx={{ height: '7%',
            width: '100%',  
            display: {xs: 'none', sm: 'flex'},
            flexDirection: 'row', 
            bgcolor: '#e0923f' }}>

        <Button onClick={() => history.push('/m/user')} sx={{color: 'whitesmoke', width: '15%'}}>Home</Button>
        <Button onClick={() => history.push('/m/routes')} sx={{color: 'whitesmoke', width: '15%'}}>Routes</Button>
        <Button onClick={() => history.push('/m/map')} sx={{color: 'whitesmoke', width: '15%'}}>Map</Button>
        <Button onClick={() => history.push('/m/employees')} sx={{color: 'whitesmoke', width: '15%'}}>Schedule</Button>
      </Grid>
      
      <Grid item sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '95%', justifyContent: 'flex-start', alignItems: 'center', gap: '3vh', mt: '5vh' }}>
        <Typography variant="h7">Employee Schedule</Typography>
        <Calendar onChange={onChange} value={value} />
      </Grid>

    </Grid>


  );
}

export default EmployeeSchedule;