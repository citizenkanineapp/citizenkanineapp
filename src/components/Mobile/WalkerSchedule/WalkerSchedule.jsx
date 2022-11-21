import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import MobileTopNav from '../MobileNav/MobileTopNav';
import dayjs from 'dayjs';
// This plugin is needed to get the week number in year:
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
import './WalkerSchedule.css';

// MUI Imports:
import TextField from '@mui/material/TextField';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Typography, Grid, Avatar, CardActionArea, Box, Card, CardContent, FormControl, Select, InputLabel, MenuItem, Buttom } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// used to disable user from scheduling on a weekend day
const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};


function EmployeeSchedule() {
  // mobile view for dog walker schedules
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch employee schedules
    dispatch({
      type: 'SAGA_FETCH_EMP_SCHEDULES_ODD'
    })
    dispatch({
      type: 'SAGA_FETCH_EMP_SCHEDULES_EVEN'
    })
    // Fetch employee details for employee cards
    dispatch({
      type: 'SAGA_FETCH_EMPLOYEES'
    })
    // FETCH emp schedule changes
    dispatch({
      type: 'SAGA_FETCH_CHANGES'
    })
  }, []);

  const allEmployees = useSelector(store => store.allEmployeesReducer.employees);
  const changes = useSelector(store => store.allEmployeesReducer.empScheduleChanges);

  const [viewAll, setViewAll] = useState(false)
  const [value, setValue] = useState(dayjs());

  const oddEmpSchedules = useSelector(store => store.allEmployeesReducer.oddEmpSchedules);
  const evenEmpSchedules = useSelector(store => store.allEmployeesReducer.evenEmpSchedules);

  const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D'];

  console.log(user.emp_id)
  const empEvenWeek = evenEmpSchedules.filter(emp => {
    return emp.emp_id === user.emp_id
  })

  const empOddWeek = oddEmpSchedules.filter(emp => {
    return emp.emp_id === user.emp_id
  })


  return (
    <Grid container sx={{ xs: 12 }}>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: .25 }}>
        <Select value={viewAll} sx={{ width: '50vw' }} onChange={
          (e) => setViewAll(e.target.value)
        }>
          <MenuItem key={1} value={false} >My Schedule</MenuItem>
          <MenuItem key={2} value={true} >All Employees</MenuItem>
        </Select>
      </Grid>
      {/* Calendar */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', mt: .5, mb: 10 }}>
        {viewAll ?
          <Card variant="outlined" sx={{ bgcolor: '#FCF4EB', width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                className='walkerCalendar'
                disableHighlightToday={false}
                orientation="portrait"
                openTo="day"
                value={value} // not being used
                shouldDisableDate={isWeekend}
                onChange={(newValue) => { // not being used but required
                  setValue(newValue);
                }}
                renderInput={(params) => {
                  // console.log(dayjs());
                  <TextField key={day.$D} {...params} sx={{ height: '80vh' }} />
                }}
                // render day loops through the days in the month and performs the given function. 
                renderDay={(day, _value, DayComponentProps) => {
                  let thisDayString = JSON.stringify(DayComponentProps.day.$d)
                  // console.log(DayComponentProps );
                  const currentYear = DayComponentProps.day.$y;
                  // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                  const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                  return (
                    <Box key={day.$d} className="dayBox" sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: '30vw', height: '23vw', justifyContent: 'center', border: 1, borderColor: '#7BCEC8' }}>
                      {/* This box is just for the date number */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: '1' }}>
                        <PickersDay {...DayComponentProps} sx={{ display: 'flex', alignContent: 'flex-start', width: '5vw', height: '5vw' }} />
                      </Box>

                      {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                      {/* is the day within the current month and is this week even(2)? */}
                      {!DayComponentProps.outsideCurrentMonth ?
                        <>
                          {weekInYear % 2 !== 0 ? // odd week (week1)
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap' }}>
                              {oddEmpSchedules && oddEmpSchedules.map((employee, index) => {
                                const bgColor = avatarColors[index];
                                // if it's a regularly scheduled day and there is an add request, render the employee
                                if (employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })


                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                  //  no changes for this employee and is a regularly scheduled day
                                  else {
                                    return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                  }

                                }// NOT a regularly scheduled day=> check for changes.
                                if (!employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })
                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                }
                              })}
                            </Box>
                            // END OF ODD WEEK LOGIC
                            :
                            // even week (week2)
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap' }}>
                              {evenEmpSchedules && evenEmpSchedules.map((employee, index) => {
                                const bgColor = avatarColors[index];
                                // if it's a regularly scheduled day and there is an add request, render the employee
                                if (employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  // console.log(thisDayString);
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })

                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                  //  no changes for this employee and is a regularly scheduled day
                                  else {
                                    return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                  }

                                }// NOT a regularly scheduled day=> check for changes.
                                if (!employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })
                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    // console.log('there is a change on', thisDayString)
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                }
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
          </Card>

          :
          // SINGLE EMPLOYEE VIEW
          <Card variant="outlined" sx={{ bgcolor: '#FCF4EB', width: '100vw', height: '80vh', display: 'flex', justifyContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                className='walkerCalendar'
                disableHighlightToday={false}
                orientation="portrait"
                openTo="day"
                value={value} // not being used
                shouldDisableDate={isWeekend}
                onChange={(newValue) => { // not being used but required
                  setValue(newValue);
                }}
                renderInput={(params) => {
                  // console.log(dayjs());
                  <TextField key={day.$D} {...params} sx={{ height: '80vh' }} />
                }}
                // render day loops through the days in the month and performs the given function. 
                renderDay={(day, _value, DayComponentProps) => {
                  let thisDayString = JSON.stringify(DayComponentProps.day.$d)
                  // console.log(DayComponentProps );
                  const currentYear = DayComponentProps.day.$y;
                  // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                  const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                  return (
                    <Box key={day.$d} className="dayBox" sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: '30vw', height: '23vw', justifyContent: 'center', border: 1, borderColor: '#7BCEC8' }}>
                      {/* This box is just for the date number */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: '1' }}>
                        <PickersDay {...DayComponentProps} sx={{ display: 'flex', alignContent: 'flex-start', width: '5vw', height: '5vw' }} />
                      </Box>

                      {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                      {/* is the day within the current month and is this week even(2)? */}
                      {!DayComponentProps.outsideCurrentMonth ?
                        <>
                          {weekInYear % 2 !== 0 ? // odd week (week1)
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap' }}>
                              {empOddWeek && empOddWeek.map((employee, index) => {
                                const bgColor = avatarColors[index];
                                // if it's a regularly scheduled day and there is an add request, render the employee
                                if (employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })


                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                  //  no changes for this employee and is a regularly scheduled day
                                  else {
                                    return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                  }

                                }// NOT a regularly scheduled day=> check for changes.
                                if (!employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })
                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                }
                              })}
                            </Box>
                            // END OF ODD WEEK LOGIC
                            :
                            // even week (week2)
                            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap' }}>
                              {empEvenWeek && empEvenWeek.map((employee, index) => {
                                const bgColor = avatarColors[index];
                                // if it's a regularly scheduled day and there is an add request, render the employee
                                if (employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  // console.log(thisDayString);
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })

                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                  //  no changes for this employee and is a regularly scheduled day
                                  else {
                                    return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '5vw', width: '5vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                  }

                                }// NOT a regularly scheduled day=> check for changes.
                                if (!employee[day.$W]) {
                                  // check to see if there are any changes for this employee on this day
                                  const empChange = changes.filter(change => {
                                    return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                  })
                                  // if there are changes for this emp on this day
                                  if (empChange.length > 0) {
                                    // console.log('there is a change on', thisDayString)
                                    if (empChange[0].is_scheduled) {
                                      return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw', width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                    }
                                    else {
                                      return null
                                    }
                                  }
                                }
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
          </Card>

        }
      </Grid>
    </Grid>


  );
}

export default EmployeeSchedule;