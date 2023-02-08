import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import dayjs from 'dayjs';
// This plugin is needed to get the week number in year:
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

import './employeeSchedule.css';

// MUI Imports:
import TextField from '@mui/material/TextField';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Typography, Grid, Avatar, CardActionArea, Box, Card, CardContent, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'react-datepicker/dist/react-datepicker.css';


//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";
//MUI
import Button from '@mui/material/Button';

// used to disable user from scheduling on a weekend day
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

  const openModal = (view) => {
    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }


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


  const initialDate =()=> {
    if(dayjs().$W === 0 || dayjs().$W === 6){
      return dayjs().add(1, 'day');
    }
    else{
      return dayjs();
  }}
// The conditional useState prevents the user from adding an employee to a weekend day
  const [date, setDate] = useState(initialDate);
  const [empChange, setEmpChange] = useState({emp_id:'', date_to_change:`${date.$y}-${date.$M + 1}-${date.$D}`, is_scheduled: ''});
  console.log('initial change:', empChange)
  const handleDateChange=(newValue)=>{
    // console.log(newValue)
    // let changeDate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
    // console.log(changeDate)
    setEmpChange({...empChange, date_to_change: `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`});
    setDate(newValue)
  }

  const handleSubmit=()=>{
    // dispatch change to be added to database
    console.log(date)
    console.log(empChange);
    dispatch({
      type: 'SAGA_ADD_EMP_CHANGE',
      payload: empChange
    })
    setEmpChange({emp_id:'', date_to_change:`${date.$y}-${date.$M + 1}-${date.$D}`, is_scheduled: ''})
    setDate(initialDate)
    console.log(empChange);
  }

  const handleClick = (employee)=> {
    openModal('EmployeeDetails');
    // Need to send dispatch to fetch employee and their schedule
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee
    })
    dispatch({
      type: 'SAGA_FETCH_EMP_SCHEDULE',
      payload: employee.id
    })
  }

  return (
    <>
    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', height: '90%', width: '100%'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', height: '6vh', width: '100%', justifyContent: 'flex-start', mt: 3, gap: 1,  ml: '7vw'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Typography sx={{fontSize: '1.5rem', fontWeight: '800'}}>Schedule Changes</Typography>
        
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-start'}}>
        {/* change form here */}
          <FormControl  sx={{width: '15vw' }}>
            <InputLabel>Employee</InputLabel>
            <Select value={empChange.emp_id} onChange={(e) => setEmpChange({...empChange, emp_id: e.target.value})}>
                  {allEmployees && allEmployees.map(employee => {
                    return (
                        <MenuItem key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</MenuItem>
                        )
                  })}
            </Select>
          </FormControl>
          <FormControl  sx={{width: '15vw' }}>
            <InputLabel>Change Type</InputLabel>
            <Select value={empChange.is_scheduled} onChange={(e) => setEmpChange({...empChange, is_scheduled: e.target.value})}>
              <MenuItem value={true}>Add Employee</MenuItem>
              <MenuItem value={false}>Remove Employee</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                shouldDisableDate={isWeekend}
                label="Date To Change"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} sx={{width: '15vw' }} />}
            />
          </LocalizationProvider>
          <Button variant='contained' color='secondary' onClick={handleSubmit} sx={{height: '70%', mt: 1}}> Submit</Button>
        </Box>

          {/* <Grid sx={{mt: 2}}>
              
              <Button variant="outlined" color="info" onClick={() => setAddChange(!addChange)}>Cancel</Button>
          </Grid> */}
    </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', gap: 5, height: '75%'}}>
        <Box sx={{display:'flex', justifyContent:'center',justifyContent: 'flex-start'}}>
          {/* calendar here */}
          <Card variant="outlined" sx={{bgcolor: '#FCF4EB', height: '76vh'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        className='empCalendar'
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
                        <TextField key={day.$D} {...params}  />
                        }}
                        // render day loops through the days in the month and performs the given function. 
                        renderDay={(day, _value, DayComponentProps) => {
                            //let thisDayString = dayjs(DayComponentProps.day).format('YYYY-MM-DD');
                            let thisDayString = dayjs(DayComponentProps.day).utc(true).format('YYYY-MM-DD');

                           // console.log(thisDayString);
                            // console.log(DayComponentProps );
                            const currentYear = DayComponentProps.day.$y;
                            // dayjs calculates weeks in year as a decimal that rounds up so the calculation for weekInYear accounts for this issue. Without this, the last week of the year would be week 53 and the first week of the year would be 1 which are both odd and would render an incorrect schedule. 
                            const weekInYear = day.diff(`${currentYear}-01-01`, 'week', false)
                            return (
                                <Box key={day.$d} className="dayBox"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', width: '8vw', height: '7vw', justifyContent: 'center', border: 1, borderColor: '#7BCEC8'}}>
                                  {/* This box is just for the date number */}
                                  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <PickersDay {...DayComponentProps} sx={{display: 'flex', alignContent: 'flex-start'}}/>
                                  </Box>

                                  {/* CONDITIONAL RENDERING FOR EMPLOYEE EVEN/ODD WEEKS */}
                                  {/* is the day within the current month and is this week even(2)? */}
                                  {!DayComponentProps.outsideCurrentMonth?
                                    <>
                                      {weekInYear % 2 !== 0  ? // odd week (week1)
                                        <Box sx={{display:'flex', flexDirection: 'row', flexGrow: '7', justifyContent: 'center', alignContent: 'flex-start', flexWrap: 'wrap'}}>
                                        {oddEmpSchedules && oddEmpSchedules.map((employee, index) => {
                                          // if it's a regularly scheduled day and there is an add request, render the employee
                                          if (employee[day.$W]){
                                            // check to see if there are any changes for this employee on this day
                                            const empChange = changes.filter(change=> {
                                              return employee.emp_id === change.emp_id && change.date_to_change === thisDayString
                                            })

                                            
                                            // if there are changes for this emp on this day
                                            if (empChange.length > 0){
                                              if(empChange[0].is_scheduled){
                                                return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: avatarColors[index], height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                              }
                                              else{
                                                return null
                                              }
                                            }
                                            //  no changes for this employee and is a regularly scheduled day
                                            else{
                                              let bgColor = avatarColors[index];
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            
                                          }// NOT a regularly scheduled day=> check for changes.
                                          if (!employee[day.$W]){
                                            // check to see if there are any changes for this employee on this day
                                            const empChange = changes.filter(change=> {
                                              return employee.emp_id === change.emp_id && change.date_to_change === thisDayString
                                            })
                                            // if there are changes for this emp on this day
                                            if (empChange.length > 0){
                                              if(empChange[0].is_scheduled){
                                                let bgColor = avatarColors[index];
                                                return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
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
                                        {evenEmpSchedules && evenEmpSchedules.map((employee, index) => {
                                          // if it's a regularly scheduled day and there is an add request, render the employee
                                          if (employee[day.$W]){
                                            // check to see if there are any changes for this employee on this day
                                            // console.log(thisDayString);
                                            const empChange = changes.filter(change=> {
                                              return employee.emp_id === change.emp_id && change.date_to_change === thisDayString
                                            })

                                            // if there are changes for this emp on this day
                                            if (empChange.length > 0){
                                              let bgColor = avatarColors[index];
                                              if(empChange[0].is_scheduled){
                                                return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                              }
                                              else{
                                                return null
                                              }
                                            }
                                            //  no changes for this employee and is a regularly scheduled day
                                            else{
                                              let bgColor = avatarColors[index];
                                              return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
                                            }
                                            
                                          }// NOT a regularly scheduled day=> check for changes.
                                          if (!employee[day.$W]){
                                            // check to see if there are any changes for this employee on this day
                                            const empChange = changes.filter(change=> {
                                              return employee.emp_id === change.emp_id && change.date_to_change === thisDayString
                                            })
                                            // if there are changes for this emp on this day
                                            if (empChange.length > 0){
                                              
                                              // console.log('there is a change on', thisDayString)
                                              if(empChange[0].is_scheduled){
                                                let bgColor = avatarColors[index];
                                                return <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: bgColor, height: '2.25vw' , width: '2.25vw', fontSize: 10, mx: .25, mb: .5, alignSelf:'flex-start' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>
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
        </Box> {/* End of Calendar */}
        <Box sx={{display: 'flex', flexDirection: 'column', width: '30%', height: '100%',  alignItems: 'center', justifyContent: 'center', gap: 1, border: '1px solid #acaaa8', borderRadius: 1, overflow: 'scroll'}}>
          {/* cards here */}
              {allEmployees.map( (employee, index)=> (
                <Card elevation={2} key={employee.id} sx={{display: 'flex', flexDirection: 'row', height: '400px !important', width: '25vw', justifyContent: 'center'}}>
                  <CardActionArea component={Button} onClick={()=> handleClick(employee)} >
                    <CardContent sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 6, gap: 3}}>

                          <Avatar key={employee.emp_id} sx={{ display: 'flex', bgcolor: avatarColors[index],  height: '2.25vw' , width: '2.25vw', fontSize: 10, mr: 1, alignSelf: 'center' }}>{employee.first_name[0]}{employee.last_name[0]}</Avatar>

                          <Typography sx={{display: 'flex', alignSelf: 'center'}}>
                            {employee.first_name} {employee.last_name}
                          </Typography>

                    </CardContent>
                  </CardActionArea>
                  
                </Card>
              ))}
        </Box>
      </Box>
    </Grid>
    <EmployeeModal/>
    </>
  )      
}

export default EmployeeSchedule;