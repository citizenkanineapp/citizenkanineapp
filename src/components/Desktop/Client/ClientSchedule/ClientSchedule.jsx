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

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

function ClientSchedule() {
  //use selectors and defining dispatch
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  const dogs = client.dogs;
  const schedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  const clientSchedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  // console.log(clientSchedule)
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);
  // console.log(updatedSchedule)
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
    // Fetch client schedule changes
    dispatch({ type: 'SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', payload: client.id})
  }, []);
  
  const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)
  // console.log(dayjs(changes[0].date_to_change).$d)
;  //local useState state I am using for this functionality
  const [dog, setDog] = useState('');
  // console.log(dog);
  const [changeDate, setChangeDate] = useState('');
  const [scheduled, setScheduled] = useState('');
  const [value, setValue] = useState(dayjs());


// THIS handles the change of the date based on the date picker
  const handleDateChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    let changeDateFormatting = dayjs(JSON.stringify(newValue).slice(1,11)).$d;
    // this formats the selected date's hr:min:sec to 00:00:00 so that dates can be matched. ex) Sun Nov 27 2022 00:00:00 GMT-0600 (Central Standard Time)
    // setChangeDate(changeDateFormatting)
    // console.log(changeDate)
  }


  //This is for the submit button for the one off changes
  const handleSubmit = () => {
    // need to add date_to_change and is_selected to each one
    let newChanges = [];
    if (dog === "all"){
      client.dogs.map(singleDog => {
        let thisChange = {dog_id: singleDog.dog_id, client_id: client.id, date_to_change: value.$d, is_scheduled: scheduled}
        newChanges.push(thisChange)
      })
    }
    else {
      let thisChange = {dog_id: dog, client_id: client.id, date_to_change: value.$d, is_scheduled: scheduled}
      newChanges.push(thisChange)
    }
    dispatch({
      type: 'SEND_ONE_SCHEDULE_CHANGE',
      payload: newChanges
    })

     // need to reset local states:
    setDog('');
    setScheduled('');
    setValue (dayjs());
    console.log('newChanges', newChanges)

  }

  // CALENDAR STUFF
  const noChange = ()=> {// This is a blank function used as a placeholder for the onChange of the calendar picker. onChange is required but has no use in this case. 
  }

  const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];

  // weekly schedule stuff:
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [disabled, setDisabled] = useState(true);

  // This object will be dispatched when the weekly schedule has been updated;
  

  const handleWeekScheduleChange =()=>{
    //dispatch updatedSchedule // this object included the client_id
    dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: updatedSchedule})
    // disable the weekly schedule:
    setDisabled(!disabled);
  }

  return (
    <>
    <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', xs: 12}}>
      {/* Grid containing weekly schedule */}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        {schedule && daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2} sx={{mt: 5}} >
              <Card raised>
                <CardActionArea component={Button}
                  disabled={disabled}
                  onClick={()=>{
                    if (updatedSchedule[index+1]){
                      setUpdatedSchedule({...updatedSchedule, [index+1]: false})
                    }
                    
                    else {
                      setUpdatedSchedule({...updatedSchedule, [index+1]: true})
                    }}}
                  >
                  <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: updatedSchedule[index+1]? '#7BCEC8' : 'none', height: '3vh', alignItems: 'center' }}>
                      <Typography variant="h7" sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
            { !disabled ?
              <Grid item xs={16} sx={{display: 'flex', justifyContent: 'right'}}>
                <Button variant='contained' color='secondary' onClick={()=> {
                  setUpdatedSchedule(schedule)
                  setDisabled(!disabled)}}>Cancel</Button>
                <Button variant='contained' color='secondary' onClick={handleWeekScheduleChange}>Confirm</Button>
              </Grid>
            :
              <Grid item xs={16} sx={{display: 'flex', justifyContent: 'right'}}>
                <Button variant='contained' color='secondary' onClick={()=> setDisabled(!disabled)}>Edit Weekly Schedule</Button>
              </Grid>
            }
            
        </Grid>
      {/* Grid containing calendar and form */}
          {/* Calendar */}
          <Grid item xs={6}>
              <Box className="clientSchedule" sx={{display: 'flex', height: '55vh', width: '40vw', border: 1, borderColor: 'black', justifyContent: 'center', alignContent: 'center'}}>
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
                    // console.log(clientSchedule)
                    let selectedMUIClass='';
                    if (day.$d === dayjs()){
                        selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                      }

                    return (
                        <Box
                        key={day.$D}
                        className="clientSchedule"
                        sx={{width: '6vw', height: '6vw', display: 'flex', mt: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'flex-start', border: 1, borderColor: '#7BCEC8', mt: 0}}>
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
                            {/*  map through changes array: Is there a change for today? YES:, NO: check to see if it is a regularly scheduled day and render regularly scheduled dogs */}

                          {changes.length !== 0 ? 
                            <>
                            {changes && changes.map((change, index) => {
                              // does the change date match today's date?
                              return(
                              <div key={change.id}> 
                                {/* is there a change scheduled today (month, day & year? */}
                                { JSON.stringify(DayComponentProps.day.$d) === JSON.stringify(dayjs(change.date_to_change).$d) ? 
                                  <div>
                                  {/*  is this change to add a dog? */}
                                  {change.is_scheduled ?
                                    <>
                                    {/* Is this change happening on a regularly scheduled weekday? */}
                                    { clientSchedule && clientSchedule[day.$W] ? 
                                        <>
                                        {dogs.map((dog, index)=> {
                                          return (
                                          <div key={dog.dog_id}>
                                          {/* render all the regularly scheduled dogs AND the dog added */}
                                            {dog.regular || change.dog_id === dog.dog_id ? 
                                              <Avatar 
                                                  key={dog.dog_id}
                                                  sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                                  alt={dog.dog_name[0]}
                                                  src={dog.image ? dog.image : null}
                                              >{dog.dog_name[0]}
                                              </Avatar>
                                            : null}
                                          </div>)
                                          })}
                                        </>
                                      :
                                      // Adding a dog on a non-regularly scheduled weekday:
                                      <>
                                        {dogs.map((dog, index)=> {
                                          return (
                                          <div key={dog.dog_id}>
                                          {/* render the dog(s) added */}
                                            {change.dog_id === dog.dog_id ? 
                                              <Avatar
                                                  key={dog.dog_id}
                                                  sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                                  alt={dog.dog_name[0]}
                                                  src={dog.image ? dog.image : null}
                                              >{dog.dog_name[0]}
                                              </Avatar>
                                            : null}
                                          </div>)
                                          })}
                                        </>
                                      }</>
                                    
                                  : 
                                  // The change is to delete a dog, change.is_scheduled === false:
                                  <>
                                    {/* Is this change happening on a regularly scheduled weekday? */}
                                    {clientSchedule[day.$W] ? 
                                        <>
                                        {dogs.map((dog, index)=> {
                                          return (
                                          <div key={dog.dog_id}>
                                          {/* render all the regularly scheduled dogs EXCEPT the dog deleted */}
                                            {dog.regular && change.dog_id !== dog.dog_id ? 
                                              <Avatar
                                                  key={dog.dog_id}
                                                  sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                                  alt={dog.dog_name[0]}
                                                  src={dog.image ? dog.image : null}
                                              >{dog.dog_name[0]}
                                              </Avatar>
                                            : null}
                                          </div>)
                                          })}
                                        </>
                                      :
                                      null
                                      }</>
                                  }
                                  </div>
                                :
                                // There are no schedule changes for today:
                                <>
                                  {/* is today a regularly scheduled weekday? */}
                                  {/* the index === changes.length-1 part prevents the dogs from rendering multiple times */}
                                  {clientSchedule[day.$W] && index === changes.length-1 ? 
                                    <Box key={day.$D} sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
                                      {dogs.map((dog, index)=> {
                                        
                                        return (
                                        <div key={dog.dog_id}>
                                        {/* render the dog(s) added */}
                                          { dog.regular && JSON.stringify(DayComponentProps.day.$d) !== JSON.stringify(dayjs(change.date_to_change).$d) ? 
                                            <Avatar
                                                key={dog.dog_id}
                                                sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                                alt={dog.dog_name[0]}
                                                src={dog.image ? dog.image : null}
                                            >{dog.dog_name[0]}
                                            </Avatar>
                                          : null}
                                        </div>)
                                        })}
                                    </Box>
                                  :
                                  // There are no changes today AND today is not a regularly scheduled day
                                  null
                                  }
                                </>
                                }
                              </div>)
                            })} {/* this is the end of mapping through changes */}
                            </>
                            :
                              <>
                              {clientSchedule[day.$W] ? 
                                <>
                                  {dogs.map((dog, index)=>(
                                    <Avatar
                                    key={dog.dog_id}
                                    sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                    alt={dog.dog_name[0]}
                                    // src={dog.image !== null ? dog.image : null }
                                    >{dog.dog_name[0]}
                                    </Avatar>
                                  ))}
                                </>
                                :
                                null
                                }
                              </>
                            
                            } {/* No changes go here */}
                            
                          </Box>
                          : null} {/* this null is for the day not being within the current month */}
                        </Box>
                    );
                    }}/>
              </LocalizationProvider>
              {/* END of CALENDAR */}

              
          {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
        </Box >
          </Grid>
          {/* Form */}
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
                      
                      label="Date desktop"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} sx={{ mt: 2 ,mr: 4, pb: 1, width: '20vw' }} />}
                  />
                </LocalizationProvider>
              <Grid sx={{mt: 2}}>
                  <Button variant='contained' color='secondary' onClick={handleSubmit}> Submit</Button>
                  <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
              </Grid>
          </Grid>
    </Grid>
    
    

    
  {/*-------- below here is for the one off changes------------ */}

  
    
  
  {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
  </>
  )
}


export default ClientSchedule;


