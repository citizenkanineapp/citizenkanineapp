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
  const clientToAdd = useSelector(store => store.clientToAddReducer)
   // const addClient = event => {
  //   event.preventDefault();

  //   dispatch({type: 'CLEAR_CLIENT'});
  //   dispatch({ type: 'SET_MODAL_STATUS' });
  // }

  //use states for client information

  const back = event => {
    dispatch({type: 'CLEAR_CLIENT'});
    dispatch({ type: 'SET_MODAL_STATUS' })
  }

  const checkInputs = (event) => {
    if(clientToAdd.first_name === undefined || clientToAdd.first_name === '' ||  clientToAdd.last_name === undefined || clientToAdd.last_name === '' || clientToAdd.phone === undefined ||
    clientToAdd.phone === '' || clientToAdd.street === undefined || clientToAdd.street === '' || clientToAdd.city === undefined || clientToAdd.city === '' || clientToAdd.zip === undefined || clientToAdd.zip === '' ||
    clientToAdd.email === undefined || clientToAdd.email === '' || clientToAdd.route_id === undefined || clientToAdd.route_id === '') {
      console.log('error in form')
    } else if(clientToAdd.phone.length > 13){
      console.log('phone number error')
    } else {
      dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})
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
                  value={clientToAdd.first_name} 
                  onChange={(event) => dispatch({type: 'ADD_FIRST_NAME', payload: event.target.value})}
                  helperText="* First Name"  
                  // error={clientToAdd.first_name === ""}
                  // helperText={clientToAdd.first_name === "" ? 'Empty field!' : 'First Name'}
                  size="small" />
                }
                <TextField 
                  value={clientToAdd.last_name} 
                  onChange={(event) => dispatch({type: 'ADD_LAST_NAME', payload: event.target.value})}
                  helperText="* Last Name"  
                  size="small" /> 
                <TextField 
              value={clientToAdd.phone} 
              onChange={(event) => dispatch({type: 'ADD_PHONE', payload: event.target.value})}
              helperText="* Phone"  
              size="small" />
                <TextField 
                  value={clientToAdd.street} 
                  onChange={(event) => dispatch({type: 'ADD_STREET', payload: event.target.value})}
                  helperText="* Address"  
                  size="small" />
                <TextField 
                  value={clientToAdd.city} 
                  onChange={(event) => dispatch({type: 'ADD_CITY', payload: event.target.value})}
                  helperText="* City"  
                  size="small" />
                <TextField 
                  value={clientToAdd.zip} 
                  onChange={(event) => dispatch({type: 'ADD_ZIPCODE', payload: event.target.value})}
                  helperText="* Zip Code"  
                  size="small" />

                <TextField 
                  value={clientToAdd.email} 
                  onChange={(event) => dispatch({type: 'ADD_EMAIL', payload: event.target.value})}
                  helperText="* Email"  
                  size="small" />
              <TextField 
                value={clientToAdd.notes} 
                onChange={(event) => dispatch({type: 'ADD_NOTES', payload: event.target.value})}
                helperText="Notes"  
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
        

                       

          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={back}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="success" onClick={checkInputs}>Next</Button> 
          </Box>
      </Box>
    );
}

export default AddClient;