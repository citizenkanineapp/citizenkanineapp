import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';

//MUI
import { Button, TextField, Typography, Grid, Avatar, Card, CardContent } from "@mui/material";

function EmployeeDetails() {
  const dispatch = useDispatch();
  const employee = useSelector(store=> store.employeesReducer.selectedEmployee);
  console.log(employee);
  
  const initials = employee.first_name[0]+employee.last_name[0];

  return (
      <Grid className="container" height="100%">
        {/*----------------------- HEADER -----------------------*/}
          <Grid sx={{display: 'flex', flexDirection: 'row', height: "10%", mx: 6, mt: 4, mb: 8}}>  
            <Avatar sx={{ bgcolor: "primary.main", height: 115 , width: 115 }}>{initials}</Avatar> {/* initials need to be conditionally rendered */}
            <Typography variant="h3" sx={{ pt: 3, ml: 5}}>{employee.first_name} {employee.last_name}</Typography>
          </Grid> 

          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '0.5fr 1fr', gap: 1, m: 6, height: "20%",}}>
              
              <TextField 
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.email} helperText="Email"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value={employee.phone} helperText="Phone"  size="small" InputProps={{readOnly: true}}/>
              <TextField
              sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
              value="1234 Jolene Ave." helperText="Address"  size="small" InputProps={{readOnly: true}}/>
          </Grid> {/* value is what you see in the field, read only*/}

      <Grid sx={{ bgcolor: "lightBlue", height: "35%", mx: 5 }}>
        <Typography>BI-WEEKLY VIEW OF SECTION</Typography>
      </Grid>

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