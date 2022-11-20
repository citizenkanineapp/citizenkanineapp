import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs';
// This plugin is needed to get the week number in year:
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
import './employeeSchedule.css';

// Calender Imports:
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

// MUI Imports:
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton';
import { Typography, Grid, Avatar, CardActionArea, Box, Card, CardContent, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";
//MUI
import Button from '@mui/material/Button';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

const weeksInYear = Array.from({length: 53}, (_, i) => i + 1)
// console.log('array of weeks',weeksInYear.length)

function EmployeeSchedule(){
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
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
  },[]);
  // console.log('first week of year',dayjs('2023-01-01').week())
  // console.log('last week of year',dayjs('2022-12-30').week())

  const allEmployees = useSelector(store=> store.allEmployeesReducer.employees);
  const changes = useSelector(store=> store.allEmployeesReducer.empScheduleChanges);
  console.log('changes', changes)

  const openModal = (view) => {
    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  //toggle between edit and viewing calendar
  const [showEditCalendar, setShowEditCalendar] = useState(false);


  const [value, setValue] = useState(dayjs());
  // Calling dayjs() without parameters returns a fresh day.js object with the current date and time that looks like:
  // {$L: 'en', $u: undefined, $d: Sat Nov 05 2022 14:37:11 GMT-0500 (Central Daylight Time), $x: {…}, $y: 2022}
  // console.log(value);

  const oddEmpSchedules = useSelector(store=> store.allEmployeesReducer.oddEmpSchedules);
  const evenEmpSchedules = useSelector(store=> store.allEmployeesReducer.evenEmpSchedules);
  // console.log(evenEmpSchedules);
  // {1: true, 2: true, 3: false, 4: true, 5: true, id: 1, week: 2, first_name: 'Den', last_name: 'Paolini', email: 'dpaolini0@paypal.com', phone: '(840)6732127', …}

  const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
  // console.log(dayjs());

  const [date, setDate] = useState(dayjs());
  const [empChange, setEmpChange] = useState({emp_id:'', date_to_change:'', is_scheduled: ''});
  const handleDateChange=(newValue)=>{
    console.log(newValue)
    setDate(newValue)
    let changeDate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
    console.log(changeDate)
    setEmpChange({...empChange, date_to_change: changeDate});
  }

  const handleSubmit=()=>{
    // dispatch change to be added to database
    dispatch({
      type: 'SAGA_ADD_EMP_CHANGE',
      payload: empChange
    })
    setEmpChange({emp_id:'', date_to_change:'', is_scheduled: ''})
    setDate(dayjs())
  }

  changes.map(change=>{
    console.log(JSON.stringify(dayjs(change.date_to_change).$d))
    console.log(JSON.stringify(dayjs('2022-11-03').$d))
    console.log(JSON.stringify(dayjs('2022-11-03').$d) === JSON.stringify(dayjs(change.date_to_change).$d))
  })

  return (
    <>
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', xs: 12 }}>
      <Grid item xs={12} sx={{display: 'flex', flexDirection:'row', mt: 2, justifyContent: 'center'}}>
        <Typography>Add Schedule Change</Typography>
        {/* change form here */}
        <FormControl  sx={{ mr: 4, pb: 1, width: '20vw' }}>
          <InputLabel>Employee</InputLabel>
          <Select value={empChange.emp_id} onChange={(e) => setEmpChange({...empChange, emp_id: e.target.value})}>
                {allEmployees && allEmployees.map(employee => {
                  return (
                      <MenuItem key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</MenuItem>
                      )
                })}
          </Select>
        </FormControl>
        <FormControl  sx={{ mr: 4, pb: 1, width: '20vw' }}>
          <InputLabel>Change Type</InputLabel>
          <Select value={empChange.is_scheduled} onChange={(e) => setEmpChange({...empChange, is_scheduled: e.target.value})}>
            <MenuItem value={true}>Add Employee</MenuItem>
            <MenuItem value={false}>Remove Employee</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DesktopDatePicker
              shouldDisableDate={isWeekend}
              label="Date To Change"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} sx={{mr: 4, pb: 1, width: '20vw' }} />}
          />
        </LocalizationProvider>
        <Button variant='contained' color='secondary' onClick={handleSubmit}> Submit</Button>
          {/* <Grid sx={{mt: 2}}>
              
              <Button variant="outlined" color="info" onClick={() => setAddChange(!addChange)}>Cancel</Button>
          </Grid> */}
      </Grid> 
      
      <Grid item xs={7}>
        {/* calendar here */}
        <Card variant="outlined" sx={{bgcolor: '#FCF4EB'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                      className='empCalendar'
                      disableHighlightToday={false}
                      orientation="portrait"
                      openTo="day"
                      value={value}
                      shouldDisableDate={isWeekend}
                      onChange={(newValue) => {
                      setValue(newValue);
                      }}
                      renderInput={(params) => {
                      // console.log(dayjs());
                      <TextField key={day.$D} {...params} sx={{height: '80vh'}} />
                      }}
                      // render day loops through the days in the month and performs the given function. 
                      renderDay={(day, _value, DayComponentProps) => {
                          let thisDayString = JSON.stringify(DayComponentProps.day.$d)
                          // console.log(DayComponentProps );
                          const currentYear = DayComponentProps.day.$y;
                          // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                          const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                          return (
                              <Box key={day.$d} className="dayBox"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: '8vw', height: '8vw', justifyContent: 'center', border: 1, borderColor: '#7BCEC8'}}>
                                {/* This box is just for the date number */}
                                <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: '1'}}>
                                  <PickersDay {...DayComponentProps} sx={{display: 'flex', alignContent: 'flex-start'}}/>
                                </Box>

                                {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                                {/* is the day within the current month and is this week even(2)? */}
                                {!DayComponentProps.outsideCurrentMonth?
                                  <>
                                    {weekInYear % 2 !== 0  ? // odd week (week1)
                                      <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap'}}>
                                      {oddEmpSchedules && oddEmpSchedules.map((employee, index) => {
                                        const bgColor = avatarColors[index];
                                        // if it's a regularly scheduled day and there is an add request, render the employee
                                        if (employee[day.$W]){
                                          // check to see if there are any changes for this employee on this day
                                          // console.log(thisDayString);
                                          console.log(employee.emp_id)
                                          const empChange = changes.filter(change=> {
                                            return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                          })

                                          
                                          console.log(empChange);
                                          // if there are changes for this emp on this day
                                          if (empChange.length > 0){
                                            console.log('there is a change on', thisDayString)
                                            if(empChange[0].is_scheduled){
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            else{
                                              return null
                                            }
                                          }
                                          //  no changes for this employee and is a regularly scheduled day
                                          else{
                                            return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                          }
                                          
                                        }// NOT a regularly scheduled day=> check for changes.
                                        if (!employee[day.$W]){
                                          // check to see if there are any changes for this employee on this day
                                          const empChange = changes.filter(change=> {
                                            return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                          })
                                          // if there are changes for this emp on this day
                                          if (empChange.length > 0){
                                            // console.log('there is a change on', thisDayString)
                                            if(empChange[0].is_scheduled){
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            else{
                                              return null
                                            }
                                          }
                                        }
                                      })}
                                      </Box>
                                      // END OF ODD WEEK LOGIC
                                      :
                                      // even week (week2)
                                      <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap'}}>
                                      {oddEmpSchedules && oddEmpSchedules.map((employee, index) => {
                                        const bgColor = avatarColors[index];
                                        // if it's a regularly scheduled day and there is an add request, render the employee
                                        if (employee[day.$W]){
                                          // check to see if there are any changes for this employee on this day
                                          // console.log(thisDayString);
                                          console.log(employee.emp_id)
                                          const empChange = changes.filter(change=> {
                                            return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                          })

                                          
                                          console.log(empChange);
                                          // if there are changes for this emp on this day
                                          if (empChange.length > 0){
                                            console.log('there is a change on', thisDayString)
                                            if(empChange[0].is_scheduled){
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            else{
                                              return null
                                            }
                                          }
                                          //  no changes for this employee and is a regularly scheduled day
                                          else{
                                            return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                          }
                                          
                                        }// NOT a regularly scheduled day=> check for changes.
                                        if (!employee[day.$W]){
                                          // check to see if there are any changes for this employee on this day
                                          const empChange = changes.filter(change=> {
                                            return employee.emp_id === change.emp_id && thisDayString === JSON.stringify(dayjs(change.date_to_change).$d)
                                          })
                                          // if there are changes for this emp on this day
                                          if (empChange.length > 0){
                                            // console.log('there is a change on', thisDayString)
                                            if(empChange[0].is_scheduled){
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5 }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            else{
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
      </Grid> {/* End of Calendar */}
      <Grid item xs={4}>
        {/* cards here */}
        <Box sx={{display: 'flex', flexDirection: 'column', ml: 2, width: '30vw', alignItems: 'center'}}>
            {evenEmpSchedules.map( (employee, index)=> (
              <Card raised key={employee.id} sx={{display: 'flex', flexDirection: 'row', mb: 1.5, height: '13vh', width: '25vw', justifyContent: 'center'}}>
                <CardActionArea component={Button}>
                  <CardContent sx={{display: 'flex', flexDirection: 'row'}}>
                    <Grid container xs={12}>
                      <Grid item xs={2}>
                        <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: avatarColors[index], height: 50 , width: 50, fontSize: 10, mr: 1, alignSelf: 'center' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                      </Grid>
                      <Grid item xs={5} sx={{display: 'flex', alignContent: 'center'}}>
                        <Typography sx={{display: 'flex', alignSelf: 'center'}}>
                          {employee.first_name} {employee.last_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <Grid item xs={5}>
                            Week 1:
                        </Grid>
                        <Grid item xs={5}>
                            Week 2:
                        </Grid>
                        </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                
              </Card>
            ))}
        </Box>
      </Grid>
    </Grid>
  <Box sx={{display: 'flex', width: '100vw', justifyContent: 'center'}}>
    {/* // MUI DatePicker: */}
      
        {/* <div className="display_calendar">
        <p onClick={() => openModal('EmployeeDetails')}>Dolly Parton - Click me</p> 
        <Button onClick={() => history.push('/employees')}>Back</Button>
        <Button onClick={() => setShowEditCalendar(!showEditCalendar)}>Edit</Button> 
      </div>

      : //toggles between edit mode and viewing mode

      <div className="edit_calendar">
        <h2>Edit Calendar</h2>
        <p onClick={() => openModal('EmployeeDetails')}>Dolly Parton WANTS TO WORK</p> 
        <Button onClick={() => setShowEditCalendar(!showEditCalendar)}>Cancel</Button>
        <Button onClick={() => setShowEditCalendar(!showEditCalendar)}>Submit</Button> 
        </div> */}

      <EmployeeModal/> 
      {/* only open when button is pressed */}
    {/* employee cards */}
    
    </Box>
    </>
  )      
}

export default EmployeeSchedule;