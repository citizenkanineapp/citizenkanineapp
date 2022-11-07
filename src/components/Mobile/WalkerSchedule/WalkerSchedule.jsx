import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

//CALENDAR 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//MUI
import { Chip, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';

function EmployeeSchedule() {

  const [value, onChange] = useState(new Date());


  return (
    <Grid container sx={{ justifyContent: 'center', mt: 5 }}>
      <Grid item xs={10}>
        <h1>Employee Shedule</h1>
      </Grid>

      <Grid item sx={10}>

        <Calendar onChange={onChange} value={value} />
      </Grid>
    </Grid>


  );
}

export default EmployeeSchedule;