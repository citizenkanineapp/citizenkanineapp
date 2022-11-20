import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, Grid, CardContent } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';




function AddClient(){
  const dispatch = useDispatch();
  const clientToAdd = useSelector(store => store.clientReducer);

  //CLIENT SCHEDULE
  const clientSchedule = useSelector(store => store.clientScheduleReducer.clientSchedule);
  const monday = clientSchedule[1]; 
  const tuesday = clientSchedule[2];
  const wednesday = clientSchedule[3];
  const thursday = clientSchedule[4];
  const friday = clientSchedule[5];


  const handleClick = (day) => {
    setErrorSchedule(false);
    // toggle
    switch (day){
      case "Monday":
        dispatch({type: 'SET_MONDAY', payload: !monday })
        break;
      case "Tuesday":
        dispatch({type: 'SET_TUESDAY', payload: !tuesday })
        break;
      case "Wednesday":
        dispatch({type: 'SET_WEDNESDAY', payload: !wednesday })
        break;
      case "Thursday":
        dispatch({type: 'SET_THURSDAY', payload: !thursday })
        break;
      case "Friday":
        dispatch({type: 'SET_FRIDAY', payload: !friday })
        break;
    } 
  };

  //FORM VALIDATION
  const [errorFirst, setErrorFirst] = useState(false);
  const [errorLast, setErrorLast] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorStreet, setErrorStreet] = useState(false);
  const [errorZip, setErrorZip] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorRoute, setErrorRoute] = useState(false);
  const [errorSchedule, setErrorSchedule] = useState(false);

  const checkInputs = () => {
    let errorFree;
    setErrorFirst(false)
    setErrorLast(false)
    setErrorPhone(false)
    setErrorStreet(false)
    setErrorCity(false)
    setErrorZip(false)
    setErrorEmail(false)
    setErrorRoute(false)

    if(clientToAdd.first_name === undefined || clientToAdd.first_name === ''){
      setErrorFirst(true)
      errorFree = false
    } 
    if(clientToAdd.last_name === undefined || clientToAdd.last_name === ''){
      setErrorLast(true)
      errorFree = false
    }
    if(clientToAdd.phone === undefined || clientToAdd.phone === ''){
      setErrorPhone(true)
      errorFree = false
    }
    if(clientToAdd.street === undefined || clientToAdd.street === ''){
      setErrorStreet(true)
      errorFree = false
    }
    if(clientToAdd.city === undefined || clientToAdd.city === ''){
      setErrorCity(true)
      errorFree = false
    }
    if(clientToAdd.zip === undefined || clientToAdd.zip === ''){
      setErrorZip(true)
      errorFree = false
    }
    if(clientToAdd.email === undefined || clientToAdd.email === ''){
      setErrorEmail(true)
      errorFree = false
    }
    if(clientToAdd.route_id === undefined || clientToAdd.route_id === ''){
      setErrorRoute(true)
      errorFree = false
    }
    if(clientToAdd.phone.length > 13){
      setErrorPhone(true)
      errorFree = false
    } 
    if (!monday && !tuesday && !wednesday && !thursday && !friday){
      setErrorSchedule(true)
      errorFree = false
    }
    else if(   errorFirst === false && 
          errorLast === false &&
          errorPhone === false &&
          errorStreet === false &&
          errorCity === false &&
          errorZip === false &&
          errorEmail === false &&
          errorRoute === false &&
          errorSchedule === false)  
   {
        dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})
        dispatch({type: 'ADD_SCHEDULE', payload: clientSchedule})
    }
    console.log(errorFree);
  }


  const back = event => {
    dispatch({type: 'CLEAR_CLIENT'});
    dispatch({ type: 'SET_MODAL_STATUS' })
    dispatch({type: 'CLEAR_SCHEDULE'})
  }

  const presentationDetails = event => {
    dispatch({type: 'ADD_FIRST_NAME', payload: 'Sam'})
    dispatch({type: 'ADD_LAST_NAME', payload: 'Freeman'})
    dispatch({type: 'ADD_PHONE', payload: '(925)330-9462'})
    dispatch({type: 'ADD_EMAIL', payload: 'citizenkanineapp@gmail.com'})
    dispatch({type: 'ADD_STREET', payload: '4249 Bryant Ave S'})
    dispatch({type: 'ADD_CITY', payload: 'Minneapolis'})
    dispatch({type: 'ADD_ZIPCODE', payload: '55409'})
    dispatch({type: 'ADD_NOTES', payload: 'Back door entry'})
    dispatch({type: 'ADD_VET_NAME', payload: 'Lake Harriet Veterinary'})
    dispatch({type: 'ADD_VET_PHONE', payload: '(612)822-1545'})
    dispatch({type: 'ADD_ROUTE', payload: 2})
  }

  return (
 
      <Box sx={{ height: '100%', m:2, mt: 1, p:2, display: 'flex', flexDirection: 'column' }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 5}}>  
              <Typography variant="h3" onClick={presentationDetails} >Add Client</Typography>
            </Grid> 
        
            {/*-------------------- TEXT FIELDS --------------------*/}
             <Grid sx={{width: '100%', display: 'flex', flexDirecion: 'row', gap: 1}}>
                {clientToAdd &&
                <TextField 
                  required
                  fullWidth
                  value={clientToAdd.first_name} 
                  onChange={(event) => dispatch({type: 'ADD_FIRST_NAME', payload: event.target.value})}
                  error={errorFirst}
                  helperText={errorFirst ? errorFirst && "* First Name" : "* First Name"}
                  // helperText="* First Name"  
                  size="small" />
                }
                <TextField 
                  fullWidth
                  value={clientToAdd.last_name} 
                  onChange={(event) => dispatch({type: 'ADD_LAST_NAME', payload: event.target.value})}
                  // helperText="* Last Name"  
                  error={errorLast}
                  helperText={errorLast ? errorLast && "* Last Name" : "* Last Name"}
                  size="small" /> 
              </Grid>
              <Grid sx={{display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: 1}}>
                  <TextField 
                    value={clientToAdd.street} 
                    onChange={(event) => dispatch({type: 'ADD_STREET', payload: event.target.value})}
                    error={errorStreet}
                    helperText={errorStreet ? errorStreet && "* Street" : "* Street"}
                    size="small" />
                  <TextField 
                    value={clientToAdd.city} 
                    onChange={(event) => dispatch({type: 'ADD_CITY', payload: event.target.value})}
                    error={errorCity}
                    helperText={errorCity ? errorCity && "* City" : "* City"} 
                    size="small" />
                  <TextField 
                    value={clientToAdd.zip} 
                    onChange={(event) => dispatch({type: 'ADD_ZIPCODE', payload: event.target.value})}
                    error={errorZip}
                    helperText={errorZip ? errorZip && "* Zip Code" : "* Zip Code"}
                    size="small" />
                  <TextField 
                      value={clientToAdd.notes} 
                      onChange={(event) => dispatch({type: 'ADD_NOTES', payload: event.target.value})}
                      helperText="Entry Protocol"  
                      size="small"/>    
                  <TextField 
                    value={clientToAdd.phone} 
                    onChange={(event) => dispatch({type: 'ADD_PHONE', payload: event.target.value})}
                    error={errorPhone}
                    helperText={errorPhone ? errorPhone && "* Phone (xxx)—xxx—xxxx" : "* Phone"}  
                    size="small" />
                  <TextField 
                    value={clientToAdd.email} 
                    onChange={(event) => dispatch({type: 'ADD_EMAIL', payload: event.target.value})}
                    error={errorEmail}
                    helperText={errorEmail ? errorEmail && "* Email" : "* Email"}
                    size="small" />
                  <TextField 
                    value={clientToAdd.vet_name || ''} 
                    onChange={(event) => dispatch({type: 'ADD_VET_NAME', payload: event.target.value})}
                    helperText="Vet"  
                    size="small" />
                  <TextField 
                    value={clientToAdd.vet_phone || ''} 
                    onChange={(event) => dispatch({type: 'ADD_VET_PHONE', payload: event.target.value})}
                    helperText="Vet Phone"  
                    size="small" />
              <FormControl>
                  <Select
                    labelId="route"
                    size="small"
                    id="route"
                    error={errorRoute}
                    value={clientToAdd.route_id || ''}
                    onChange={(event) => {
                      
                      dispatch({type: 'ADD_ROUTE', payload: event.target.value})
          
                    }}
                  >
                    <MenuItem value={1}>Tangletown</MenuItem>
                    <MenuItem value={2}>Emerson</MenuItem>
                    <MenuItem value={3}>Far</MenuItem>
                    <MenuItem value={4}>Misfits</MenuItem>
                    <MenuItem value={5}>Unassigned</MenuItem>
                  </Select>
                  <FormHelperText>* Default Route</FormHelperText>
                </FormControl>      
            </Grid> 



    {/* <div> */}
      
      <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 1 }} >
        <Grid item xs={12} sx={{display: 'flex', flexDirecion: 'row', justifyContent: 'center', pt: 3}}>
         <Typography variant="h5">Weekly Schedule</Typography>
        </Grid>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', py: 3}}>
        <Grid item xs={2}>
          <Card elevation={2} onClick={() => handleClick('Monday')}
          sx={{ backgroundColor: clientSchedule[1] ? '#4a5061' : null, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: errorSchedule === true && '1px solid #e0923f'}}>
             <Typography sx={{color: clientSchedule[1] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>
                MON
              </Typography>
          </Card>
        </Grid>
       
      <Grid item xs={2}>
          <Card elevation={2} onClick={() => handleClick('Tuesday')}
          sx={{ backgroundColor: clientSchedule[2] ? '#4a5061' : null, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: errorSchedule === true && '1px solid #e0923f'}}>
              <Typography sx={{color: clientSchedule[2] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>
                TUES
              </Typography>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card elevation={2} onClick={() => handleClick('Wednesday')}
          sx={{ backgroundColor: clientSchedule[3] ? '#4a5061' : null, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: errorSchedule === true && '1px solid #e0923f'}}>
            <Typography sx={{color: clientSchedule[3] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>
               WEDS
              </Typography>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card elevation={2} onClick={() => handleClick('Thursday')}
          sx={{ backgroundColor: clientSchedule[4] ? '#4a5061' : null, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: errorSchedule === true && '1px solid #e0923f'}}>
            <Typography sx={{color: clientSchedule[4] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>
                THURS
            </Typography>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card elevation={2} onClick={() => handleClick('Friday')}
          sx={{ backgroundColor: clientSchedule[5] ? '#4a5061' : null, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: errorSchedule === true && '1px solid #e0923f'}}>
           <Typography sx={{color: clientSchedule[5] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>
              FRI
            </Typography>
          </Card>
        </Grid>
        </Grid>
      </Grid>          

          {/*-------------------- BUTTONS --------------------*/}
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={back}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="secondary" onClick={checkInputs}>Add Dogs</Button> 
        </Box>
      </Box>
    // </div>
      
    );
}

export default AddClient;