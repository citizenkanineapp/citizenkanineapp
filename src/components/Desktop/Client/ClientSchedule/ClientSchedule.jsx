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

  const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)

  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
    // Fetch client schedule changes
    dispatch({ type: 'SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', payload: client.id})
  }, []);

  //local useState state I am using for this functionality
  const [dog, setDog] = useState(client.dogs);
  console.log(dog);
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
    setValue(newValue);
  };


  //this is for the submit button for the one off changes
  const handleSubmit = (event) => {
    // need to add date_to_change and is_selected to each one
    let newChanges = [];
    dog.map(singleDog=> {
      // console.log(dog);
      //create the object for change
      let singleChange = {dog_id: singleDog.dog_id, client_id: client.id, date_to_change: value, is_scheduled: scheduled}
      // add object to newChanges array;
      newChanges.push(singleChange);
    }) 
    setDog([client.dogs])
    // Now we can send this array to the server to add to the database
    // *** Need to map through these changes and see if the change already exists
    console.log(newChanges);

  //   let scheduleChangeObject = []
  //   let month = (value.$M +1)

  //   //different logic based on whether one dog or "all dogs is selected" to create one-off schedule change object
  //   if(dog.length > 1 ){
  //   for(let oneDog of dog){
  //     let dogObject ={
  //       date: `${value.$y}-${month}-${value.$D}`,
  //       is_scheduled: scheduled,
  //       dog_id: oneDog.dog_id,
  //       client_id: client.id,
  //       regular: oneDog.regular
  //       }
  //       scheduleChangeObject.push(dogObject)
  //     }
  //   } else {
  //     let dogObject ={
  //       date: `${value.$y}-${month}-${value.$D}`,
  //       is_scheduled: scheduled,
  //       dog_id: dog,
  //       client_id: client.id,
  //       regular: oneDog.regular
  //     }
  //       scheduleChangeObject.push(dogObject)
  // } 
    // dispatch({type: 'SEND_ONE_SCHEDULE_CHANGE', payload: scheduleChangeObject})
}

//this function changes a client's regular schedule
const regularScheduleChange = (event) =>{
  dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: schedule})
}

  // CALENDAR STUFF
  const clientSchedule = useSelector(store => store.clientScheduleReducer.clientSchedule)

  const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

  // const changes =[{id: 1, dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {id: 2, dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

  const noChange = ()=> {// This is a blank function used as a placeholder for the onChange of the calendar picker. onChange is required but has no use in this case. 
  }

  const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];


  return (
    <>
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
                // console.log(JSON.stringify(DayComponentProps.day.$d))
                // console.log(JSON.stringify(dayjs('2022-11-23T06:00:00.000Z').$d))
                // console.log(JSON.stringify(DayComponentProps.day.$d) === JSON.stringify(dayjs('2022-11-23T06:00:00.000Z').$d))
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
                      <div>
                        {/*  map through changes array: Is there a change for today? YES:, NO: check to see if it is a regularly scheduled day and render regularly scheduled dogs */}

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
                                {clientSchedule[day.$W] ? 
                                    <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
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
                                          >
                                          </Avatar>
                                        : null}
                                      </div>)
                                      })}
                                    </Box>
                                  :
                                  // Adding a dog on a non-regularly scheduled weekday:
                                  <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
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
                                          >
                                          </Avatar>
                                        : null}
                                      </div>)
                                      })}
                                    </Box>
                                  }</>
                                
                              : 
                              // The change is to delete a dog, change.is_scheduled === false:
                              <>
                                {/* Is this change happening on a regularly scheduled weekday? */}
                                {clientSchedule[day.$W] ? 
                                    <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
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
                                          >
                                          </Avatar>
                                        : null}
                                      </div>)
                                      })}
                                    </Box>
                                  :
                                  // Adding a dog on a non-regularly scheduled weekday: (in case they added a dog but then cancel it)
                                  <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '.25vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
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
                                          >
                                          </Avatar>
                                        : null}
                                      </div>)
                                      })}
                                    </Box>
                                  }</>
                              }
                              </div>
                            :
                            // There are no schedule changes for today:
                            <>
                              {/* is today a regularly scheduled weekday? */}
                              {/* the index === changes.length-1 part prevents the dogs from rendering multiple times */}
                              {clientSchedule[day.$W] && index === changes.length-1 ? 
                                <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.55vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
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
                                        >
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
                        })}
                        {/* this is the end of mapping through changes */}
                      </div>
                      : null} {/* this null is for the day not being within the current month */}
                    </Box>
                );
                }}/>
          </LocalizationProvider>

          
      {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
    </Box >

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
            <Select value={dog}  onChange={(event) => {
              setDogChanges(event.target.value)
              setDog([event.target.value])}}>
            <MenuItem value={client.dogs}>All Dogs</MenuItem>
              {client.dogs && client.dogs.map(singleDog => {
                return (
                    <MenuItem key={singleDog.dog_id} value={singleDog}>{singleDog.dog_name}</MenuItem>
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
      <Button variant='contained' color='secondary' onClick={handleSubmit}>
        Submit</Button>
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
  </>
  )
}


export default ClientSchedule;


