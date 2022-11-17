import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ClientSchedule.css';

//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField, CardActionArea } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CheckIcon from '@mui/icons-material/Check';
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
  const schedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  const dogs = client.dogs;

  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
    // Fetch client schedule changes
    dispatch({ type: 'SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', payload: client.id})
  }, []);
  
  const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)
  //local useState state I am using for this functionality
  const [dog, setDog] = useState('');
  // console.log(dog);
  const [changeDate, setChangeDate] = useState('');
  const [dogChanges, setDogChanges]= useState('');
  const [action, setAction] = useState('');
  const [scheduled, setScheduled] = useState('');
  const [value, setValue] = useState(dayjs());
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

// this handles the change of the date based on the date picker
  const handleChange = (newValue) => {
    // setValue(dayjs(newValue.$d.slice(0,10)));
    let changeDateFormatting = JSON.stringify(newValue).slice(1,11); //this gets back just the yyyy-mm-dd string value
    setValue(newValue)
    setChangeDate(dayjs(changeDateFormatting).$d)
    // console.log(changeDate);
  }
  //NEED to get value and change.date_to_change to match

  //this is for the submit button for the one off changes
  let updatedChanges = [];
  let addChanges = [];
  const handleSubmit = (event) => {
    // need to add date_to_change and is_selected to each one
    let newChanges = [];
    if (dog === "all"){
      client.dogs.map(singleDog => {
        let thisChange = {dog_id: singleDog.dog_id, client_id: client.id, date_to_change: changeDate, is_scheduled: scheduled}
        newChanges.push(thisChange)
      })
    }
    else {
      let thisChange = {dog_id: dog, client_id: client.id, date_to_change: changeDate, is_scheduled: scheduled}
      newChanges.push(thisChange)
    }
     // need to reset local states:
    setDog('');
    setScheduled('');
    setValue (dayjs());

    if (changes.length === 0){
      addChanges = newChanges;
    }
    else{
      // mapping through newChanges
    loop1:
      for (let thisChange of newChanges){
        console.log('in newChanges');
          for (let change of changes) {
            console.log('thisChange is:', thisChange);
            console.log('change is:', change);
            let existingChangeDate = JSON.stringify(dayjs(change.date_to_change.slice(0,10)).$d); // this formats the date to match that of the new change
            let newChangeDate = JSON.stringify(thisChange.date_to_change)
            // does the dog_id match?
            if (thisChange.dog_id === change.dog_id){
              console.log('ids match')
              // does the date and is_scheduled match? 
              if(existingChangeDate === newChangeDate && thisChange.is_scheduled === change.is_scheduled){
                //  this change already exists, continue
                console.log('this change already exists')
                break loop1;
              }
              // does the date match and the is_scheduled does not?
              else if (existingChangeDate === newChangeDate && thisChange.is_scheduled !== change.is_scheduled){
                // this change already exists and needs to be updated
                console.log('this change exists and needs to be updated')
                updatedChanges.push(thisChange)
                break loop1;
              }
            }
            // the dog_id does not match
            else{
              addChanges.push(thisChange)
              break;
            }
            
          }
      }
      console.log(updatedChanges);
      console.log(addChanges);    
      // dispatch updatedChanges an addChanges to add/update changes. 
    }
    }


//this function changes a client's regular schedule
const regularScheduleChange = (event) =>{
  dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: schedule})
}

  // CALENDAR STUFF
  const clientSchedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  console.log(clientSchedule)

  // const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

  // const changes =[{id: 1, dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {id: 2, dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

  const noChange = ()=> {// This is a blank function used as a placeholder for the onChange of the calendar picker. onChange is required but has no use in this case. 
  }

  const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];

  // weekly schedule stuff:
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [enabled, setEnabled] = useState(true);

  return (
    <>
    <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', xs: 12}}>
      {/* Grid containing weekly schedule */}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        {schedule && daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2} sx={{mt: 5}} >
              <Card raised>
                <CardActionArea component={Button}
                  disabled={enabled}
                  >
                  <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: schedule[index+1]? '#7BCEC8' : 'none', height: '3vh', alignItems: 'center' }}>
                      <Typography variant="h7" sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
            <Grid item xs={16} sx={{display: 'flex', justifyContent: 'right'}}>
              <Button variant='contained' color='secondary' onClick={()=> setEnabled(!enabled)}>Edit Weekly Schedule</Button>
            </Grid>
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
                      onChange={handleChange}
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


