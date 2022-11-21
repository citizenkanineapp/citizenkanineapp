import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch, Box, Tooltip } from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function EmployeeDetails() {
  const dispatch = useDispatch();
  const employee = useSelector(store=> store.selectedEmployeeReducer.selectedEmployee);
  const employeeSchedule = useSelector(store=> store.selectedEmployeeReducer.selectedEmpSchedule);
  // console.log(employeeSchedule);
  const week1 = employeeSchedule[0];
  const week2 = employeeSchedule[1];


  const daysOfWeek = ['MON', 'TUES', 'WEDS', 'THURS', 'FRI'];


  return (
      <Grid className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '75vw', height: '100%', justifyContent: 'center', gap: 2}}>
        {/*----------------------- HEADER -----------------------*/}
          <Grid sx={{display: 'grid', flexDirection: 'row', height: "15%", gridTemplateColumns: '1fr 0.5fr', justifyContent: 'center', mt: 3, mb: 5, mx: 10}}>  
            {/* <Avatar sx={{ bgcolor: '#F5A572', height: 115 , width: 115 }}>{initials}</Avatar> */}
            <Typography variant="h3" sx={{ pt: 3, ml: 1}}>{employee.first_name} {employee.last_name}</Typography>
            <Box sx={{display: 'flex', justifyContent: 'right', alignItems: 'center', mt: 2}}>
              {employee.admin && 
                  <Tooltip title="Admin" placement="top-start">            
                    <SupervisorAccountIcon style={{ fontSize: 36, color:  '#e0603f' }}/>   
                  </Tooltip>
              }
            </Box>
          </Grid> 
          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "60%", mx: 10, gap: 2}}>
              <TextField focused={false}
              // sx={{ fieldset: { borderColor: 'transparent', border: '0', borderBottom: '1px solid black' } }}
              value={employee.street} helperText="Street"  size="small" InputProps={{readOnly: true}}/>
              <TextField focused={false}
              // sx={{ fieldset: { borderColor: 'transparent', border: '0', borderBottom: '1px solid black' } }}
              value={employee.city} helperText="City"  size="small" InputProps={{readOnly: true}}/>
              <TextField focused={false}
              // sx={{ fieldset: { borderColor: 'transparent', border: '0', borderBottom: '1px solid black' } }}
              value={employee.zip} helperText="Zip"  size="small" InputProps={{readOnly: true}}/>
              <TextField focused={false} 
              // sx={{ fieldset: { borderColor: 'transparent', border: '0', borderBottom: '1px solid black' } }}
              value={employee.email} helperText="Email"  size="small" InputProps={{readOnly: true}}/>
              <TextField focused={false}
              // sx={{ fieldset: { borderColor: 'transparent', border: '0', borderBottom: '1px solid black' } }}
              value={employee.phone} helperText="Phone"  size="small" InputProps={{readOnly: true}}/>
          </Grid> 
          

          {/*-------------------- SCHEDULE --------------------*/}
          <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="b1" sx={{fontWeight: 800}}>Week 1:</Typography>
          </Grid>

          {/* Schedule day selectors */}
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            
            {/* Mapping through days of the week array to render buttons for week1 */}
            {week1 && daysOfWeek.map((day, index) => (
              <Grid key={index + 1} item xs={2} >
                <Card elevation={2} xs={{height: '30vh'}}>
                  <CardActionArea component={Button}
                    disabled={true}
                    >
                    <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: week1[index+1]? '#4a5061' : 'none', height: '3vh', alignItems: 'center' }}>
                        <Typography sx={{color: week1[index+1] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>{day}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card> 
              </Grid>
            ))}
          </Grid> 

          <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
              <Typography variant="b1" sx={{fontWeight: 800}}>Week 2:</Typography>
          </Grid>

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 5}} >
            {/* Mapping through days of the week array to render buttons for week2 */}
            {week2 && daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2} >
              <Card elevation={2} xs={{height: '30vh'}}>
                <CardActionArea component={Button}
                  disabled={true}
                  >
                  <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: week2[index+1]? '#4a5061' : 'none', height: '3vh', alignItems: 'center' }}>
                      <Typography sx={{color: week2[index+1] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
          </Grid> 


      <Grid sx={{ display: 'flex', justifyContent: 'space-between', height: "10%", mb: 1, mx: 3}}>
        <Button
          variant="outlined" color="info"
          onClick={() => {
            dispatch({ type: 'SET_MODAL_STATUS' })
          }}>
          Back
        </Button>  {/*goes back to Employee list*/}
        <Button
          variant="contained" color="secondary"
          onClick={() => {
            dispatch({ 
              type: 'SET_EDIT_EMP_DETAILS',
              payload: employee
            })
            dispatch({
              type: 'SET_EDIT_EMP_SCHEDULE1',
              payload: week1
            })
            dispatch({
              type: 'SET_EDIT_EMP_SCHEDULE2',
              payload: week2
            })
            dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EditEmployeeForm' })
          }}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmployeeDetails;