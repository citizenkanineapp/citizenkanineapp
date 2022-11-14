import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ClientSchedule.css';

//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField, Badge } from '@mui/material';

// MUI CALENDAR STUFF
import dayjs from 'dayjs';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


function ClientSchedule() {
  const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch({
  //     type: 'SAGA_FETCH_DOGS',
  //     // this payload will have to be changed to the selected client_id
  //     payload: 9
  //   })
  // },[])

  // const clientSchedule = useSelector(store=> store.clientScheduleReducer);
  const clientSchedule = {1: true, 2: false, 3: true, 4: true, 5: false}
  const dogs = useSelector(store=> store.clientReducer.dogs)


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

  const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];

  // CALENDAR STUFF
  const [date, setDate] = useState(dayjs());
  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

  const [highlightedDays, setHighlightedDays] = useState([1,2,4]);

  return (
    <Box className="container" sx={{heigh: '100vh'}}>
      <h1>Client Name</h1>
      {/* <h2>Month View / Adjust Schedule</h2> */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        
        <Grid item >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker 
            sx={{height: '100vh'}}
              className='clientSchedule'
              date={date} 
              onChange={(newDate) => setDate(newDate)} 
              shouldDisableDate={isWeekend}
              renderInput={(params) => {
                    // console.log(dayjs());
                    <TextField key={day.$D} {...params} sx={{height: '80vh'}} />
                    }}
              renderDay={(day, _value, DayComponentProps) => {
                console.log('day is:', day.$W);
                // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                let selectedMUIClass='';
                if (highlightedDays.includes(day.$W)){
                    selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                }

                return (
                      <Box sx={{width: '5vw', height: '5vw'}}>
                        <PickersDay 
                        className={ selectedMUIClass }
                        {...DayComponentProps} />
                      </Box>
                );
                }}/>
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
    </Box >
  )
}

export default ClientSchedule;


{/* <Grid item xs={6}>
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
          <TextField value={value} fullWidth sx={{ mr: 4, pb: 1 }}></TextField>
          <Button variant='contained' color='secondary' onClick={handleSubmit}>Submit</Button>
        </Grid> */}

      //   <h2>Weekly Schedule</h2>
      // <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
      //   <Grid item xs={2}>
      //     <Card raised onClick={(event) => handleClick('Monday')} >
      //       <CardContent sx={{ backgroundColor: walk ? '#7BCEC8' : null }}>
      //         Monday
      //       </CardContent>
      //     </Card>

      //   </Grid>
      //   <Grid item xs={2} >
      //     <Card raised sx={{ backgroundColor: '#7BCEC8' }}>
      //       <CardContent>
      //         Tuesday
      //       </CardContent>
      //     </Card>

      //   </Grid>
      //   <Grid item xs={2}>
      //     <Card raised>
      //       <CardContent>
      //         Wednesday
      //       </CardContent>
      //     </Card>

      //   </Grid>
      //   <Grid item xs={2}>
      //     <Card raised sx={{ backgroundColor: '#7BCEC8' }}>
      //       <CardContent>
      //         Thursday
      //       </CardContent>
      //     </Card>

      //   </Grid>
      //   <Grid item xs={2}>
      //     <Card raised>
      //       <CardContent>
      //         Friday
      //       </CardContent>
      //     </Card>

      //   </Grid>