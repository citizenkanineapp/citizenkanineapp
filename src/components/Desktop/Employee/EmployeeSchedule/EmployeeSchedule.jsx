import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs';

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
import { Typography, Grid, Avatar, Card, CardContent, CardActionArea, Box } from "@mui/material";
import './employeeSchedule.css';



//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";
//MUI
import Button from '@mui/material/Button';

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

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
  // This 👇 state is for the basic datePicker for making changes. 
  const [value2, setValue2] = useState(dayjs());
  // 👇 will have to be replaced with the reducer for the clients schedule and the days will have to be in an array. 
  const [highlightedDays, setHighlightedDays] = useState([1,2,4])
  // console.log('value of StaticDatePicker',value.$W); // This returns an integer (1-5) representing the days of the week (M-F)
  // console.log('value2:', value2.$W);

  // Getting the week number in year:
  var weekOfYear = require('dayjs/plugin/weekOfYear')
  dayjs.extend(weekOfYear)

  const thisWeek = dayjs(dayjs().$d).week();
  console.log('this is week number:', thisWeek);
  

  // Employee schedule Logic:
  const oddEmpSchedules = useSelector(store=> store.employeesReducer.oddEmpSchedules);
  const evenEmpSchedules = useSelector(store=> store.employeesReducer.evenEmpSchedules);
  // console.log(empSchedules);
  // {1: true, 2: true, 3: false, 4: true, 5: true, id: 1, first_name: 'Den', last_name: 'Paolini', email: 'dpaolini0@paypal.com', phone: '(840)6732127', …}
  const allEmployees = useSelector(store=> store.employeesReducer.employees);

  const avatarColors = ['#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D', '#4A5061', '#539BD1', '#7BCEC8', '#F9CB78', '#F5A572', '#F37E2D', '#F8614D' ];
  console.log(avatarColors[0]);

  console.log(dayjs());


  return (
  <div className="container">
    {/* // MUI DatePicker: */}
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
                renderInput={(params) => <TextField key={day.$D} {...params} sx={{height: '80vh'}} />}
                // render day loops through the days in the month and performs the given function. 
                renderDay={(day, _value, DayComponentProps) => {
                    // console.log('day is:', day.$W);
                    // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                    // const isSelected =
                    //     !DayComponentProps.outsideCurrentMonth &&
                    //     highlightedDays.includes(day.$W);

                    const isSelected =
                        !DayComponentProps.outsideCurrentMonth &&
                        highlightedDays.includes(day.$W);
                    
                    {/* Need to check if the week is even or odd */}
                    const weekInYear = dayjs(day.$d).week();
                    // is this week even?

                    return (
                      <div key={day.$D}>
                        <Box className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: '8vw', height: '13vh', justifyContent: 'flex-start', border: 1}}>
                          <Box sx={{display: 'flex', justifyContent: 'right', flexGrow: '1'}}>
                            <PickersDay {...DayComponentProps} sx={{display: 'flex', alignContent: 'flex-start'}}/>
                          </Box>
                          {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                          {/* is the day within the current month and is this week even ? */}
                          { !DayComponentProps.outsideCurrentMonth && weekInYear % 2 !== 0 ?
                            <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', alignContent: 'flex-start'}}>
                            {oddEmpSchedules.map((employee, index) => {
                              if (employee[day.$W]){
                                const bgColor = avatarColors[index];
                                return <Avatar key={employee.emp_id} sx={{ bgcolor: bgColor, height: '5vh' , width: '2.5vw' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                              }
                              
                            })}
                            </Box>
                            :
                            <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', alignContent: 'flex-start'}}>
                            {evenEmpSchedules.map((employee, index) => {
                            if (employee[day.$W]){
                              const bgColor = avatarColors[index];
                              return <Avatar key={employee.emp_id} sx={{ bgcolor: bgColor, height: '5vh' , width: '2.5vw' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                            }
                            
                          })}
                          </Box>
                          }
                          {/* <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', alignContent: 'flex-start'}}>
                          {oddEmpSchedules.map((employee, index) => {
                            if (employee[day.$W]){
                              const bgColor = avatarColors[index];
                              return <Avatar key={employee.emp_id} sx={{ bgcolor: bgColor, height: '5vh' , width: '2.5vw' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                          }
                            
                          })}
                          </Box> */}

                          {/* { isSelected ? 
                            <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: '6'}}>
                            this is where I would map the employees for the days
                            <Avatar sx={{ bgcolor: "secondary.main", height: 20 , width: 20 }}>YH</Avatar>
                          </Box>
                          :
                          null
                          } */}
                          
                        </Box>
                      </div>
                      
                        // <Badge
                        //     key={day.$W}
                        //     // overlap="circular"
                        //     badgeContent={isSelected? '🐶' : undefined}
                        // >
                        //     <PickersDay {...DayComponentProps} />
                        // </Badge>
                    );

                // {/* Testing StaticDatePicker without badges and just highlighting days of the week, not using a badge */}
                // renderDay={(day, _value, DayComponentProps) => {
                //   console.log('day is:', day.$W);
                //   // day.$W returns returns an integer (1-5) representing the days of the week (M-F)
                //   let selectedMUIClass='';
                //   if (highlightedDays.includes(day.$W)){
                //       selectedMUIClass ="MuiButtonBase-root MuiPickersDay-root Mui-selected MuiPickersDay-dayWithMargin css-bkrceb-MuiButtonBase-root-MuiPickersDay-root";
                //   }

                //   return (
                //           <PickersDay 
                //           className={ selectedMUIClass }
                //           {...DayComponentProps} />
                //   );


                }}
            />
        </LocalizationProvider>


    {/* REACT CALENDAR STUFF */}
    {/* <Calendar localizer={localizer}  startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
    {showEditCalendar === false ?

      <div className="display_calendar">
        <h2>Display Calendar</h2>
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
      </div>} */}

    <EmployeeModal/> 
    {/* only open when button is pressed */}
  </div>
  )    
}

export default EmployeeSchedule;