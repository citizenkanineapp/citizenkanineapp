import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, Box, CardContent, CardMedia, Grid, IconButton } from "@mui/material";

import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function DogDetails(){
  const dispatch = useDispatch();

  const dogUrl = useSelector(store => store.dogPhotoReducer);
  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)

  const [walk, setWalk] = useState(false);

  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    setWalk(current => !current);
    console.log(event)
  };

  const back = event => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'});
    dispatch({type: 'CLEAR_DOGS'});
  }

  const saveDogs = event => {
    dispatch({type: 'ADD_DOGS', payload: dogs})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'})

  }
  
 

    return (
      <>
        <div className="container">
          <h1>Add Dog</h1>

          <ImageUpload />
            <TextField 
                value={dogs.dog_name || ''} 
                onChange={(event) => dispatch({type: 'ADD_DOG_NAME', payload: event.target.value})}
                helperText="Dog Name"  
                size="small" /> 
        </div>
      <div>
      <h2>Weekly Schedule</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            <CardContent sx={{ backgroundColor: walk ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised onClick={(event) => handleClick('Tuesday')} >
            <CardContent sx={{ backgroundColor: walk ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised sx={{ backgroundColor: '#7BCEC8' }}>
            <CardContent>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised>
            <CardContent>
              Friday
            </CardContent>
          </Card>

        </Grid>

      </Grid>
        <Box sx={{mt: 6, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={back}>Cancel</Button> 
          {/* need to make the bottom save data */}
          <Button onClick={() => saveDogs('AddClient')}>Save</Button> 
        </Box>
      </div>
      </>
        
      );
}

export default DogDetails;