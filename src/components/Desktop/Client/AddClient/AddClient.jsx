import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';




function AddClient(){
  const dispatch = useDispatch();

  return (
      <Box sx={{m:2, p:2, display: 'flex', flexDirection: 'column' }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', mb: 2}}>  
              <Typography variant="h3" >New Client</Typography>
              <IconButton disabled>
                <CalendarMonthIcon sx={{ fontSize: 45, color: 'rgb(163, 147, 142)' }}/> 
              </IconButton>
            </Grid> {/* display only */}

         
              {/*-------------------- TEXT FIELDS --------------------*/}
            <Grid sx={{display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', gap: 1}}>
              <TextField value="134543" helperText="Quickbooks ID"  size="small" /> 
              <TextField value="lisa_loves_dogs@gmail.com" helperText="Email"  size="small" />
              <TextField value="(666)-666-6666" helperText="Phone"  size="small" />
              <TextField value="1234 Gates of Hell Dr." helperText="Address"  size="small" />
              <TextField value="Side Door - Passcode: 666" helperText="Notes"  size="small" />
              <TextField value="Tangletown" helperText="Route"  size="small" />
              <TextField value="Dr. Terry" helperText="Vet"  size="small" />
              <TextField value="All Dogs Go To Heaven Clinic" helperText="Clinic"  size="small" />
              <TextField value="777-777-7777" helperText="Contact"  size="small" />
            </Grid> {/* value is what you see in the field, read only*/}


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Card sx={{width: '100%', m: 1}}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined" disabled>
                              Bandit
                        </Button>
                  </CardActions>
                  <CardMedia component="img" width="100%" alt="client dog photo"
                    image="https://m8r6w9i6.rocketcdn.me/wp-content/uploads/2020/09/Australian-Cattle-Dog.jpeg.webp"/>
              </Card>

              <Card sx={{ width: '100%', m: 1 }}>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined" disabled>
                              Maggie
                        </Button>
                  </CardActions>
                  <CardMedia component="img" width="100%" alt="client dog photo"
                    image="https://images.ctfassets.net/sfnkq8lmu5d7/2jiEB2xKaHaQh5DLuT3lMI/204094de400b9dc16f0a8b20bc81ef68/The-Wildest_Editorial_Canine_Vertigo_is_Treatable_but_Scary_to_Witness_Hero.jpg?w=700&h=525&fl=progressive&q=80&fm=jpg"/>
              </Card>  {/* display only */}


         {/*------------------ ADD DOG EXAMPLE ------------------*/}
              <Card sx={{ width: '100%', m: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 1, 
                      backgroundColor: "rgb(227, 218, 216, 0.5)", width: "89%", height: "90%", borderRadius: "0.5rem" }} alt="add dog button">
                      <PetsIcon sx={{ height: "100%", color: "rgb(171, 164, 162)" }}/>
                  </Box>  {/* display only */}
              </Card>
          </Grid>


          {/*-------------------- BUTTONS --------------------*/}
          <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="info"
              onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to client list*/}
            {/* <Button variant="contained" color="success"
              onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button>  */}
          </Box>
      </Box>
    );
}

export default AddClient;