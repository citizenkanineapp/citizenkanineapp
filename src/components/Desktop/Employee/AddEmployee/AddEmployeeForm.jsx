import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea} from "@mui/material";

function AddEmployee(){
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({first_name:'', last_name:'', phone: '', street:'', city:'', zip: '', email: ''})

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [week1, setWeek1]= useState({1: false, 2: false, 3: false, 4: false, 5: false});

  const [week2, setWeek2]= useState({1: false, 2: false, 3: false, 4: false, 5: false});

  return (
    <Grid className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', pr: 2, justifyContent: 'center', ml: 1, mt: 3, width: '65vw' }}>

          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%"}}>
              <TextField 
              value={employee.first_name} helperText="First Name"  size="small"
              onChange={ e => setEmployee({...employee, first_name: e.target.value})
                }
              />
              <TextField 
              value={employee.last_name} helperText="Last Name"  size="small" 
              onChange={ e => setEmployee({...employee, last_name: e.target.value})
                }
              />
              <TextField
              value={employee.phone} helperText="Phone"  size="small" 
              onChange={ e => setEmployee({...employee, phone: e.target.value})
                }
              />
          </Grid> 

          <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%"}}>
              <TextField
              value={employee.street} helperText="Street"  size="small"
              onChange={ e => setEmployee({...employee, street: e.target.value})
                }
              />
              <TextField
              value={employee.city} helperText="City"  size="small" 
              onChange={ e => setEmployee({...employee, city: e.target.value})
                }
              />
              <TextField
              inputProps={{inputMode: 'number', pattern: '[0-9] {0-9}' }}
              value={employee.zip} helperText="Zip"  size="small" 
              onChange={ e => setEmployee({...employee, zip: e.target.value})
                }
              />
          </Grid>

          <Grid sx={{display: 'grid', gap: 1, height: "20%", width: 273.09}}>
            <TextField 
              value={employee.email} helperText="Email"  size="small"
              onChange={ e => setEmployee({...employee, email: e.target.value})
                }
              />
          </Grid>
          

          {/* Schedule day selectors */}
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
              <Typography variant="h6">Week 1:</Typography>
            </Grid>

            {/* Mapping through days of the week array to render buttons for week1 */}
            {daysOfWeek.map((day, index) => (
              <Grid key={index + 1} item xs={2}>
              <Card>
                <CardActionArea component={Button}
                  // onClick={()=>{
                    
                  //   if (!week1[index+1]){
                  //     dispatch({ 
                  //       type:'UPDATE_EMP_SCHEDULE1',
                  //       payload: {day: index+1, change: true}
                      
                  //   })
                  //   }
                    // else {
                    //   dispatch({ 
                    //     type:'UPDATE_EMP_SCHEDULE1',
                    //     payload: {day: index+1, change: false}
                      
                    // })
                    // }}}
                  >
                      
                  <CardContent sx={{ display:'flex', justifyContent: 'center', backgroundColor: week1[index+1]? '#7BCEC8' : 'none'}}>
                      <Typography variant="h7"sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
          </Grid> 

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 1}} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
              <Typography variant="h6">Week 2:</Typography>
            </Grid>

            {/* Mapping through days of the week array to render buttons for week2 */}
            {daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2}>
              <Card>
                <CardActionArea component={Button}
                  onClick={()=>{
                    if (!week2[index+1]){
                      dispatch({ 
                        type:'UPDATE_EMP_SCHEDULE2',
                        payload: {day: index+1, change: true}
                      
                    })
                    }
                    else {
                      dispatch({ 
                        type:'UPDATE_EMP_SCHEDULE2',
                        payload: {day: index+1, change: false}
                      
                    })
                    }}}
                  >
                  <CardContent sx={{ display:'flex', justifyContent: 'center',    backgroundColor: week2[index+1]? '#7BCEC8' : 'none' }}>
                      <Typography variant="h7" sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
          </Grid> 

          
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "5%", mt: 3 }}>
              
                {/* DELETE BUTTON */}
                <Button variant="contained" sx={{ml: 2}}
                    onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})}>Delete</Button> 
              
            {/* CANCEL BUTTON */}  
            <Box sx={{ width:"24%", display:"flex", justifyContent:"space-between" }}>
              <Button variant="outlined" color="info"
                      onClick={() => {
                        dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})
                        // Need to reset these reducers in case the user hits cancel and then edit again.
                        dispatch({ type: 'SET_EDIT_EMP_DETAILS', payload: selectedEmployee})
                        dispatch({ type: 'SET_EDIT_EMP_SCHEDULE1', payload: selectedEmpSchedule[0]})
                        dispatch({ type: 'SET_EDIT_EMP_SCHEDULE2', payload: selectedEmpSchedule[1]})
                      }}>Cancel</Button> 
              {/* SAVE BUTTON */}
              <Button 
                  variant="contained"        
                  color="secondary"
                  onClick={() => {
                    // send updated form data to server to update the database:
                    dispatch({
                      type: 'SAGA_UPDATE_EMP_DETAILS',
                      payload: employee
                    })
                    // sends updated schedule data to server to update the database:
                    dispatch({
                      type: 'SAGA_UPDATE_EMP_SCHEDULE',
                      payload: [week1, week2]
                    })
                    // This updates the selectedEmpSchedule reducer so that the details page will render the updated employee schedule
                    dispatch({
                      type: 'SET_EMPLOYEE_SCHEDULE',
                      payload: [week1, week2]
                    })
                    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})
                  }}>Save</Button> 
                </Box>
          </Box>
      </Grid>
    );
};

export default AddEmployee;