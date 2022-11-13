import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea} from "@mui/material";

function AddEmployee(){
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({first_name:'', last_name:'', phone: '', street:'', city:'', zip: '', email: ''})

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [week1, setWeek1]= useState({week: 1, 1: false, 2: false, 3: false, 4: false, 5: false});

  const [week2, setWeek2]= useState({week:2, 2: false, 2: false, 3: false, 4: false, 5: false});

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
                  onClick={()=>{
                    
                    if (!week1[index+1]){
                      setWeek1({...week1, [index+1]: true})
                    }
                    else {
                      setWeek1({...week1, [index+1]: false})
                    }}}
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
                      setWeek2({...week2, [index+1]: true})
                    }
                    else {
                      setWeek2({...week2, [index+1]: false})
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
                <Button variant="contained" sx={{ml: 2}}>Delete</Button> 
            {/* CANCEL BUTTON */}  
              <Box sx={{ width:"24%", display:"flex", justifyContent:"space-between" }}>
                <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Cancel</Button>  {/*goes back to Employee list*/}
                {/* SAVE BUTTON */}
                <Button onClick={() => {
                  dispatch({
                    type: 'SAGA_ADD_EMPLOYEE',
                    payload: [employee, week1, week2]
                  })
                  dispatch({ type: 'SET_MODAL_STATUS'})
                  }}>Submit</Button> 
              </Box>
          </Box>
      </Grid>
    );
};

export default AddEmployee;