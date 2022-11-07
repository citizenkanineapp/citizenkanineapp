import { useSelector, useDispatch } from "react-redux";

//MUI
import { Button, TextField, Typography, Grid, Avatar } from "@mui/material";

function EmployeeDetails(){
  const dispatch = useDispatch();

  return (
      <Grid className="container" height="100%">
        {/*----------------------- HEADER -----------------------*/}
          <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', height: "10%", mx: 6, mt: 6 }}>  
            <Typography variant="h3" sx={{ pt: 3 }}>Dolly Parton</Typography>
            <Avatar sx={{ bgcolor: "primary.main", height: "150%", width: "15%" }}>DP</Avatar> {/* initials need to be conditionally rendered */}
          </Grid> {/* display only */}

          {/*-------------------- TEXT FIELDS --------------------*/}
          <Grid sx={{display: 'grid', gridTemplateColumns: '0.5fr 1fr', gap: 1, m: 6, height: "20%",}}>
              <TextField value="134543" helperText="Employee ID"  size="small" InputProps={{readOnly: true}}/> 
              <TextField value="dollywood_baby@gmail.com" helperText="Email"  size="small" InputProps={{readOnly: true}}/>
              <TextField value="(666)-666-6666" helperText="Phone"  size="small" InputProps={{readOnly: true}}/>
              <TextField value="1234 Jolene Ave." helperText="Address"  size="small" InputProps={{readOnly: true}}/>
          </Grid> {/* value is what you see in the field, read only*/}

          <Grid sx={{ bgcolor: "lightBlue", height: "35%", mx: 5 }}>
              <Typography>BI-WEEKLY VIEW OF SECTION</Typography>
          </Grid>

          <Grid sx={{mt: 2, display: 'flex', justifyContent: 'space-between', height: "5%", mx: 5, mt: 3 }}>
            <Button variant="outlined" color="info"
                onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to Employee list*/}
            <Button variant="contained" color="success"
                onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EditEmployeeForm'})}>Edit</Button> 
          </Grid>
      </Grid>
    );
}

export default EmployeeDetails;