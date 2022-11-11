import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Select, MenuItem, FormControl, FormHelperText, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';


function ClientForm(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)

  //STYLING NOTES: still have to figure out picture size (so it's cropped or uniform)
const saveChanges = event => {
  dispatch({type: 'EDIT_CLIENT', payload: client})
  dispatch({type: 'CLEAR_CLIENT'})
  dispatch({ type: 'SET_MODAL_STATUS' })
  //need to update dogs as well
}

  return (
        <Box sx={{ m:2, p:2, display: 'flex', flexDirection: 'column' }}>

              {/*----------------------- HEADER -----------------------*/}
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2 }}>  
                <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
                <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/>
                </IconButton>
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
                  value={client.vet_name} 
                  onChange={(e) => dispatch({type: 'ADD_VET_NAME', payload: e.target.value})}
                  helperText="Vet"  
                  size="small"/>
                <TextField 
                  value={client.vet_phone}
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
              <Card sx={{width: '100%', m: 1}}
                    onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined">
                              Bandit
                        </Button>
                  </CardActions>
                  <CardMedia component="img" width="100%" alt="client dog photo"
                    image="https://m8r6w9i6.rocketcdn.me/wp-content/uploads/2020/09/Australian-Cattle-Dog.jpeg.webp"/>
              </Card>

              <Card sx={{ width: '100%', m: 1 }}
                    onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined">
                              Maggie
                        </Button>
                  </CardActions>
                  <CardMedia component="img" width="100%" alt="client dog photo"
                    image="https://images.ctfassets.net/sfnkq8lmu5d7/2jiEB2xKaHaQh5DLuT3lMI/204094de400b9dc16f0a8b20bc81ef68/The-Wildest_Editorial_Canine_Vertigo_is_Treatable_but_Scary_to_Witness_Hero.jpg?w=700&h=525&fl=progressive&q=80&fm=jpg"/>
              </Card>
              

              {/*------------------ ADD DOG EXAMPLE ------------------*/}
              <Card sx={{ width: '100%', m: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(227, 218, 216, 0.5)", width: "89%", height: "90%", borderRadius: "0.5rem" }} alt="add dog button" 
                     onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})}>
                      <LibraryAddIcon  sx={{ height: "100%", color: "rgb(171, 164, 162)" }}/>
                  </Box>
              </Card>
            </Grid>


            {/*-------------------- BUTTONS --------------------*/}
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="info"
                onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to client list*/}
              <Button variant="contained" color="secondary"
                onClick={saveChanges}>Save</Button> 
            </Box>
      </Box>
    );
}

export default ClientForm;