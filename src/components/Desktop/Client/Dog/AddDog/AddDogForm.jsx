import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, Box, CardContent, CardMedia, Grid, IconButton } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function AddDogForm (){
  const dispatch = useDispatch();

  const dogUrl = useSelector(store => store.dogPhotoReducer);
  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)
  const clientSchedule = useSelector(store => store.clientScheduleReducer)


  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);


  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    switch (event){
      case "Monday":
        setMonday(current => !current);
        dispatch({type: 'SET_MONDAY', payload: !monday})
        break;
      case "Tuesday":
        setTuesday(current => !current);
        dispatch({type: 'SET_TUESDAY', payload: !tuesday})
        break;
      case "Wednesday":
        setWednesday(current => !current);
        dispatch({type: 'SET_WEDNESDAY', payload: !wednesday})
        break;
      case "Thursday":
        setThursday(current => !current);
        dispatch({type: 'SET_THURSDAY', payload: !thursday})
        break;
      case "Friday":
        setFriday(current => !current);
        dispatch({type: 'SET_FRIDAY', payload: !friday})
        break;
    } 
   
    // console.log(event)
   
  };

  const back = event => {
    dispatch({ type: 'BACK_TO_VIEW'});
    dispatch({type: 'CLEAR_DOGS'});
  }


  
 const saveSchedule = (view) => {

    dispatch({type: 'ADD_SCHEDULE', payload: clientSchedule})
    dispatch({type: 'ADD_DOGS', payload: dogs})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view})
    // dispatch({type: 'CLEAR_SCHEDULE'})
     
 }


    return (
      <>
  <h1>Add Dog</h1>
  <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1}}>

      {dogs.map((singleDog, index)=> (
        // singleDog = {name:'', image:''}
      <Card key={index} sx={{width: '30%', m: 1, mt:0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
            <ImageUpload index={index} />
            <TextField 
              value={singleDog.dog_name} 
              onChange={(e) => {
                dispatch({
                  type: 'ADD_DOG_NAME',
                  payload: {
                    dog_name: e.target.value,
                    index: index
                  }
                })
              }}
              helperText="Dog Name"  
              size="small" 
              /> 
              <TextField 
                value={singleDog.dog_notes} 
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
                /> 


        </Card>
        ))}

        
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={()=> {
                dispatch({type: 'ADD_DOG_INPUT'})
              // This is adding another dog object to dog.
              // setDog([...dog, {dogName:'sam', image:''}]);
            }}/>
          </Fab>
    
    </Grid>
      <div>
      <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            {/* try 1 instead of monday */}
            <CardContent sx={{ backgroundColor: clientSchedule[1] ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised onClick={(event) => handleClick('Tuesday')} >
            <CardContent sx={{ backgroundColor: clientSchedule[2] ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Wednesday')}>
            <CardContent sx={{ backgroundColor: clientSchedule[3] ? '#7BCEC8' : null }}>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Thursday')} >
            <CardContent sx={{ backgroundColor: clientSchedule[4] ? '#7BCEC8' : null }}>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Friday')}>
            <CardContent sx={{ backgroundColor: clientSchedule[5] ? '#7BCEC8' : null }}>
              Friday
            </CardContent>
          </Card>

        </Grid>

      </Grid>
        <Box sx={{mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={back}>Back</Button> 
          {/* need to make the bottom save data */}
          {/* <Button onClick={() => saveDogs('AddClient')}>Save</Button>  */}
          <Button onClick={() => saveSchedule('ConfirmClient')}>Next</Button> 
        </Box>
      </div>
      </>
      );
}

export default AddDogForm;





