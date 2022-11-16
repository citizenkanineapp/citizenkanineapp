import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ClientSchedule.css';

//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CheckIcon from '@mui/icons-material/Check';


function ClientSchedule() {
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
  }, []);

  //use selectors and defining dispatch
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  const schedule = useSelector(store => store.clientScheduleReducer)

  //local useState state I am using for this functionality
  const [dog, setDog] = useState('');
  const [action, setAction] = useState('');
  const [scheduled, setScheduled] = useState('');
  const [value, setValue] = React.useState(dayjs());
  const [monday, setMonday] = useState(schedule["1"])
  const [tuesday, setTuesday] = useState(schedule["2"]);
  const [wednesday, setWednesday] = useState(schedule["3"]);
  const [thursday, setThursday] = useState(schedule["4"]);
  const [friday, setFriday] = useState(schedule["5"]);

//this function handles the change of regular schedule
  const handleClick = (event) => {
    switch (event){
      case "Monday":
        setMonday(current => !current);
        dispatch({type: 'SET_MONDAY_CHANGE', payload: !monday})
        break;
      case "Tuesday":
        setTuesday(current => !current);
        dispatch({type: 'SET_TUESDAY_CHANGE', payload: !tuesday})
        break;
      case "Wednesday":
        setWednesday(current => !current);
        dispatch({type: 'SET_WEDNESDAY_CHANGE', payload: !wednesday})
        break;
      case "Thursday":
        setThursday(current => !current);
        dispatch({type: 'SET_THURSDAY_CHANGE', payload: !thursday})
        break;
      case "Friday":
        setFriday(current => !current);
        dispatch({type: 'SET_FRIDAY_CHANGE', payload: !friday})
        break;
    } 
  };

//this handles the change of the date based on the date picker
  const handleChange = (newValue) => {
    setValue(newValue);
    
  };

  //this is for the submit button for the one off changes
  const handleSubmit = (event) => {
    let scheduleChangeObject = []
    let month = (value.$M +1)

    //different logic based on whether one dog or "all dogs is selected" to create one-off schedule change object
    if(dog.length > 1 ){
    for(let oneDog of dog){
      let dogObject ={
        date: `${value.$y}-${month}-${value.$D}`,
        is_scheduled: scheduled,
        dog_id: oneDog.dog_id,
        client_id: client.id,
        regular: oneDog.regular
        }
        scheduleChangeObject.push(dogObject)
      }
    } else {
      let dogObject ={
        date: `${value.$y}-${month}-${value.$D}`,
        is_scheduled: scheduled,
        dog_id: dog,
        client_id: client.id,
        regular: oneDog.regular
      }
        scheduleChangeObject.push(dogObject)
  } 
   dispatch({type: 'SEND_ONE_SCHEDULE_CHANGE', payload: scheduleChangeObject})
}

//this function changes a client's regular schedule
const regularScheduleChange = (event) =>{
  dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: schedule})
}

  return (
    <div className="container">
      <h1>{client.first_name} {client.last_name}</h1>
        <h2>Weekly Schedule Change</h2>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <Grid item xs={2}>
              <Card raised onClick={(event) => handleClick('Monday')} >
                <CardContent sx={{ backgroundColor: schedule["1"] ? '#7BCEC8' : null }}>
                  Monday
                </CardContent>
              </Card>
            </Grid>
          <Grid item xs={2} >
            <Card raised onClick={(event) => handleClick('Tuesday')}>
              <CardContent  sx={{ backgroundColor: schedule["2"] ? '#7BCEC8' : null }}>
                Tuesday
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card raised onClick={(event) => handleClick('Wednesday')}>
              <CardContent sx={{backgroundColor: schedule["3"] ? '#7BCEC8' : null}}>
                Wednesday
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card raised onClick={(event) => handleClick('Thursday')}>
              <CardContent sx={{backgroundColor: schedule["4"] ? '#7BCEC8' : null}}>
                Thursday
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card raised onClick={(event) => handleClick('Friday')}>
              <CardContent sx={{backgroundColor: schedule["5"] ? '#7BCEC8' : null}}>
                Friday
              </CardContent>
            </Card>
            <Button variant='contained' color='secondary' sx={{mt: 3, ml: 6}} onClick={regularScheduleChange}>Submit</Button>
          </Grid>

{/*-------- below here is for the one off changes------------ */}

    <h2 >Month View / Adjust Schedule</h2>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mr: 4, pb: 1, mb:2 }}>
            <InputLabel>Dog</InputLabel>
              <Select value={dog} onChange={(event) => setDog(event.target.value)}>
              <MenuItem value={client.dogs}>All Dogs</MenuItem>
                {client.dogs && client.dogs.map(singleDog => {
                  return (
                      <MenuItem key={singleDog.dog_id} value={singleDog.dog_id}>{singleDog.dog_name}</MenuItem>
                      )
                   })}
               </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mr: 4, pb: 1 }}>
            <InputLabel>Action</InputLabel>
            <Select value={scheduled} onChange={(event) => setScheduled(event.target.value)}>
              <MenuItem value={true}>Add Walk</MenuItem>
              <MenuItem value={false}>Cancel Walk</MenuItem>
            </Select>
          </FormControl>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>Submit</Button>
      </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
    {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
      </Grid>
    </div >
   
  )
}

export default ClientSchedule;


