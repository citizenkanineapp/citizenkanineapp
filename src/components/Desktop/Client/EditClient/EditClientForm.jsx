import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Avatar, Typography, Card, CardActions, CardMedia, Select, MenuItem, FormControl, FormHelperText, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ImageUpload from "../../../AllPages/ImageUpload/ImageUpload";
// import swal from '@sweetalert/with-react'



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

const deleteClient = (id) => {

  // swal({
  //   title: "Are you sure?",
  //   text: "This will permanently delete this client",
  //   icon: "warning",
  //   buttons: true,
  //   dangerMode: true,
  // })
  // .then((willDelete) => {
  //   if (willDelete) {
  //     dispatch({type: 'SET_MODAL_STATUS'})
  //     dispatch({type: 'DELETE_CLIENT', payload: id})
  //     dispatch({type: 'CLEAR_CLIENT'})
      
  //     swal("Success!", {
  //       icon: "success",

  //     });
  //   } else {
  //     swal("The client is safe!");
  //   }
  // });


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
        <Box sx={{ m:2, p:2, display: 'flex', flexDirection: 'column' }}>

              {/*----------------------- HEADER -----------------------*/}
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2 }}>  
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
              <Grid sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: 1 }}>
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
            <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              {client.dogs.map((dog, index) => (
              <Card key={index} sx={{width: '100%', m: 1}}
                    onClick={() => fetchOneDog(dog)}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined">
                              {dog.dog_name}
                        </Button>
                  </CardActions>
                  <CardMedia component="img" width="100%" alt="client dog photo"
                    src={dog.image}
                    sx={{height: 175}}/>
              </Card>
                ))}
         
              

              {/*------------------ ADD DOG EXAMPLE ------------------*/}
              <Card sx={{ width: '100%', m: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(227, 218, 216, 0.5)", width: "89%", height: "90%", borderRadius: "0.5rem" }} alt="add dog button" 
                     onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogFromEdit'})}>
                      <LibraryAddIcon  sx={{ height: "100%", color: "rgb(171, 164, 162)" }}/>
                  </Box>
              </Card>
            </Grid>


            {/*-------------------- BUTTONS --------------------*/}
            <Box sx={{mt: 2 }} display="flex" justifyContent="space-between">
              <Box width="28%" display="flex" justifyContent="space-between">
                <Button variant="outlined" color="info" onClick={back}>Cancel</Button>  {/*goes back to client list*/}
                    <Button variant="contained"
                      onClick={() => deleteClient(client.id)}>Delete</Button> 
              </Box>
                <Button variant="contained" color="secondary"
                  onClick={saveChanges}>Save</Button> 

            </Box>
      </Box>
    );
}

export default ClientForm;