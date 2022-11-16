import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, Box, CardContent, Switch, CardMedia, Grid, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';

import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function AddDogForm (){
  const dispatch = useDispatch();

  const dogUrl = useSelector(store => store.dogPhotoReducer);
  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)
  

  const back = event => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'})
    dispatch({type: 'CLEAR_DOGS'});
  }

  const checkInputs = (event) => {
   for(let dog of dogs){
    if(dog.dog_name ===  undefined || dog.dog_name ===  '') {
      console.log('error in form')
    } else {
      // dispatch({ type: 'SET_CLIENT_MODAL', })
      saveClient();
    }  
}
}


 const saveSchedule = (view) => {
    dispatch({type: 'ADD_DOGS', payload: dogs})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view})
    // dispatch({type: 'CLEAR_SCHEDULE'})
    saveClient();
     
 }
 const saveClient = event => {

  dispatch({type: 'ADD_DOGS', payload: dogs})
  // dispatch({type: 'ADD_CLIENT', payload: client})
  dispatch({type: 'SET_CLIENT_MODAL', payload: 'ConfirmClient'})
}


    return (
      <>
  <h1>Add Dog</h1>
  <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', mb: 3, mt: 2, gap: 1}}>
      {dogs.map((singleDog, index)=> (
      <Card key={index} sx={{width: '30%', m: 1, mt:0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
          <Box sx={{ display: "flex", flexDirection: "row",  justifyContent: "space-between", alignItems: "center", gap: 1 }}>
              <Switch checked={dogs[index].flag} 
                  onChange={()=> {
                    if (!dogs[index].flag){
                      dispatch({ 
                        type:'SET_FIRST_FLAG',
                        payload: {
                          flag: true,
                          index: index
                        }
                    })
                    }
                    else {
                      dispatch({ 
                        type:'SET_FIRST_FLAG',
                        payload: {
                          flag: false,
                          index: index
                        }
                    })
                    }}}/>
                     {singleDog.flag? <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/>   
                      :
                       <FlagCircleIcon style={{ fontSize: 36, color: '#808080' }}/> 
                  }
              {/* <FlagCircleIcon style={{ fontSize: 36, color: '#e0603f' }}/> */}
            </Box>
              <ImageUpload index={index} />
              <TextField 
                value={singleDog.dog_name} 
                sx={{width: 175}} 
                onChange={(e) => {
                  dispatch({
                    type: 'ADD_DOG_NAME',
                    payload: {
                      dog_name: e.target.value,
                      index: index
                  }
                })
              }}
              helperText="* Dog Name"  
              size="small" 
              /> 
              <TextField 
                value={singleDog.dog_notes}
                sx={{width: 175}} 
                onChange={(e) => {
                  dispatch({
                    type: 'ADD_DOG_NOTES',
                    payload: {
                      dog_notes: e.target.value,
                      index: index
                    }
                  })
                }}
                helperText="Notes"  
                size="small" 
                multiline rows={3}
                /> 
            <p>Regular Dog?</p>
            <Checkbox
              checked={dogs[index].regular}
              onChange={()=> {
                  if (!dogs[index].regular){
                    dispatch({ 
                      type:'SET_REGULAR',
                      payload: {
                        regular: true,
                        index: index
                      }
                  })
                  }
                  else {
                    dispatch({ 
                      type:'SET_REGULAR',
                      payload: {
                        regular: false,
                        index: index
                      }
                  })
                  }}}
                        />
        </Card>
        ))}
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={()=> {
                dispatch({type: 'ADD_DOG_INPUT'})
            }}/>
          </Fab>
  </Grid>
        <Box sx={{mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="info"
            onClick={back}>Back</Button> 
          {/* need to make the bottom save data */}
          {/* <Button onClick={() => saveDogs('AddClient')}>Save</Button>  */}
          <Button variant="contained" color="success"
            onClick={checkInputs}>Next</Button> 
        </Box>
   
      </>
      );
}

export default AddDogForm;





