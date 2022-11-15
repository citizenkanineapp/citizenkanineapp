import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import MobileTopNav from '../MobileNav/MobileTopNav';

//CALENDAR 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//MUI
import { Chip, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';

function EmployeeSchedule() {
  const history = useHistory();
  const [value, onChange] = useState(new Date());


  return (
    <Grid container sx={{ height: '90%', width: '100%', display: 'flex', flexDirection: 'column' }}>
    
      <MobileTopNav/>

      <Grid item sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: '3vh', mt: '5vh' }}>
        <Typography variant="h7">Employee Schedule</Typography>
        <Calendar onChange={onChange} value={value} />
      </Grid>

    </Grid>


  );
}

export default EmployeeSchedule;