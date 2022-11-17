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
  

      
    // const clientSchedule= useSelector(store=> store.clientScheduleReducer);
    const clientSchedule = {1: true, 2: true, 3: true, 4: true, 5: false}
    // const dogs = useSelector(store=> store.clientReducer.dogs)
    const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

    
    const avatarColors = ['#4A5061', '#F5A572', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
    
    // CALENDAR STUFF
    // Testing to add a dog:
    const changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

    // console.log(dayjs('2022-11-22').$W); // returns 2 for Tuesday
    // console.log(dayjs('2022-11-22').$d); // returns Tue Nov 22 2022 00:00:00 GMT-0600
  const boxStyling = {display: 'flex', flexDirection: 'row', height: '4vw', width: '4.5vw', alignItems: 'flex-start', justifyContent:'center', mb: 0}
  const avatarStyling = {width: '1vw', height: '1vw', mx: .25}

  // {display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0}

  return (
    <>
    <Box className="clientSchedule" sx={{display: 'flex', height: '55vh', width: '40vw', border: 1, borderColor: 'black', justifyContent: 'center', alignContent: 'center'}}>
      {/* <h1>Client Name</h1> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker 
              className='clientSchedule'
              shouldDisableDate={isWeekend}
              renderInput={(params) => {
                    // console.log(dayjs());
                    <TextField key={day.$D} {...params} />
                    }}
              // renderDay is essentially mapping through each day in the selected month.
              renderDay={(day, _value, DayComponentProps) => {
                console.log(JSON.stringify(DayComponentProps.day.$d));
                console.log(JSON.stringify(dayjs('2022-11-22').$d))
                console.log(JSON.stringify(DayComponentProps.day.$d) === JSON.stringify(dayjs('2022-11-22').$d));
                // console.log('day is:', day.$W);
                // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                let selectedMUIClass='';
                // console.log(day)
                if (day.$d === dayjs()){
                    selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                }
                const renderOnce = true;
                // DATA BEING USED:

                // const changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

                // const clientSchedule = {1: true, 2: true, 3: true, 4: true, 5: false}

                // const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

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
                        {/* changes =[{dog_id: 1, date_to_change: '2022-11-18', is_scheduled: true}, {dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}] */}

                        {changes && changes.map((change, index) => {
                          // console.log('in changes. today is:',day.$D, 'the change is:',change)
                          // does the change date match today's date?
                          // START OF FIRST CONDITIONAL:
                          return(
                          <div> 
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
                                      <>
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
                                      </>)
                                      })}
                                    </Box>
                                  :
                                  // Adding a dog on a non-regularly scheduled weekday:
                                  <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
                                    {dogs.map((dog, index)=> {
                                      return (
                                      <>
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
                                      </>)
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
                                      <>
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
                                      </>)
                                      })}
                                    </Box>
                                  :
                                  // Adding a dog on a non-regularly scheduled weekday:
                                  <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: '8', flexWrap: 'wrap',width: '4.5vw', alignContent: 'flex-start', justifyContent:'center', mb: 0, pt: 1.5}}>
                                    {dogs.map((dog, index)=> {
                                      return (
                                      <>
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
                                      </>)
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
                                    <>
                                    {/* render the dog(s) added */}
                                      { dog.regular && JSON.stringify(DayComponentProps.day.$d) !== JSON.stringify(dayjs('2022-11-22').$d) ? 
                                        <Avatar
                                            key={dog.dog_id}
                                            sx={{width: '1.25vw', height: '1.25vw', mx: .25, fontSize: 13, border: 2, bgcolor: avatarColors[index], borderColor: avatarColors[index]}}
                                            alt={dog.dog_name[0]}
                                            src={dog.image ? dog.image : null}
                                        >
                                        </Avatar>
                                      : null}
                                    </>)
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
  </>
  )
}

export default ClientSchedule;


