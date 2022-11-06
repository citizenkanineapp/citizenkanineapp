import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
//CALENDAR 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';

function ClientSchedule() {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const [dog, setDog] = useState('');
  const [action, setAction] = useState('');

  const [walk, setWalk] = useState(false);

  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    setWalk(current => !current);
    console.log(event)
  };


  // this should eventually dispatch to a saga with all of these values or whatever
  const handleSubmit = (event) => {
    console.log(`${dog}, ${value}, ${action}`)
  }

  // NEEDS LOGIC FOR WEEKLY SCHEDULE STUFF BUT I DIDN'T WANT TO START A REDUCER AND ALL THAT

  return (
    <div className="container">
      <h1>Client Name</h1>
      <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            <CardContent sx={{ backgroundColor: walk ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised sx={{ backgroundColor: '#7BCEC8' }}>
            <CardContent>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised sx={{ backgroundColor: '#7BCEC8' }}>
            <CardContent>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent>
              Friday
            </CardContent>
          </Card>

        </Grid>

      </Grid>

      <h2>Month View / Adjust Schedule</h2>

      {/* OKAY so this actually becomes like a visualization of the calendar hopefully BUT we aren't there yet so  */}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mr: 4, pb: 1 }}>
            <InputLabel>Dog</InputLabel>
            <Select value={dog} onChange={(event) => setDog(event.target.value)}>
              <MenuItem value={'Spike'}>Spike</MenuItem>
              <MenuItem value={'Fido'}>Fido</MenuItem>
            </Select>
          </FormControl>


          <FormControl fullWidth sx={{ mr: 4, pb: 1 }}>
            <InputLabel>Action</InputLabel>
            <Select value={action} onChange={(event) => setAction(event.target.value)}>
              <MenuItem value={'Add'}>Add Walk</MenuItem>
              <MenuItem value={'Remove'}>Cancel Walk</MenuItem>
            </Select>
          </FormControl>
          {/* THIS IS JUST A VIEW FOR THE DATE PICKER */}
          <TextField value={value} fullWidth sx={{ mr: 4, pb: 1 }}></TextField>
          <Button variant='contained' color='secondary' onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Calendar onChange={onChange} value={value} />
        </Grid>

      </Grid>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button>
    </div >
  )
}

export default ClientSchedule;