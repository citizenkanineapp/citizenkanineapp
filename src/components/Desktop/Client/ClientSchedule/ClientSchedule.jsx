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
    const clientSchedule = {1: true, 2: true, 3: true, 4: true, 5: false}
    // const dogs = useSelector(store=> store.clientReducer.dogs)
    const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

    
    const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
    
    // CALENDAR STUFF
    const [date, setDate] = useState(dayjs());
    
    // console.log(dayjs())
    const [value, setValue] = useState(dayjs());
    // console.log(value)
    
    // const handleChange = (newValue) => {
    //   console.log(newValue)
    //   console.log(newValue.$d)
    //   // Fri Nov 18 2022 09:41:13 GMT-0600 (Central Standard Time)
    //   console.log(newValue.$D)
    //   // 18
    //   setValue(newValue.$d);
    // };
    
    // Testing to add a dog:
    const changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

    // console.log(dayjs('2022-11-22').$W); // returns 2 for Tuesday
    // console.log(dayjs('2022-11-22').$d); // returns Tue Nov 22 2022 00:00:00 GMT-0600



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
              // renderDay is essentially mapping through each day in the selected month.
              renderDay={(day, _value, DayComponentProps) => {
                // console.log('day is:', day.$W);
                // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                let selectedMUIClass='';
                // console.log(day)
                if (day.$d === dayjs()){
                    selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                }

                // DATA BEING USED:

                // const changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

                // const clientSchedule = {1: true, 2: true, 3: true, 4: true, 5: false}

                // const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

                return (
                    <Box
                    key={day.$D}
                    className="clientSchedule"
                    sx={{width: '5vw', height: '5vw', display: 'flex', mt: 1, flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'center', border: 1, borderColor: '#7BCEC8', mt: 0}}>
                      {/* This box is just for the date number */}
                      <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: '1', mb: 0}}>
                        <PickersDay 
                        key={day.$D}
                        className={ selectedMUIClass }
                        {...DayComponentProps} />
                      </Box>
                      {/* Is this date in the current month ?*/}
                    {!DayComponentProps.outsideCurrentMonth ?
                      <div>
                        {/*  map through changes array: Is there a change for today? YES:, NO: check to see if it is a regularly scheduled day and render regularly scheduled dogs */}
                        {/* changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: true}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}] */}
                        {changes && changes.map(change => {
                          // console.log('in changes. today is:',day.$D, 'the change is:',change)
                          // does the change date match today's date?
                          // START OF FIRST CONDITIONAL:
                          return(
                          <div> 
                            {day.$D === dayjs(change.date_to_change).$D ? 
                              <div>
                              {change.is_scheduled && clientSchedule[day.$W] ?
                                <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0}}>
                                  {dogs.map(dog=> {
                                    return (
                                    <>
                                      {dog.regular || change.dog_id === dog.dog_id ? 
                                        <Avatar
                                            key={dog.dog_id}
                                            sx={{width: '1vw', height: '1vw', mx: .25}}
                                            alt={dog.dog_name[0]}
                                            src={dog.image ? dog.image : null}
                                        >
                                        </Avatar>
                                      : null}
                                    </>)
                                  })}
                                </Box>
                              : null}
                              </div>
                            :null
                            }
                          </div>)
                          // END OF FIRST CONDITIONAL
                          if (day.$D === dayjs(change.date_to_change).$D){
                            // clientSchedule = {1: true, 2: false, 3: true, 4: true, 5: false}
                            // is the change.is_scheduled === true and today lands on a regularly scheduled day? (dog being added)
                            // console.log('change scheduled', change.is_scheduled, 'today regularly scheduled',clientSchedule[day.$W] )
                            if ( change.is_scheduled && clientSchedule[day.$W] ){
                              console.log('on this day,', day.$D, 'the client is regularly scheduled',clientSchedule[day.$W])
                              dogs.map(dog=> {
                                // console.log('this is the date of change',dayjs(change.date_to_change).$D,'this dog',dog.dog_id, 'is regularly scheduled,', dog.regular , 'and today is a regularly scheduled day', clientSchedule[day.$W] )
                                // if the dog is regularly scheduled or the dog id for the change matches the dog_id => render the dog 
                                {(dog.regular || change.dog_id === dog.dog_id)
                                  console.log('this avatar should be rendering')
                                  return <Avatar
                                              key={dog.dog_id}
                                              sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                              // alt={dog.dog_name[0]}
                                              // src={dog.image ? dog.image : null}
                                          >{dog.dog_name[0]}
                                          </Avatar>
                                    }
                              })
                            }
                            //IF today is not a regularly scheduled day and change.is_scheduled === true, render only the dog for today's change: 
                            if ( change.is_scheduled && !clientSchedule[day.$W]){
                              dogs.map(dog=> {

                                if (dog.dog_id === change.dog_id){
                                  return (
                                    <Avatar
                                        key={dog.dog_id}
                                        sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                        alt={dog.dog_name[0]}
                                        src={dog.image ? dog.image : null}
                                    >
                                    </Avatar>
                                    )
                                }
                              })
                            }
                            // IF change.is_scheduled === false and today is a regularly scheduled day, render all dogs with dog.regular === true and who's id does not match the one on the change
                            if( !change.is_scheduled && clientSchedule[day.$W]){
                              dogs.map(dog=> {
                                if ( dog.regular && dog.dog_id !== change.dog_id){
                                  return (
                                    <Avatar
                                        key={dog.dog_id}
                                        sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                        alt={dog.dog_name[0]}
                                        src={dog.image ? dog.image : null}
                                    >
                                    </Avatar>
                                    )
                                }
                              })
                            } // end of conditionals for days with changes. If a change with a is_scheduled === false and today is not a regularly scheduled day, nothing is rendered. 
                          }
                          // THIS ELSE is for when there is no change listed for today:
                          else {
                            // IF there is no change today and today is a regularly scheduled day, render all dogs that are regularly scheduled
                            if (day.$W === clientSchedule[day.$W]){
                              dogs.map(dog=> {
                                return (
                                  <Avatar
                                      key={dog.dog_id}
                                      sx={{width: '1.25vw', height: '1.25vw', mx: .25}}
                                      alt={dog.dog_name[0]}
                                      src={dog.image ? dog.image : null}
                                  >
                                  </Avatar>
                                  )
                              })
                            }
                          }
                        })}
                        
                      </div>
                      
                      : null} {/* this null is for the day not being within the current month */}
                      
                    </Box>
                );
                }}/>
          </LocalizationProvider>

          
      {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
    </Box >
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