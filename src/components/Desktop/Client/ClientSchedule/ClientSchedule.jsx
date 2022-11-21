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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

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
  
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
    // Fetch client schedule changes
    dispatch({ type: 'SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', payload: client.id })
  }, []);
  
  const schedule = useSelector(store => store.clientScheduleReducer.clientSchedule)
  const clientSchedule = useSelector(store => store.clientScheduleReducer.editClientSchedule)
  const changes = useSelector(store=> store.clientScheduleReducer.clientScheduleChanges)
  // console.log(dayjs(changes[0].date_to_change).$d)
  ;  //local useState state I am using for this functionality
  const [dog, setDog] = useState('');
  // console.log(dog);
  const [scheduled, setScheduled] = useState('');
  // The conditional useState prevents the user from adding a dog walk on a weekend
  const [value, setValue] = useState(()=>{
    if(dayjs().$W === 0 || dayjs().$W === 6){
      return dayjs().add(1, 'day');
    }
    else{
      return dayjs();
    }
  });
  
  
  // THIS handles the change of the date based on the date picker
  const handleDateChange = (newValue) => {
    console.log(newValue);
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
        let thisChange = { dog_id: singleDog.dog_id, client_id: client.id, date_to_change: changeDate, is_scheduled: scheduled }
        newChanges.push(thisChange)
      })
    }
    else {
      let thisChange = { dog_id: dog, client_id: client.id, date_to_change: changeDate, is_scheduled: scheduled }
      newChanges.push(thisChange)
    }

    // if there are new changes, then post changes.
    if (newChanges.length > 0){
      dispatch({
        type: 'SEND_ONE_SCHEDULE_CHANGE',
        payload: newChanges
      })
      setAddChange(!addChange)
    }

     // need to reset local states:
    setDog('');
    setScheduled('');
    setValue (dayjs());
    // console.log('newChanges', newChanges)

    setAddChange(!addChange);
  }

  // CALENDAR STUFF
  const noChange = ()=> {// This is a blank function used as a placeholder for the onChange of the calendar picker. onChange is required but has no use in this case. 
  }

  const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D'];

  // weekly schedule stuff:
  const daysOfWeek = ['MON', 'TUES', 'WEDS', 'THURS', 'FRI'];
  const [disabled, setDisabled] = useState(true);

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

  const DogAvatar=({dog,index, id, className})=>{
    return (
    <Avatar
        className={className}
        key={id}
        sx={{width: '1.30vw', height: '1.30vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
        alt={dog.dog_name[0]}
        src={dog.image ? dog.image : null}
    >
    {dog.dog_name[0]}
    </Avatar>)
  }

  const [addChange, setAddChange] = useState(false);

  return (
    <>
      <Box sx={{ height: '95%', width: '100%', display: 'flex', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', p: 2, gap: 3 }}>
        <Box sx={{height: '10%', display: 'flex'}}>
          <Typography variant="h3">{client.first_name} {client.last_name}</Typography>
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'row', height: '70%'}}>
 
            {/*---------------- REGULAR SCHEDULE ----------------*/}
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                    <h2>Adjust Schedule</h2>
                  {!disabled ?
                      <IconButton onClick={handleWeekScheduleChange}
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: 1,
                          border: "1px solid #3f89a4",
                          '&:hover': {bgcolor: '#3f89a4'}
                        }}>
                        <CheckIcon sx={{ fill: "#3f89a4", '&:hover': {fill: 'whitesmoke' } }}/>
                      </IconButton>
                      :
                      <IconButton onClick={() => setDisabled(!disabled)} disabled={addChange}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1,
                        border: "1px solid #c5c4bf",
                        '&:hover': {bgcolor: '#aba8a5'}
                      }}>
                      <EditIcon sx={{ fill: "#aba8a5", '&:hover': {fill: 'whitesmoke' }  }}/>
                      </IconButton>
                    }
                  </Box>
            </Box>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            {/* Mapping through days of the week array to render buttons for week1 */}
            {daysOfWeek.map((day, index) => (
              <Grid item key={index + 1} xs={2}>
                <Card elevation={2} xs={{ height: '30vh' }}>
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

                    <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: clientSchedule[index + 1]? '#4a5061' : 'none', height: '3vh', alignItems: 'center' }}>
                      <Typography sx={{color: clientSchedule[index + 1] ? 'whitesmoke' : '#4a5061', fontWeight: 500, px: 1 }}>{day}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              ))}
            </Grid>

            {/*----------------- ONE OFF CHANGES -----------------*/}
            {addChange  ?
              <Grid item xs={5} sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                    <h2>Adjust Schedule</h2>
                    <IconButton onClick={handleSubmit} 
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1,
                        border: "1px solid #e0923f",
                        '&:hover': {bgcolor: '#bd7222'}
                      }}>
                      <CheckIcon sx={{ fill: "#bd7222", '&:hover': {fill: 'whitesmoke' } }}/>
                    </IconButton>
                  </Box>
                  <FormControl  color="error" sx={{pb: 2, width: '25vw' }}>
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
                      <FormControl  color="error" sx={{pb: 2, width: '25vw' }}>
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
                        renderInput={(params) => <TextField {...params} sx={{width: '25vw'}} />}
                    />
                  </LocalizationProvider>
              </Grid>
              :
              <Grid item xs={5} sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
                    <h2>Adjust Schedule</h2>
                    <IconButton onClick={() => setAddChange(!addChange)} disabled={!disabled}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 1,
                        border: "1px solid #c5c4bf",
                        '&:hover': {bgcolor: '#aba8a5'}
                      }}>
                      <EditIcon sx={{ fill: "#aba8a5", '&:hover': {fill: 'whitesmoke' }  }}/>
                    </IconButton>
                  </Box>
                    <Select disabled={true} value={''} label="Dog" color="error" sx={{mb: 2, width: '25vw' }}></Select>
                    <Select disabled={true} value={''} label="Dog" color="error" sx={{mb: 2, width: '25vw' }}></Select>
                    <Select disabled={true} value={''} label="Dog" color="error" sx={{mb: 2, width: '25vw' }}></Select>
              </Grid>                
            }
            </Box>

            {/* Calendar */}
            <Grid item xs={6}>
                <Box className="clientSchedule" sx={{display: 'flex', height: '55vh', width: '40vw',max_height:'55vh', border: 1, borderColor: 'black', justifyContent: 'center', alignContent: 'center'}}>
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
                      console
                      // console.log(JSON.stringify(DayComponentProps.day.$d))
                      let thisDayString = JSON.stringify(DayComponentProps.day.$d)
                      let selectedMUIClass='';
                      console.log()
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
                                            return change.dog_id === dog.dog_id && JSON.stringify(dayjs(change.date_to_change).$d) === thisDayString
                                          })
                                          
                                          // console.log(typeof(dogChange))
                                          // if there is a change for the dog:
                                          if(dogChange.length > 0){
                                            // console.log('there is a change', dogChange);
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
                                            
                                            if (thisChange.dog_id === dog.dog_id && JSON.stringify(dayjs(thisChange.date_to_change).$d) === thisDayString && thisChange.is_scheduled){
                                              return (
                                                <DogAvatar id={dog.dog_id} index={index} dog={dog}/>
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
            </Box>
            </Grid>
        </Box>
        {/*-------------------- BUTTONS --------------------*/}
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "6%"}}>
          <Button variant="outlined" color="info" 
                      onClick={() => {dispatch({ type: 'SET_MODAL_STATUS' })}}>Back</Button>
        </Box>
      </Box>
    </>

  )
}


export default ClientSchedule;


