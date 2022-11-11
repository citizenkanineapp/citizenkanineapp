import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
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
 

  //use states for client information

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [phoneNumber, setPhoneNumber] = useState('');
  let [address, setAddress] = useState('');
  let [notes, setNotes] = useState('');
  let [route, setRoute] = useState('');
  let [vetName, setVetName] = useState('');
  // let [vetClinic, setVetClinic] = useState('');
  let [vetPhone, setVetPhone] = useState('');
  // let [qbId, setQbId] = useState('');

  const addClient = event => {
    event.preventDefault();
    const action ={
      type: 'ADD_CLIENT',
      payload: {
        first_name: firstName,
        last_name: lastName,
        address: address,
        route: route,
        phone: phoneNumber,
        notes: notes,
        //including dog info in object
        vet_name: vetName,
        vet_phone: vetPhone,
      }
    }
    dispatch(action);
    dispatch({ type: 'SET_MODAL_STATUS' });
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
         
            <Grid sx={{display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: 1}}>
             
                {clientToAdd &&
                <TextField 
                  value={clientToAdd.first_name} 
                  onChange={(event) => setFirstName(event.target.value)}
                  helperText="First Name"  
                  size="small" />
                }
                <TextField 
                  value={lastName} 
                  onChange={(event) => setLastName(event.target.value)}
                  helperText="Last Name"  
                  size="small" /> 
                <TextField 
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} 
                  helperText="Email"  
                  size="small" />
                <TextField 
                  value={phoneNumber} 
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  helperText="Phone"  
                  size="small" />
                <TextField 
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  helperText="Address"  
                  size="small" />
                <TextField 
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  helperText="Notes"  
                  size="small" />
                <TextField 
                  value={vetName}
                  onChange={(event) => setVetName(event.target.value)} 
                  helperText="Vet"  
                  size="small" />
                {/* <TextField 
                  value={vetClinic} 
                  onChange={(event) => setVetClinic(event.target.value)}
                  helperText="Clinic"  
                  size="small" /> */}
                <TextField 
                  value={vetPhone}
                  onChange={(event) => setVetPhone(event.target.value)}
                  helperText="Vet Phone"  
                  size="small" />
                    <FormControl>
                <Select
                  labelId="route"
                  id="route"
                  value={route}
                  onChange={(event) => {
                    
                    setRoute(event.target.value);
        
                  }}
                >
                  <MenuItem value={'tangletown'}>Tangletown</MenuItem>
                  <MenuItem value={'emerson'}>Emerson</MenuItem>
                  <MenuItem value={'far'}>Far</MenuItem>
                  <MenuItem value={'misfits'}>Misfits</MenuItem>
                  <MenuItem value={'unassigned'}>Unassigned</MenuItem>
                </Select>
                <FormHelperText>Default Route</FormHelperText>
              </FormControl>
                {/* <TextField 
                  value={qbId}
                  onChange={(event) => setQbId(event.target.value)}
                  helperText="Quickbooks ID"  
                  size="small" />  */}
             
            
            </Grid> 
        


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          
            

         {/*------------------ ADD DOG EXAMPLE ------------------*/}
              <Card sx={{ width: '100%', m: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(227, 218, 216, 0.5)", width: "89%", height: "90%", borderRadius: "0.5rem" }} alt="add dog button" 
                     onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})}
                     >
                      <LibraryAddIcon  sx={{ height: "100%", color: "rgb(171, 164, 162)" }}/>
                  </Box>
              </Card>
          </Grid>


          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="success" onClick={addClient}>Save</Button> 
          </Box>
      </Box>
    );
}

export default AddClient;