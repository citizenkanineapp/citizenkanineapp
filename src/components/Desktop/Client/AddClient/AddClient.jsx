import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton, CardContent } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';




function AddClient(){
  const dispatch = useDispatch();

  const clientToAdd = useSelector(store => store.clientReducer)
  const schedule = useSelector(store => store.clientScheduleReducer)
  const errors = useSelector(store => store.errors)

  // const [error, setError] = useState(false);
  // const [phoneError, setPhoneError] = useState(false)


  const [errorFirst, setErrorFirst] = useState(false);
  const [errorLast, setErrorLast] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorStreet, setErrorStreet] = useState(false)
  const [errorZip, setErrorZip] = useState(false)
  const [errorCity, setErrorCity] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorRoute, setErrorRoute] = useState(false)

  const clientSchedule = useSelector(store => store.clientScheduleReducer)


  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);


  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    switch (event){
      case "Monday":
        setMonday(current => !current);
        dispatch({type: 'SET_MONDAY', payload: !monday})
        break;
      case "Tuesday":
        setTuesday(current => !current);
        dispatch({type: 'SET_TUESDAY', payload: !tuesday})
        break;
      case "Wednesday":
        setWednesday(current => !current);
        dispatch({type: 'SET_WEDNESDAY', payload: !wednesday})
        break;
      case "Thursday":
        setThursday(current => !current);
        dispatch({type: 'SET_THURSDAY', payload: !thursday})
        break;
      case "Friday":
        setFriday(current => !current);
        dispatch({type: 'SET_FRIDAY', payload: !friday})
        break;
    } 
   
    // console.log(event)
   
  };

  const back = event => {
    dispatch({type: 'CLEAR_CLIENT'});
    dispatch({ type: 'SET_MODAL_STATUS' })
    dispatch({type: 'CLEAR_SCHEDULE'})
  }

  const checkInputs = (event) => {
    let errorFree = false;
    setErrorFirst(false)
    setErrorLast(false)
    setErrorPhone(false)
    setErrorStreet(false)
    setErrorCity(false)
    setErrorZip(false)
    setErrorEmail(false)
    setErrorRoute(false)

    //create error variable  let errorFree =false
    //each condition changes it to true
    //if no problem submit form
    //or show errors

    if(clientToAdd.first_name === undefined || clientToAdd.first_name === ''){
      setErrorFirst(true)
      errorFree = true
    } 
    if(clientToAdd.last_name === undefined || clientToAdd.last_name === ''){
      setErrorLast(true)
      errorFree = true
    }
    if(clientToAdd.phone === undefined || clientToAdd.phone === ''){
      setErrorPhone(true)
      errorFree = true
    }
    if(clientToAdd.street === undefined || clientToAdd.street === ''){
      setErrorStreet(true)
      errorFree = true
    }
    if(clientToAdd.city === undefined || clientToAdd.city === ''){
      setErrorCity(true)
      errorFree = true
    }
    if(clientToAdd.zip === undefined || clientToAdd.zip === ''){
      setErrorZip(true)
      errorFree = true
    }
    if(clientToAdd.email === undefined || clientToAdd.email === ''){
      setErrorEmail(true)
      errorFree = true
    }
    if(clientToAdd.route === undefined || clientToAdd.route === ''){
      setErrorRoute(true)
      errorFree = true
    }
      if(clientToAdd.phone.length > 13){
      setErrorPhone(true)
      errorFree = true
    } else if( errorFirst === false && 
          errorLast === false &&
          errorPhone === false &&
          errorStreet === false &&
          errorCity === false &&
          errorZip === false &&
          errorEmail === false &&
          errorRoute === false )  {
        
          errorFree = false
    } else  {
      dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})
      dispatch({type: 'ADD_SCHEDULE', payload: clientSchedule})
  }
}
  return (
 
      <Box sx={{m:2, p:2, display: 'flex', flexDirection: 'column' }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2}}>  
              <Typography variant="h3" >Add Client</Typography>
              {/* <IconButton disabled>
                <CalendarMonthIcon sx={{ fontSize: 45, color: 'rgb(163, 147, 142)' }}/> 
              </IconButton> */}
            </Grid> {/* display only */}
        

         
              {/*-------------------- TEXT FIELDS --------------------*/}
         
            <Grid sx={{display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: 1}}>
             
                {clientToAdd &&
                <TextField 
                  required
                  value={clientToAdd.first_name} 
                  onChange={(event) => dispatch({type: 'ADD_FIRST_NAME', payload: event.target.value})}
                  error={errorFirst}
                  helperText={errorFirst ? errorFirst && "* First Name" : "* First Name"}
                  // helperText="* First Name"  
                  size="small" />
                }
                <TextField 
                  value={clientToAdd.last_name} 
                  onChange={(event) => dispatch({type: 'ADD_LAST_NAME', payload: event.target.value})}
                  // helperText="* Last Name"  
                  error={errorLast}
                  helperText={errorLast ? errorLast && "* Last Name" : "* Last Name"}
                  size="small" /> 
                  <TextField 
                    value={clientToAdd.phone} 
                    onChange={(event) => dispatch({type: 'ADD_PHONE', payload: event.target.value})}
                    error={errorPhone}
                    helperText={errorPhone ? errorPhone && "* Phone (xxx)xxx-xxxx" : "* Phone"}  
                    size="small" />
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
                    value={clientToAdd.email} 
                    onChange={(event) => dispatch({type: 'ADD_EMAIL', payload: event.target.value})}
                    error={errorEmail}
                    helperText={errorEmail ? errorEmail && "* Email" : "* Email"}
                    size="small" />
                  {/* <TextField 
                    value={clientToAdd.notes} 
                    onChange={(event) => dispatch({type: 'ADD_NOTES', payload: event.target.value})}
                    helperText="Protocols"  
                    size="small" /> */}
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
                    // error={errorRoute}
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
                  <TextField 
                      value={clientToAdd.notes} 
                      onChange={(event) => dispatch({type: 'ADD_NOTES', payload: event.target.value})}
                      helperText="Protocols"  
                      size="small"
                      multiline rows={2} />         
            </Grid> 



    {/* <div> */}
      <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', mb: 2, flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            {/* try 1 instead of monday */}
            <CardContent sx={{ backgroundColor: clientSchedule[1] ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>
        </Grid>
       
      <Grid item xs={2} >
          <Card raised onClick={(event) => handleClick('Tuesday')} >
            <CardContent sx={{ backgroundColor: clientSchedule[2] ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Wednesday')}>
            <CardContent sx={{ backgroundColor: clientSchedule[3] ? '#7BCEC8' : null }}>
              Wednesday
            </CardContent>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Thursday')} >
            <CardContent sx={{ backgroundColor: clientSchedule[4] ? '#7BCEC8' : null }}>
              Thursday
            </CardContent>
          </Card>
      </Grid>
      <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Friday')}>
            <CardContent sx={{ backgroundColor: clientSchedule[5] ? '#7BCEC8' : null }}>
              Friday
            </CardContent>
          </Card>
        </Grid>
      </Grid>          

          {/*-------------------- BUTTONS --------------------*/}
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={back}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="success" onClick={checkInputs}>Next</Button> 
        </Box>
      </Box>
    // </div>
      
    );
}

export default AddClient;