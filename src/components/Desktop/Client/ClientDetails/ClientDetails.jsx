import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import ImageUpload from "../../../AllPages/ImageUpload/ImageUpload";
import DeleteIcon from '@mui/icons-material/Delete';



function ClientDetails(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  
  const back = event => {
    dispatch({type: 'CLEAR_CLIENT'})
    dispatch({ type: 'SET_MODAL_STATUS' })
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
    dispatch({type: 'SET_DOG', payload: clientDogObj})
    console.log(' does it pass dog?' ,clientDogObj)
    openModal('DogDetails')
  }

  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //opens dog edit form
    
  }
  

  return (
      <Box sx={{m:2, p:2, display: 'flex', flexDirection: 'column' }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2}}>  
              <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
              <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/> 
              </IconButton>
            </Grid> {/* display only */}

         
              {/*-------------------- TEXT FIELDS --------------------*/}
            <Grid sx={{display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 1, py: 3}}>
          
              <TextField
                focused={false}
                variant="standard" 
                value={client.street} 
                helperText="Street"  
                size="small" 
                InputProps={{readOnly: true}}
              />
              <TextField
                focused={false}
                variant="standard" 
                value={client.city} 
                helperText="City"  
                size="small" 
                InputProps={{readOnly: true}}
                />
              <TextField
                focused={false}
                variant="standard" 
                value={client.zip} 
                helperText="Zip"  
                size="small" 
                InputProps={{readOnly: true}}
               />
              
              <TextField
                focused={false}
                variant="standard" 
                value={client.email} 
                helperText="Email"  
                size="small" 
                InputProps={{readOnly: true}}
               />
            <TextField
              focused={false}
              variant="standard" 
                value={client.phone} 
                helperText="Phone"  
                size="small" 
                InputProps={{readOnly: true}}
                />
              <TextField
                focused={false}
                variant="standard" 
                value={client.notes || ''} 
                helperText="Protocols"  
                size="small" 
                InputProps={{readOnly: true}}
               />
              <TextField
                focused={false}
                variant="standard" 
                value={client.vet_name || ''} 
                helperText="Vet Name"  
                size="small" 
                InputProps={{readOnly: true}}
            />
              <TextField
                focused={false}
                variant="standard" 
                value={client.vet_phone || ''} 
                helperText="Vet Phone"  
                size="small" 
                InputProps={{readOnly: true}}
               />
               <TextField
                focused={false}
                variant="standard" 
                value={client.route_name || ''} 
                helperText="Default Route"  
                size="small" 
                InputProps={{readOnly: true}}
                />
            </Grid> {/* value is what you see in the field, read only*/}


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
          {client.dogs && client.dogs.map && client.dogs.map((dog, index) => (
              <Card key={index} sx={{width: '35%', m: 1}} onClick={() => fetchOneDog(dog)}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Typography>{dog.dog_name}</Typography>
                  </CardActions>
                  <CardMedia component="img"  
                    // sx={{width: 1}}
                    width="100%"
                    alt="client dog photo"
                    src={dog.image ? dog.image : 'images/dogfiller.jpeg'}
                    // src={'images/dogfiller.jpeg'}
                    sx={{height: 175}}
                    />
              </Card>
              ))}


       
            
          </Grid>

          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2 }} display="flex" justifyContent="space-between">
            <Box width="23%" display="flex" justifyContent="space-between">
              <Button variant="outlined" color="info"
                onClick={back}>Back</Button>  {/*goes back to client list*/}
              <Button variant="contained"
                onClick={() => deleteClient(client.id)}>Delete</Button> 
            </Box>
              <Button variant="contained" color="secondary"
                onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Edit</Button> 
          </Box>

      </Box>
    );
}

export default ClientDetails;