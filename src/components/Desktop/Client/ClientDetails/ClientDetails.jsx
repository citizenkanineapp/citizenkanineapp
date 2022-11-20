import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton, CardContent, CardHeader } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';


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

  const [flipCard, setFlipCard] = useState(false);
  

  return (
      <Box sx={{m:2, p:2, height: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1.5 }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>  
              <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
              <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/> 
              </IconButton>
            </Grid> {/* display only */}

         
              {/*-------------------- TEXT FIELDS --------------------*/}
            <Grid sx={{display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', columnGap: 1, py: 2 }}>
          
              <TextField
                focused={false}
                value={client.street} 
                helperText="Street"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
              />
              <TextField
                focused={false}
                value={client.city} 
                helperText="City"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
              <TextField
                focused={false}
                value={client.zip} 
                helperText="Zip"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
              
              <TextField
                focused={false}
                value={client.email} 
                helperText="Email"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
            <TextField
                focused={false}
                value={client.phone} 
                helperText="Phone"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
              <TextField
                focused={false}
                value={client.notes || ''} 
                helperText="Protocols"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
              <TextField
                focused={false}
                value={client.vet_name || ''} 
                helperText="Vet Name"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
            />
              <TextField
                focused={false}
                value={client.vet_phone || ''} 
                helperText="Vet Phone"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
               <TextField
                focused={false}
                value={client.route_name || ''} 
                helperText="Default Route"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
            </Grid> {/* value is what you see in the field, read only*/}


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
          {client.dogs && client.dogs.map && client.dogs.map((dog, index) => 
              ((flipCard === true && dog.dog_notes) ?
                <Card key={index} sx={{width: '35%', height: '225px', m: 1}} onClick={() => setFlipCard(!flipCard)}>
                   <CardActions sx={{ justifyContent: 'space-between', ml: 1 }}>
                    <Typography>{dog.dog_name}</Typography>
                    {dog.flag && <FlagCircleIcon sx={{color: '#e0603f'}}/>}
                  </CardActions>
                  <CardContent sx={{height: '80%', bgcolor: '#e5e1df'}}>
                    <Typography>{dog.dog_notes}</Typography>
                  </CardContent>
                </Card>
                  :
                <Card key={index} sx={{width: '35%', height: '225px', m: 1}} onClick={() => setFlipCard(!flipCard)}>
                  <CardActions sx={{ justifyContent: 'space-between', ml: 1 }}>
                    <Typography>{dog.dog_name}</Typography>
                    {dog.flag && <FlagCircleIcon sx={{color: '#e0603f'}}/>}
                  </CardActions>
                  <CardMedia component="img"  
                    // sx={{width: 1}}
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
            <Box width="22%" display="flex" justifyContent="space-between">
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