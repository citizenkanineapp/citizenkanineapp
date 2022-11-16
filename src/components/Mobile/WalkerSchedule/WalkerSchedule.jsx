import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import MobileTopNav from '../MobileNav/MobileTopNav';
import './WalkerSchedule.css';

//CALENDAR 
import dayjs from 'dayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

//MUI
import { Chip, Card, CardContent, Avatar, Box, Typography, Button, Grid, TextField } from '@mui/material';

function EmployeeSchedule() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({ type: 'SAGA_FETCH_EMP_SCHEDULES_ODD' });
    dispatch({ type: 'SAGA_FETCH_EMP_SCHEDULES_EVEN' });
    dispatch({ type: 'SAGA_FETCH_EMPLOYEES' });
  },[]);

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };
  
  const weeksInYear = Array.from({length: 53}, (_, i) => i + 1);

  // console.log('array of weeks',weeksInYear.length)
  // This plugin is needed to get the week number in year:
  var weekOfYear = require('dayjs/plugin/weekOfYear')
  dayjs.extend(weekOfYear)


  const [value, setValue] = useState(dayjs());

  const allEmployees = useSelector(store=> store.allEmployeesReducer.employees);
  const oddEmpSchedules = useSelector(store=> store.allEmployeesReducer.oddEmpSchedules);
  const evenEmpSchedules = useSelector(store=> store.allEmployeesReducer.evenEmpSchedules);
  const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
  


  return (
    <Grid container sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
    
      <MobileTopNav/>

      <LocalizationProvider dateAdapter={AdapterDayjs}  sx={{width: '80%'}}>
                <StaticDatePicker

                    disableHighlightToday={false}
                    orientation="portrait"
                    openTo="day"
                    value={value}
                    shouldDisableDate={isWeekend}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    // render day loops through the days in the month and performs the given function. 
                    renderDay={(day, _value, DayComponentProps) => {
                        // console.log(DayComponentProps );
                        const currentYear = DayComponentProps.day.$y;
                        // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                        const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                        return (
                            <Box key={day.$d} className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'center', width: '100%'}}>
                              <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: '1', width: '5%'}}>
                                <PickersDay {...DayComponentProps} sx={{display: 'flex', alignContent: 'flex-start'}}/>
                              </Box>

                              {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                              {/* is the day within the current month and is this week even(2)? */}
                              {!DayComponentProps.outsideCurrentMonth?
                                <>
                                  {weekInYear % 2 !== 0  ?
                                    <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap', width: '100px'}}>
                                    {oddEmpSchedules.map((employee, index) => {
                                      if (employee[day.$W]){
                                        const bgColor = avatarColors[index];
                                        return <Avatar key={employee.emp_id} sx={{ bgcolor: bgColor, height: 18 , width: 18, fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                      }
                                    })}
                                    </Box>
                                    :
                                    <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'top', alignContent: 'flex-start', flexWrap: 'wrap'}}>
                                    {evenEmpSchedules.map((employee, index) => {
                                    if (employee[day.$W]){
                                      const bgColor = avatarColors[index];
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: 18 , width: 18, fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    // console.log('end of render')
                                  })}
                                  </Box>
                                  }
                                  </>
                                : null 
                              }
                            </Box>
                        );
                    }}
                />
          </LocalizationProvider>
    </Grid>
  );
}

export default EmployeeSchedule;