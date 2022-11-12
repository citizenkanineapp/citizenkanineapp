import { useSelector, useDispatch } from "react-redux";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton, CardContent } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';




function ConfirmClient(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)
  const clientSchedule = useSelector(store => store.clientScheduleReducer)

  const back = event => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})
  }

  const saveClient = event => {
    dispatch({type: 'ADD_CLIENT', payload: client})
    dispatch({type: 'SET_MODAL_STATUS'})
    dispatch({type: 'CLEAR_SCHEDULE'})
    dispatch({type: 'CLEAR_CLIENT'})
    dispatch({type: 'CLEAR_DOGS'})

    //need to add clear client?
  }
console.log('client right now', client)
  return (
      <Box sx={{m:2, mt:0, p:2, pt: 0, display: 'flex', flexDirection: 'column' }}>

            {/*----------------------- HEADER -----------------------*/}
            {/* <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2}}>  
              <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
             
            </Grid> */}

         
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
                value={client.street} 
                helperText="Address"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.city} 
                helperText="City"  
                size="small" 
                InputProps={{readOnly: true}}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' }}}/>
              <TextField 
                value={client.zip} 
                helperText="Zip"  
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
                value={client.route_id || ''} 
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
          {dogs && dogs.map && dogs.map((dog, index) => (
              <Card key={index} sx={{width: '35%', m: 1}}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined" disabled>
                              {dog.dog_name}
                        </Button>
                  </CardActions>
                  <CardMedia component="img"  
                    sx={{width: 1}}
                    alt="client dog photo"
                    // src={dog.image}
                    />
              </Card>
                 ))}
            
          </Grid>

          <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised >
            <CardContent sx={{ backgroundColor:clientSchedule[1] ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised  >
            <CardContent sx={{ backgroundColor: clientSchedule[2] ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent sx={{ backgroundColor: clientSchedule[3] ? '#7BCEC8' : null }}>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised >
            <CardContent sx={{ backgroundColor: clientSchedule[4] ? '#7BCEC8' : null }}>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent sx={{ backgroundColor: clientSchedule[5] ? '#7BCEC8' : null }}>
              Friday
            </CardContent>
          </Card>

        </Grid>
        </Grid>


          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={back}>Back</Button>  {/*goes back to dog form*/}
            <Button variant="contained" color="success"
              onClick={saveClient}>Save</Button> 
          </Box>
      </Box>
    );
}

export default ConfirmClient;