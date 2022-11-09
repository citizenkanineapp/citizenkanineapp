import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box, Button, TextField, Typography, Grid, Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EmployeeForm(){
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
              <TextField value="134543" helperText="Employee ID"  size="small"/> 
              <TextField value="dollywood_baby@gmail.com" helperText="Email"  size="small"/>
              <TextField value="(666)-666-6666" helperText="Phone"  size="small"/>
              <TextField value="1234 Jolene Ave." helperText="Address"  size="small"/>
          </Grid> {/* value is what you see in the field, read only*/}

          <Grid sx={{ bgcolor: "lightBlue", height: "35%", mx: 5 }}>
              <Typography>BI-WEEKLY VIEW OF SECTION</Typography>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "5%", mx: 5, mt: 3 }}>
              <Box sx={{ width:"24%", display:"flex", justifyContent:"space-between" }}>
                <Button variant="outlined" color="info"
                    onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})}>Cancel</Button> 
                <Button variant="contained"
                    onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})}>Delete</Button> 
              </Box>
            <Button 
                variant="contained"        
                color="secondary"
                onClick={() => dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails'})}>Save</Button> 
          </Box>
      </Grid>
    );
}

export default EmployeeForm;