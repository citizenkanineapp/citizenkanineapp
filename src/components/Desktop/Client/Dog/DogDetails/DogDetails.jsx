import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardMedia, Switch, IconButton } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DogDetails(){
  const dispatch = useDispatch();
  const dog = useSelector(store => store.dogDelete)

console.log(dog)

  const back = event => {
    dispatch({type: 'CLEAR_DELETE_DOG'})
    dispatch({ type: 'BACK_TO_VIEW'})
  }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>

          <Box display="flex" justifyContent="flex-end">
            {/* <IconButton width="5%"  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>
              <ArrowBackIcon sx={{ fontSize: "2rem", fontWeight: "800"}}/>
            </IconButton> */}
          </Box>

          {/*-------------------- DETAILS --------------------*/}
          <Box sx={{ display: "flex", flexDirection: "row", height: "90%", width: "100%", justifyContent: "center", alignItems: "center", gap: 5 }}>
              <Card sx={{ width: "40%", height: "50%" }}>  {/*need to figure out aspect ratio and conditional rendering to change into image upload for editing image*/}
              <CardMedia component='img' image={dog.image ? dog.image : 'images/dogfiller.jpeg'} />
              {/* <img src={dog.image ? dog.image : 'images/dogfiller.jpeg'}/> */}
              </Card>

              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "60%", gap: 3}}>
                <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", gap: 1 }}>
                  <Typography variant="h3" sx={{ pl: "10" }}>{dog.dog_name}</Typography>
                  
                  {dog.flag ?
                  <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", alignItems: "center", gap: 1 }}>

                      {/* will need functionality to display correct status*/}
                   
                      {/* <Switch disbaled defaultChecked />              */}
                      <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/>   {/* could do conditional rendering for color here */}
                  </Box>
                : <span></span>

                   }
                </Box> 
                <TextField value= {dog.dog_notes || ''}
                  helperText="Notes" size="large" 
                  fullWidth disabled 
                  InputProps={{readOnly: true}} 
                  multiline rows={4}/>
              </Box> 
          </Box>


            {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" color="info"
                  onClick={back}>Back</Button> 
              <Button variant="contained" color="success"
                  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditDogForm'})}>Edit</Button> 
            </Box>

        </Box>
      );
}

export default DogDetails;