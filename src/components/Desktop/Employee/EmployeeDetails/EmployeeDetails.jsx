import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea } from "@mui/material";

function EmployeeDetails() {
  const dispatch = useDispatch();
  const employee = useSelector(store=> store.employeesReducer.selectedEmployee);
  // console.log(employee);
  
  const initials = employee.first_name[0]+employee.last_name[0];

  // This object 
  const [week1, setWeek1] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
  const [week2, setWeek2] = useState({1:false, 2:false, 3:false, 4:false, 5:false});


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const [daySelected, setDaySelected] = useState(false);

  return (
      <Grid className="container"  sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '65vw', pr: 2, height: '80vh', justifyContent: 'center' }}>
        {/*----------------------- HEADER -----------------------*/}
          <Grid sx={{display: 'flex', flexDirection: 'row', height: "10%", mt: 2, mb: 8, ml: 4}}>  
            <Avatar sx={{ bgcolor: "primary.main", height: 115 , width: 115 }}>{initials}</Avatar> {/* initials need to be conditionally rendered */}
            <Typography variant="h3" sx={{ pt: 3, ml: 5}}>{employee.first_name} {employee.last_name}</Typography>
          </Grid> 

          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '0.5fr 1fr', gap: 1, height: "20%", mb: 7, ml: 4 }}>
              
              <TextField 
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.email} helperText="Email"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.phone} helperText="Phone"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value="1234 Jolene Ave." helperText="Address"  size="small" InputProps={{readOnly: true}}/>
          </Grid> 

          {/* Schedule day selectors */}
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
              <Typography variant="h6">Week 1:</Typography>
            </Grid>
            {/* Mapping through days of the week array to render buttons for week1 */}
            {daysOfWeek.map((day, index) => (
              <Grid key={index + 1} item xs={2}>
              <Card>
                <CardActionArea component={Button}
                  onClick={()=>{
                    if (!week1[index+1]){
                      setWeek1({...week1, [index+1]: true});
                    }
                    else {
                      setWeek1({...week1, [index+1]: false});
                    }}}>
                      
                  <CardContent sx={{ display:'flex', justifyContent: 'center', backgroundColor: week1[index+1]? '#7BCEC8' : null}}t>
                      <Typography variant="h7"sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
          </Grid> 

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 1}} >
            <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
              <Typography variant="h6">Week 2:</Typography>
            </Grid>
            {/* Mapping through days of the week array to render buttons for week2 */}
            {daysOfWeek.map((day, index) => (
            <Grid key={index + 1} item xs={2}>
              <Card>
                <CardActionArea component={Button}
                  onClick={()=>{
                    if (!week2[index+1]){
                      setWeek2({...week2, [index+1]: true});
                    }
                    else {
                      setWeek2({...week2, [index+1]: false});
                    }}}>
                  <CardContent sx={{ display:'flex', justifyContent: 'center',    backgroundColor: week2[index+1]? '#7BCEC8' : null }}>
                      <Typography variant="h7" sx={{textTransform: 'capitalize'}}>{day}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            </Grid>
            ))}
          </Grid> 


        {/* <Grid item xs={2}>
          <Card>
            <CardActionArea component={Button}>
              <CardContent>
                  <Typography>Monday</Typography>
              </CardContent>
            </CardActionArea>
          </Card> 
        </Grid>

        <Grid item xs={2} >
        <Card>
            <CardActionArea component={Button} value={1} 
              onClick={()=>{
                if (!week1[1]){
                  setWeek1({...week1, 1: true});
                  console.log(week1)
                }
                else {
                  setWeek1({...week1, 1: false});
                }
              }}>
              <CardContent>
                  <Typography>Tuesday</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2}>
          <Card>
            <CardActionArea component={Button} value={1} >
              <CardContent>
                  <Typography>Wednesday</Typography>
              </CardContent>
            </CardActionArea>
          </Card> 
        </Grid>

        <Grid item xs={2} >
        <Card>
            <CardActionArea component={Button} value={1} >
              <CardContent>
                  <Typography>Thursday</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={2} >
        <Card>
            <CardActionArea component={Button} value={1} >
              <CardContent>
                  <Typography>Friday</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid> */}
      



      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', height: "5%", mx: 5, mt: 3 }}>
        <Button
          variant="outlined" color="info"
          onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>
          Back
        </Button>  {/*goes back to Employee list*/}
        <Button
          variant="contained" color="success"
          onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EditEmployeeForm' })}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
}

export default EmployeeDetails;