import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch, Box } from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function EmployeeDetails() {
  const dispatch = useDispatch();
  const employee = useSelector(store=> store.selectedEmployeeReducer.selectedEmployee);
  const employeeSchedule = useSelector(store=> store.selectedEmployeeReducer.selectedEmpSchedule);
  console.log(employeeSchedule);
  const week1 = employeeSchedule[0];
  const week2 = employeeSchedule[1];


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


  return (
      <Grid className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '75vw', height: '80vh', justifyContent: 'center'}}>
        {/*----------------------- HEADER -----------------------*/}
          <Grid sx={{display: 'grid', flexDirection: 'row', height: "10%", mt: 2, mb: 8, gridTemplateColumns: '1fr 0.5fr', justifyContent: 'center' }}>  
            {/* <Avatar sx={{ bgcolor: '#F5A572', height: 115 , width: 115 }}>{initials}</Avatar> */}
            <Typography variant="h3" sx={{ pt: 3, ml: 1}}>{employee.first_name} {employee.last_name}</Typography>
            <Box sx={{display: 'flex', justifyContent: 'right', alignItems: 'center', mt: 2}}>
              <Switch
                disabled
                checked={employee.admin}
              />             
              <SupervisorAccountIcon style={{ fontSize: 36, color:  '#e0603f' }}/>   
            </Box>
          </Grid> 
          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%"}}>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.street} helperText="Street"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.city} helperText="City"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.zip} helperText="Zip"  size="small" InputProps={{readOnly: true}}/>
          </Grid>
          <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr', gap: 1, height: "20%"}}>
              <TextField 
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.email} helperText="Email"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.phone} helperText="Phone"  size="small" InputProps={{readOnly: true}}/>
          </Grid> 
          
          {/* Schedule day selectors */}
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
              <Typography variant="h6">Week 1:</Typography>
            </Grid>

            {/* Mapping through days of the week array to render buttons for week1 */}
            {week1 && daysOfWeek.map((day, index) => (
              <Grid key={index + 1} item xs={2}>
              <Card >
                  <CardContent sx={{ display:'flex', justifyContent: 'center', backgroundColor: week1[index+1]? '#7BCEC8' : null}}>
                      <Typography variant="h7"sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
              </Card> 
            </Grid>
            ))}
          </Grid> 

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 1}} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
              <Typography variant="h6">Week 2:</Typography>
            </Grid>

            {/* Mapping through days of the week array to render buttons for week2 */}
            {week2 && daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2}>
              <Card>
                  <CardContent sx={{ display:'flex', justifyContent: 'center', backgroundColor: week2[index+1]? '#7BCEC8' : 'none' }}>
                      <Typography variant="h7" sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
              </Card> 
            </Grid>
            ))}
          </Grid> 


      <Grid sx={{ display: 'flex', justifyContent: 'space-between', height: "5%", mx: 5, mt: 3 }}>
        <Button
          variant="outlined" color="info"
          onClick={() => {
            dispatch({ type: 'SET_MODAL_STATUS' })
          }}>
          Back
        </Button>  {/*goes back to Employee list*/}
        <Button
          variant="contained" color="success"
          onClick={() => {
            dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EditEmployeeForm' })
            dispatch({ 
              type: 'SET_EDIT_EMP_DETAILS',
              payload: employee
            })
          }}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmployeeDetails;