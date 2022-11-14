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
import { Typography, Grid, Avatar, CardActionArea, Box, Card, CardContent } from "@mui/material";



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
  },[]);
  // console.log('first week of year',dayjs('2023-01-01').week())
  // console.log('last week of year',dayjs('2022-12-30').week())

  const allEmployees = useSelector(store=> store.allEmployeesReducer.employees);

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
  return (
  <Box sx={{display: 'flex', width: '100vw', justifyContent: 'center'}}>
    {/* // MUI DatePicker: */}
    <Box className="container" sx={{display: 'flex', flexDirection: 'row', mt: 1}}>
      <Card variant="outlined" sx={{bgcolor: '#FCF4EB'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
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
                        // console.log(DayComponentProps );
                        const currentYear = DayComponentProps.day.$y;
                        // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                        const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                        return (
                            <Box key={day.$d} className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: 90, height: 90, justifyContent: 'center'}}>
                              <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: '1'}}>
                                <PickersDay {...DayComponentProps} sx={{display: 'flex', alignContent: 'flex-start'}}/>
                              </Box>

                              {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                              {/* is the day within the current month and is this week even(2)? */}
                              {!DayComponentProps.outsideCurrentMonth?
                                <>
                                  {weekInYear % 2 !== 0  ?
                                    <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap'}}>
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
        </Card>

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
    </Box>
    {/* employee cards */}
    <Box sx={{display: 'flex', flexDirection: 'column', ml: 2, width: '30vw'}}>
        {evenEmpSchedules.map( (employee, index)=> (
          <Card key={employee.id} sx={{display: 'flex', flexDirection: 'row', mt: 1}}>
            <CardContent sx={{display: 'flex', flexDirection: 'row'}}>
              <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: avatarColors[index], height: 50 , width: 50, fontSize: 10, mr: 1, alignSelf: 'center' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
              <Typography sx={{display: 'flex', alignSelf: 'center'}}>
                {employee.first_name} {employee.last_name}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Box>
    </Box>
  )      
}

export default EmployeeSchedule;