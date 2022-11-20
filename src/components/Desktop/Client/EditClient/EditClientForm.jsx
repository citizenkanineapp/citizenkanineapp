import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Avatar, Typography, Card, CardActions, CardMedia, Select, MenuItem, FormControl, FormHelperText, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import EditIcon from '@mui/icons-material/Edit';




function ClientForm(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  
  useEffect(()=> {
    dispatch({
      type: 'FETCH_CLIENTS'
    })
    
  },[])



  //STYLING NOTES: still have to figure out picture size (so it's cropped or uniform)
const saveChanges = event => {
  dispatch({type: 'EDIT_CLIENT', payload: client})
  dispatch({type: 'CLEAR_CLIENT'})
  dispatch({ type: 'SET_MODAL_STATUS' })
  //need to update dogs as well
}

const back = event => {
  dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientDetails'})
  // dispatch({type: 'CLEAR_CLIENT'})
  // dispatch({type: 'CLEAR_DOGS'})
}


const openModal = (view) => {
  dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //opens dog edit form
  
}

const fetchOneDog = (dog) =>{
  const clientDogObj = {
    client_id: client.id,
    dog_name: dog.dog_name,
    image: dog.image,
    dog_id: dog.dog_id,
    dog_notes: dog.dog_notes,
    flag: dog.flag

  }
  dispatch({type: 'SET_DOG_DELETE', payload: clientDogObj})
  openModal('EditDogForm')
}

  return (
        <Box sx={{ m:2, p:2,  height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1.5 }}>

              {/*----------------------- HEADER -----------------------*/}
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>  
                <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
                <Box sx={{justifyContent:'space-between'}}>
                {/* <IconButton onClick={() => deleteClient(client.id)}>
                    <DeleteIcon sx={{ fontSize: 45, color: '#341341', mr: 3 }}/>
                </IconButton> */}
                <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/>
                </IconButton>
                </Box>
              </Grid>


                {/*-------------------- TEXT FIELDS --------------------*/}
              <Grid sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', columnGap: 1, py: 2 }}>
                <TextField 
                  value={client.street}
                  onChange={(e) => dispatch({type: 'ADD_STREET', payload: e.target.value})}
                  helperText="Street"  
                  size="small"/>
                <TextField 
                  value={client.city}
                  onChange={(e) => dispatch({type: 'ADD_CITY', payload: e.target.value})}
                  helperText="City"  
                  size="small"/>
                <TextField 
                  value={client.zip}
                  onChange={(e) => dispatch({type: 'ADD_ZIPCODE', payload: e.target.value})}
                  helperText="Zip Code"  
                  size="small"/>
                <TextField 
                  value={client.email}
                  onChange={(e) => dispatch({type: 'ADD_EMAIL', payload: e.target.value})} 
                  helperText="Email"  
                  size="small"/>
                <TextField 
                  value={client.phone}
                  onChange={(e) => dispatch({type: 'ADD_PHONE', payload: e.target.value})}
                  helperText="Phone"  
                  size="small"/>
                <TextField 
                  value={client.notes || ''} 
                  onChange={(e) => dispatch({type: 'ADD_NOTES', payload: e.target.value})}
                  helperText="Notes"  
                  size="small"/>
                <TextField 
                  value={client.vet_name || ''} 
                  onChange={(e) => dispatch({type: 'ADD_VET_NAME', payload: e.target.value})}
                  helperText="Vet"  
                  size="small"/>
                <TextField 
                  value={client.vet_phone || ''}
                  onChange={(e) => dispatch({type: 'ADD_VET_PHONE', payload: e.target.value})}
                  helperText="Vet Contact"  
                  size="small"/>
                <FormControl>
                  <Select
                    labelId="route"
                    size="small"
                    id="route"
                    value={client.route_name || ''}
                    onChange={(event) => {
                      dispatch({type: 'CHANGE_ROUTE', payload: event.target.value})
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
              </Grid> 


            {/*-------------------- DOG PICTURES --------------------*/}
            <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
              {client.dogs.map((dog, index) => (
                  <Card key={index} sx={{width: '35%', height: '225px', m: 1}}>
                    <CardActions sx={{ justifyContent: 'space-between', ml: 1, py: 0, pr: 0}}>
                      <Typography>{dog.dog_name}</Typography>
                      <IconButton sx={{borderRadius: 0}}>
                        <EditIcon  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditDogForm'})}/>
                      </IconButton>
                    </CardActions>
                    <CardMedia component="img"  
                      width="100%"
                      alt="client dog photo"
                      src={dog.image ? dog.image : 'images/dogfiller.png'}
                      sx={{height: 175}}
                      />
                  </Card>
                ))}
         
            </Grid>

            {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" color="info" onClick={back}>Cancel</Button>
              <Box width="23%" display="flex" justifyContent="space-between">
                <Button variant="contained" color="error"
                  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogFromEdit'})}>Add Dog</Button>  
                 <Button variant="contained" color="secondary"
                  onClick={saveChanges}>Save</Button> 
              </Box>
            </Box>
      </Box>
    );
}

export default ClientForm;