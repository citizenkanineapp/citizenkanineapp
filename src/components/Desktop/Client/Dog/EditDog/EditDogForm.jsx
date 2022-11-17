import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, Switch, IconButton } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";
import swal from 'sweetalert'

function EditDogForm(){
 
//do a get one dog instead?


  const dispatch = useDispatch();
  const dog = useSelector (store => store.dogDelete)
  let [flag, setFlag] = useState(dog.flag)

  const handleFlagChange = event => {
    console.log(flag)
    setFlag(current => !current)
    dispatch({type: 'SET_EDIT_FLAG', payload: !flag})
  
  }

  const dogObject = {
    dog_id: dog.dog_id,
    client_id: dog.client_id
  }
  
  const deleteDog = (dog) => {
    swal({
      title: "Are you sure?",
      text: "This will permanently delete this dog",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        console.log(dog)
        dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})
        dispatch({ type: 'DELETE_DOG', payload: dog})
        dispatch({type: 'CLEAR_DELETE_DOG'})
       
        swal("Success!", {
          icon: "success",
  
        });
      } else {
        swal("The dog is safe!");
      }
    });
  }

  const saveDogDetails = (event) =>{
   
    dispatch({type: 'UPDATE_DOG', payload: dog})
    // dispatch({type: 'CLEAR_DELETE_DOG'})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})
    // dispatch({ type: 'BACK_TO_VIEW'})

  }
  
  const back = event => {
    dispatch({type: 'CLEAR_NEW_DOG'})
    dispatch({ type: 'BACK_TO_VIEW'})

  }
 
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
          <Box display="flex" justifyContent="flex-end">
            {/* <IconButton width="5%"  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>
              <ArrowBackIcon sx={{ fontSize: "2rem", fontWeight: "800"}}/>
            </IconButton> */}
          </Box>

          {/*-------------------- DETAILS --------------------*/}
        
          <Box sx={{ display: "flex", flexDirection: "row", height: "80%", width: "100%", justifyContent: "center", alignItems: "center", gap: 5 }}>
            <Card sx={{ width: "40%", height: "50%" }}>  {/*need to figure out aspect ratio and conditional rendering to change into image upload for editing image*/}
            <img src={dog.image}/>
            </Card>

            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "60%", gap: 3}}>
              <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", gap: 1 }}>
              {dog &&
                <TextField 
                  value={dog.dog_name} sx={{ pl: "10" }} 
                  onChange={(e) => dispatch({type: 'UPDATE_DOG_NAME', payload: e.target.value})}>
          
                </TextField>
              }
              
      
                  <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                     <Switch checked={dog.flag}
                  onChange={()=> {
                    if (!dog.flag){
                      dispatch({ 
                        type:'SET_EDIT_FLAG',
                        payload: true
                    })
                    }
                    else {
                      dispatch({ 
                        type:'SET_EDIT_FLAG',
                        payload: false
                    })
                    }}}/>
                      {dog.flag? <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/>   
                      :
                       <FlagCircleIcon style={{ fontSize: 36, color: '#808080' }}/> 
                  }
                  </Box>
              </Box> 
              <TextField 
                value={dog.dog_notes || ''}
                onChange={(e) => dispatch({type: 'UPDATE_DOG_NOTES', payload: e.target.value})}
                helperText="Notes" size="large" fullWidth multiline rows={4}/> {/* needs onChange/functionality */}
            </Box>
          </Box>

       
        {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
              <Box width="25%" display="flex" justifyContent="space-between">
                <Button variant="outlined" color="info"
                    onClick={back}>Cancel</Button> 
                <Button variant="contained"
                    onClick={() => deleteDog(dogObject)}>Delete</Button> 
              </Box>
              <Button variant="contained" color="secondary"
                  onClick={() => saveDogDetails()}>Save</Button> {/*PUT ROUTE*/}
            </Box>

        </Box>
      );
}

export default EditDogForm;
