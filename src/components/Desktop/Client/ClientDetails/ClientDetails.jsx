import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';




function ClientDetails(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)

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
            <Grid sx={{display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: 1}}>
              <TextField 
                value={client.first_name} 
                helperText="First Name"  
                size="small" 
                sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
                InputProps={{readOnly: true}}/> 
              <TextField 
                value={client.last_name} 
                helperText="Last Name"  
                size="small" 
                sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
                InputProps={{readOnly: true}}/> 
              <TextField 
                value={client.phone} 
                helperText="Phone"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.email} 
                helperText="Email"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.address} 
                helperText="Address"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.notes || ''} 
                helperText="Notes"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.route} 
                helperText="Default Route"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.vet_name} 
                helperText="Vet Name"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.vet_phone} 
                helperText="Vet Phone"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              
            </Grid> {/* value is what you see in the field, read only*/}


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
          {client.dogs && client.dogs.map && client.dogs.map((dog) => (
              <Card sx={{width: '35%', m: 1}}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined" disabled>
                              {dog.dog_name}
                        </Button>
                  </CardActions>
                  <CardMedia component="img"  
                    sx={{width: 1}}
                    alt="client dog photo"
                    image="https://m8r6w9i6.rocketcdn.me/wp-content/uploads/2020/09/Australian-Cattle-Dog.jpeg.webp"/>
              </Card>
                 ))}


         {/*------------------ ADD DOG EXAMPLE ------------------*/}
            
          </Grid>


          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to client list*/}
            <Button variant="contained" color="success"
              onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Edit</Button> 
          </Box>
      </Box>
    );
}

export default ClientDetails;