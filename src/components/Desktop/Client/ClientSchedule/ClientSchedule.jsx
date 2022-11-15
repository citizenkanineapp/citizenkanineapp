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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};


function ClientSchedule() {
  const dispatch = useDispatch();
  
  // useEffect(()=> {
    //   dispatch({
      //     type: 'SAGA_FETCH_DOGS',
      //     // this payload will have to be changed to the selected client_id
      //     payload: 9
      //   })
      // },[])
      
    // const clientSchedule= useSelector(store=> store.clientScheduleReducer);
    const clientSchedule = {1: true, 2: false, 3: true, 4: true, 5: false}
    const dogs = useSelector(store=> store.clientReducer.dogs)
    
    
    // const [value, onChange] = useState(new Date());
    const [dog, setDog] = useState('');
    const [action, setAction] = useState('');
    
    const [walk, setWalk] = useState(false);
    
    
    
    const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
    
    // CALENDAR STUFF
    const [date, setDate] = useState(dayjs());
    
    // console.log(dayjs())
    const [value, setValue] = useState(dayjs());
    // console.log(value)
    
    const handleChange = (newValue) => {
      console.log(newValue)
      console.log(newValue.$d)
      // Fri Nov 18 2022 09:41:13 GMT-0600 (Central Standard Time)
      console.log(newValue.$D)
      // 18
      setValue(newValue.$d);
    };
    
    // Testing to add a dog:
    const mockChanges =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: true}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

    console.log(dayjs('2022-11-22').$W); // returns 2 for Tuesday
    console.log(dayjs('2022-11-22').$d); // returns Tue Nov 22 2022 00:00:00 GMT-0600



  return (
    <>
    <Box className="clientSchedule" sx={{height: '55vh', width: '38vw', border: 1, borderColor: 'black', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      {/* <h1>Client Name</h1> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker 
              sx={{height: '100vh', width: '100vw'}}
              className='clientSchedule'
              date={date} 
              onChange={(newDate) => setDate(newDate)} 
              shouldDisableDate={isWeekend}
              renderInput={(params) => {
                    // console.log(dayjs());
                    <TextField key={day.$D} {...params} />
                    }}
              renderDay={(day, _value, DayComponentProps) => {
                // console.log('day is:', day.$W);
                // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                let selectedMUIClass='';
                // console.log(day)
                if (day.$d === dayjs()){
                    selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                }

                return (
                    <Box
                    className="clientSchedule"
                    sx={{width: '5vw', height: '5vw', display: 'flex', mt: 1, flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'center', border: 1, borderColor: '#7BCEC8', mt: 0}}>
                      {/* This box is just for the date number */}
                      <Box key={day.$d} sx={{display: 'flex', justifyContent: 'center', flexGrow: '1', mb: 1}}>
                        <PickersDay 
                        className={ selectedMUIClass }
                        {...DayComponentProps} />
                      </Box>
                      {/* Adding dog avatars to client scheduled weekdays */}
                      {/* Is this date in the current month ?*/}
                      {!DayComponentProps.outsideCurrentMonth ?
                        // Is there a change on today's date?
                        // mockChanges =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: true}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]
                        <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '5', flexWrap: 'wrap', alignContent: 'flex-start', justifyContent:'center', mb: 0}}>
                        {/* Map through mockChanges and see if the today's date matches the date_to_change: */}
                          {mockChanges.map(change=> {
                            // does today's date match the date_to_change?
                            if (day.$d === dayjs(change.date_to_change).$d){
                              // is this day also on the normal client schedule and !is_scheduled? (cancelation)
                                const dayOfWeek = dayjs(change.date_to_change).$W;
                                if( clientSchedule[dayOfWeek] && !change.is_scheduled){
                                  // render all but the dog that was changed:
                                  dogs.map(dog=> {
                                    if (dog.dog_id !== change.dog_id){
                                      return (
                                        <Avatar
                                            sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                            alt={dog.dog_name[0]}
                                            src={dog.image ? dog.image : null}
                                        >
                                        </Avatar>)
                                    }
                                  })
                                }
                                // if the day to change is not on the schedule, map through dogs and add dog:
                                else if (!clientSchedule[dayOfWeek] && change.is_scheduled){
                                  dogs.map(dog=> {
                                    if (dog.dog_id === change.dog_id){
                                      return (
                                        <Avatar
                                            sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                            alt={dog.dog_name[0]}
                                            src={dog.image ? dog.image : null}
                                        >
                                        </Avatar>)
                                    }
                                })
                              }
                            }
                            else{
                              // is todays day of week part of the clients schedule?
                              if (day.$W === clientSchedule[day.$W]){
                                dogs.map(dog=> {
                                  return (
                                    <Avatar
                                        sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                        alt={dog.dog_name[0]}
                                        src={dog.image ? dog.image : null}
                                    >
                                    </Avatar>)
                                })
                              }
                            }
                            }
                        )}
                        </Box>
                      : 
                      null
                      }
                    </Box>
                );
                }}/>
          </LocalizationProvider>

          
      {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
    </Box >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={ handleChange }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </>
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