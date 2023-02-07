import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ClientSchedule.css';

//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField, CardActionArea } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import 'react-datepicker/dist/react-datepicker.css';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

function ClientSchedule() {
  //use selectors and defining dispatch
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  // console.log(clientSchedule)
  // console.log(updatedSchedule)
  const dogs = client.dogs;
  const schedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  const clientSchedule = useSelector(store => store.clientScheduleReducer.editClientSchedule)
  const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.client_id })
    // Fetch client schedule changes
    dispatch({ type: 'SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', payload: client.client_id })
    console.log('schedule changes on load?', changes)
     return () => {
      dispatch({
        type: 'CLEAR_SCHEDULE'
      })
    }
  }, []);
  
  // const schedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  // const clientSchedule = useSelector(store => store.clientScheduleReducer.editClientSchedule)
  // const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)
  // console.log(dayjs(changes[0].date_to_change).$d)
    //local useState state I am using for this functionality
  const [dog, setDog] = useState('');
  console.log('changes on this page', changes);
  const [scheduled, setScheduled] = useState('');
  
  const initialDate =()=> {
    if(dayjs().$W === 0 || dayjs().$W === 6){
      return dayjs().add(1, 'day');
    }
    else{
      return dayjs();
  }}
  
  const [value, setValue] = useState(initialDate);
  
  
  // THIS handles the change of the date based on the date picker
  const handleDateChange = (newValue) => {
    //console.log(newValue);
    setValue(newValue);
  }
  
  //This is for the submit button for the one off changes
  // NEED to not be able to add the dog if is is regularly scheduled
  const handleSubmit = () => {
    // need to add date_to_change and is_selected to each one
    let changeDate = `${value.$y}-${value.$M + 1}-${value.$D}`;
    // console.log(changeDate)

    let newChanges = [];
    if (dog === "all") {
      client.dogs.map(singleDog => {
        let thisChange = { dog_id: singleDog.dog_id, client_id: client.client_id, date_to_change: changeDate, is_scheduled: scheduled }
        newChanges.push(thisChange)
      })
    }
    else {
      let thisChange = { dog_id: dog, client_id: client.client_id, date_to_change: changeDate, is_scheduled: scheduled }
      newChanges.push(thisChange)
    }

    // if there are new changes, then post changes.
    if (newChanges.length > 0){
      dispatch({
        type: 'SEND_ONE_SCHEDULE_CHANGE',
        payload: newChanges
      })
    }


     // need to reset local states:
    setDog('');
    setScheduled('');
    setValue (dayjs());
    // console.log('newChanges', newChanges)

  }

  // CALENDAR STUFF
  const noChange = ()=> {// This is a blank function used as a placeholder for the onChange of the calendar picker. onChange is required but has no use in this case. 
  }

  const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D'];

  // weekly schedule stuff:
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [disabled, setDisabled] = useState(true);
  //console.log('disabled', disabled)

  // This object will be dispatched when the weekly schedule has been updated;


  const handleWeekScheduleChange =()=>{
    //dispatch updatedSchedule // this object included the client_id
    dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: clientSchedule})
    // disable the weekly schedule:
    dispatch({
      type: 'SET_EDIT_CLIENT_SCHEDULE',
      payload: schedule
    })
    setDisabled(!disabled);
  }

  const DogAvatar=({dog,index,  dog_id, className})=>{
    return (
    <Avatar
        className={className}
        key={dog_id}
        sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
        alt={dog.dog_name[0]}
        src={dog.image ? dog.image : null}
    >
    {dog.dog_name[0]}
    </Avatar>)
  }

  const [addChange, setAddChange] = useState(false);

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', xs: 12 }}>
        <Grid item xs={12} sx={{mt: 2}}>
          <Typography variant="h2" sx={{ display: 'flex', alignSelf: 'left'}}>{client.first_name} {client.last_name}</Typography>
        </Grid>
        <Grid item xs={12} sx={{mt: 1}}>
          <Typography variant="h5" sx={{ display: 'flex', alignSelf: 'left', ml: 2}}>Weekly Schedule</Typography>
        </Grid>
        {/* Grid containing weekly schedule */}
        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
          {daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2} sx={{ mt: 3, mb: 2 }} >
              <Card raised>
                <CardActionArea component={Button}
                  disabled={disabled}
                  onClick={() => {
                    if (!clientSchedule[index + 1]) {
                      dispatch({
                        type: 'EDIT_CLIENT_WEEK_SCHEDULE',
                        payload: { day: index + 1, change: true }
  
                      })
                      
                    }

                    else {
                      dispatch({
                        type: 'EDIT_CLIENT_WEEK_SCHEDULE',
                        payload: { day: index + 1, change: false }
  
                      })
                    }
                  }}
                >
                  <CardContent sx={{ display: 'flex', justifyContent: 'center', backgroundColor: clientSchedule[index + 1] ? '#4A5061' : 'none', color: clientSchedule[index + 1] ? 'white' : 'black', height: '3vh', alignItems: 'center' }}>
                    <Typography variant="h7" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            ))}
            {/* The below is turned off because client will no longer edit weekly schedule in app */}

            {/* { !disabled ?
              <Grid item xs={11}  sx={{display: 'flex', justifyContent: 'right', mt: 1}}>
                <Button variant="outlined" 
                  sx={{mr: 3}}
                  color="info" onClick={()=> {
                  setDisabled(!disabled)}}>Cancel</Button>
                <Button variant='contained' color='secondary' onClick={handleWeekScheduleChange}>Confirm</Button>
              </Grid>
            :
            <Grid item xs={11} sx={{ display: 'flex', justifyContent: 'right', mt:1}}>
              <Button variant='contained' color='secondary' onClick={() => setDisabled(!disabled)}>Edit</Button>
            </Grid>
          } */}

        </Grid>
      {/* Grid containing calendar and form */}
          {/* Calendar */}
          <Grid item xs={6}>
              <Box className="clientSchedule" sx={{display: 'flex', height: '53vh', width: '40vw',max_height:'55vh', border: 1, borderColor: 'black', justifyContent: 'center', alignContent: 'center'}}>
                  {/* <h1>Client Name</h1> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker 
                  className='clientSchedule'
                  shouldDisableDate={isWeekend}
                  onChange={noChange}
                  renderInput={(params) => {
                        // console.log(dayjs());
                        <TextField key={day.$D} {...params} />
                        }}
                  // renderDay is essentially mapping through each day in the selected month.
                  renderDay={(day, _value, DayComponentProps) => {
                    //removed console here
                    //  console.log('does thisDayString work on heroku?', JSON.stringify(DayComponentProps.day.$d))
                    // let thisDayString = JSON.stringify(DayComponentProps.day.$d);
                    let thisDayString = dayjs(DayComponentProps.day).utc(true).format('YYYY-MM-DD');
                    // console.log(thisDayString);
                    let selectedMUIClass='';
                    if (day.$d === dayjs()){
                        selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                      }

                    return (
                      <Box
                        key={day.$D}
                        className="clientSchedule"
                        sx={{width: '6vw', height: '8vh', maxHeight: '10vh', display: 'flex', mt: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'flex-start', border: 1, borderColor: '#7BCEC8', mt: 0}}>
                          {/* This box is just for the date number */}
                          <Box sx={{display: 'flex', justifyContent: 'center', mb: 0, heigh: '1vw', width: '4.5vw'}}>
                            <PickersDay 
                            key={day.$D}
                            className={ selectedMUIClass }
                            {...DayComponentProps} />
                          </Box>
                        {/* Is this date in the current month ?*/}
                          {!DayComponentProps.outsideCurrentMonth ? 
                              <Box key={day.$D} sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
                                <>
                                  {dogs.map((dog, index)=>{
                                    // console.log(dog.dog_name, dog.regular)
                                    if (clientSchedule[day.$W]){
                                       // Regularly Scheduled Day
                                      // console.log(day.$W)
                                      if (changes.length <= 0){ // No changes for client
                                        if (dog.regular){
                                          return (
                                            <DogAvatar id={dog.dog_id} index={index} dog={dog}/>
                                          )
                                        }
                                      }

                                      if (changes.length > 0){ // Changes on a regularly scheduled day
                                        // returns an object with the change for the day if there is one
                                        let dogChange = changes.filter(change=>{
                                          if(dayjs(change.date_to_change).format('YYYY-MM-DD') === thisDayString) {console.log(thisDayString, 'true for regular day')}
                                          return change.dog_id === dog.dog_id && dayjs(change.date_to_change).format('YYYY-MM-DD') === thisDayString
                                        })
                                        // console.log('does dog change have no results?', dogChange)
                                        // console.log(typeof(dogChange))
                                        // if there is a change for the dog:
                                        if(dogChange.length > 0){
                                          console.log('there is a change', dogChange);
                                          let change = dogChange[0]
                                          if(dog.regular){
                                            if (change.is_scheduled){
                                              return (
                                                <DogAvatar id={dog.dog_id} index={index} dog={dog}/>
                                              )
                                            }
                                          }
                                          if(!dog.regular){
                                            if (change.is_scheduled){
                                              return (
                                                <DogAvatar id={dog.dog_id} index={index} dog={dog}/>
                                              )
                                            }
                                          }
                                        }
                                        // Else there is not change for this dog on this day => render regularly scheduled dog
                                      else if (dog.regular){
                                        return (
                                          <DogAvatar id={dog.dog_id} index={index} dog={dog}/>
                                        )
                                      }
                                      }
                                    }
                                    if (!clientSchedule[day.$W]){
                                      // NOT REGULARLY SCHEDULED DAY
                                      if (changes.length > 0){
                                        for (let thisChange of changes){
                                          if(dayjs(thisChange.date_to_change).format('YYYY-MM-DD') === thisDayString) {console.log(thisDayString, 'true for irregular day:')}
                                          
                                          if (thisChange.dog_id === dog.dog_id && dayjs(thisChange.date_to_change).format('YYYY-MM-DD') === thisDayString && thisChange.is_scheduled){
                                            return (
                                              <DogAvatar id={dog.dog_id} index={index} key={dog.dog_id} dog={dog}/>
                                            )
                                          }
                                        }
                                      }
                                    }
                                  })}
                                </>
                              </Box>
                          :null}
                      </Box>
                    );
                    }}/>
              </LocalizationProvider>
              {/* END of CALENDAR */}
        </Box >
        </Grid>
        {/* ADD One-Off Changes Form */}
              {addChange ? 
                <Grid item xs={5} sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <h2 >Month View / Adjust Schedule</h2>
                    <FormControl  sx={{ mr: 4, pb: 1, mb:2, width: '20vw' }}>
                          <InputLabel>Dog</InputLabel>
                          <Select value={dog} onChange={(event) => setDog(event.target.value)}>
                              <MenuItem value="all">All Dogs</MenuItem>
                                {client.dogs && client.dogs.map(singleDog => {
                                  return (
                                      <MenuItem key={singleDog.dog_id} value={singleDog.dog_id}>{singleDog.dog_name}</MenuItem>
                                      )
                                })}
                          </Select>
                        </FormControl>
                        <FormControl  sx={{ mr: 4, pb: 1, width: '20vw' }}>
                          <InputLabel>Action</InputLabel>
                          <Select value={scheduled} onChange={(event) => setScheduled(event.target.value)}>
                            <MenuItem value={true}>Add Walk</MenuItem>
                            <MenuItem value={false}>Cancel Walk</MenuItem>
                          </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DesktopDatePicker
                              shouldDisableDate={isWeekend}
                              label="Date desktop"
                              inputFormat="MM/DD/YYYY"
                              value={value}
                              onChange={handleDateChange}
                              renderInput={(params) => <TextField {...params} sx={{ mt: 2 ,mr: 4, pb: 1, width: '20vw' }} />}
                          />
                        </LocalizationProvider>
                      <Grid sx={{mt: 2, display:'flex', justifyContent: 'center'}}>
                          <Button variant='contained' color='secondary' onClick={handleSubmit}> Submit</Button>
                          <Button variant="outlined" color="info" sx={{ml:3}} onClick={() => setAddChange(!addChange)}>Cancel</Button>
                      </Grid>
                </Grid>
              :
              <Grid item xs={5} sx={{display: 'flex', flexDirection:'column', alignItems:'center', mt: 10}}>
                <Typography variant='h5' sx={{mb: 4}}>Add A Schedule Change</Typography>
                  <Fab color="secondary" aria-label="add" onClick={()=> setAddChange(!addChange)}>
                    <AddIcon />
                  </Fab>
                  
              </Grid>
              }
          <Grid item xs={11} sx={{display: 'flex', justifyContent: 'right', pb: 3}}>
            <Button 
              variant="outlined" color="info"
              onClick={() => {
                dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientDetails' });}}>
              Back
            </Button>
          </Grid>
        </Grid>
    </>

  )
}


export default ClientSchedule;

