import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import ImageUpload from "../../../AllPages/ImageUpload/ImageUpload";




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
    console.log(clientDogObj)
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
              <IconButton disabled>
                <CalendarMonthIcon sx={{ fontSize: 45, color: 'rgb(163, 147, 142)' }}/> 
              </IconButton>
            </Grid> {/* display only */}

         
              {/*-------------------- TEXT FIELDS --------------------*/}
            <Grid sx={{display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 1}}>
          
                  <TextField 
                value={client.street} 
                helperText="Street"  
                size="small" 
                InputProps={{readOnly: true}}
              />
              <TextField 
                value={client.city} 
                helperText="City"  
                size="small" 
                InputProps={{readOnly: true}}
                />
              <TextField 
                value={client.zip} 
                helperText="Zip"  
                size="small" 
                InputProps={{readOnly: true}}
               />
              
              <TextField 
                value={client.email} 
                helperText="Email"  
                size="small" 
                InputProps={{readOnly: true}}
               />
            <TextField 
                value={client.phone} 
                helperText="Phone"  
                size="small" 
                InputProps={{readOnly: true}}
                />
              <TextField 
                value={client.notes || ''} 
                helperText="Notes"  
                size="small" 
                InputProps={{readOnly: true}}
               />
              <TextField 
                value={client.vet_name} 
                helperText="Vet Name"  
                size="small" 
                InputProps={{readOnly: true}}
            />
              <TextField 
                value={client.vet_phone} 
                helperText="Vet Phone"  
                size="small" 
                InputProps={{readOnly: true}}
               />
               <TextField 
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
                        <Button size="small" variant="outlined" disabled>
                              {dog.dog_name}
                        </Button>
                  </CardActions>
                  <CardMedia component="img"  
                    // sx={{width: 1}}
                    width="100%"
                    alt="client dog photo"
                    src={dog.image}
                    sx={{height: 175}}
                    />
              </Card>
                 ))}


       
            
          </Grid>


          


          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={back}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="success"
              onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Edit</Button> 
          </Box>
      </Box>
    );
}

export default ClientDetails;