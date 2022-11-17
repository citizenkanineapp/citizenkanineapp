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
  

      

  // CALENDAR STUFF
  const clientSchedule = {1: true, 2: true, 3: true, 4: true, 5: false}

  const dogs = [{dog_name: 'Cord', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 1, dog_notes: null, flag: null, regular: true}, {dog_name: 'Pamela', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg', dog_id: 7, dog_notes: null, flag: null, regular: false}, {dog_name: 'Tami', image: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jp', dog_id: 16, dog_notes: null, flag: null, regular: true}]

  const changes =[{id: 1, dog_id: 1, date_to_change: '2022-11-18', is_scheduled: false}, {id: 2, dog_id: 7, date_to_change: '2022-11-22', is_scheduled: true}]

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
                                      { dog.regular && JSON.stringify(DayComponentProps.day.$d) !== JSON.stringify(dayjs('2022-11-22').$d) ? 
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
  </>
  )
}

export default ClientSchedule;


