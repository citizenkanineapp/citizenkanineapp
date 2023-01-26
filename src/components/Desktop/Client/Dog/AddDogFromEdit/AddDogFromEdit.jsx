import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";
//MUI
import { Button, TextField, Grid, Typography, Card, Switch, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function AddDogFromEdit(){
  const dispatch = useDispatch();
  const newDog = useSelector(store => store.newDogReducer)
  const client = useSelector(store => store.clientReducer)

  const index = 0;

  useEffect(()=> {
    dispatch({
      type: 'ADD_CLIENT_ID_TO_DOG',
      payload: client.client_id
    })
    dispatch({
      type: 'ADD_VET_PHONE',
      payload: client.vet_phone
    })
    dispatch({
      type: 'ADD_VET_NAME',
      payload: client.vet_name
    })
    
  },[])

  const saveDog = () => {
    // console.log(newDog.dog_name)
    if (newDog.dog_name){
      setTimeout(() => { //waiting for cloudinary url to return before adding client
        // console.log("Delayed for 1 second");
        dispatch({type: 'ADD_NEW_DOG', payload: newDog});
        dispatch({type: 'CLEAR_NEW_DOG'});
        dispatch({type: 'CLEAR_DOGS'}); 
        }, "1000");
        dispatch({type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'});
    };
  }

  const goBack = () => {
    dispatch({type: 'CLEAR_NEW_DOG'});
    dispatch({type: 'CLEAR_DOGS'});
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'});
  };

//this form is only for adding dogs from the edit client path
    return (
      <Grid container sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'column', gap: 1}}>
        <Grid item>
          <Typography variant="h5">Add Dog</Typography>
        </Grid>
        <Grid item sx={{ height: '85%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1}}>
            <Card key={index} sx={{width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, pt: 4}}>

                      <ImageUpload index={index} />

                      <TextField 
                        sx={{ width: '95%' }}
                        value={newDog.dog_name || ''}
                        onChange={(e) => {
                          dispatch({
                            type: 'ADD_NEW_NAME', 
                            payload: e.target.value
                          })
                        }}
                        helperText="Name"  
                        size="small" 
                        /> 

                      <TextField 
                        sx={{ width: '95%' }}
                        value={newDog.dog_notes}
                        onChange={(e) => {
                        dispatch({
                          type: 'ADD_NEW_NOTES',
                          payload: e.target.value,
                        })
                        }}
                        helperText="Notes"  
                        size="small" 
                        multiline rows={3}
                        /> 

                      <List sx={{ width: '100%' }}>
                        <ListItem>
                          <ListItemIcon>
                            <FlagCircleIcon sx={{ color: newDog.flag && '#e0603f' }}/>
                          </ListItemIcon>
                          <ListItemText 
                            sx={{ my: 0 }}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: 'medium',
                              }}>
                            Flagged
                          </ListItemText>
                          <Switch
                            edge="end"
                            size="small"
                            checked={newDog.flag ? newDog.flag : false} 
                            onChange={()=> dispatch({ type:'SET_FLAG', payload: !newDog.flag })}/>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarMonthIcon sx={{ color: newDog.regular && '#e0603f' }}/>
                          </ListItemIcon>
                          <ListItemText 
                            sx={{ my: 0 }}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: 'medium',
                              }}>
                            Regularly Walked
                          </ListItemText>
                          <Switch
                            edge="end"
                            size="small"
                            checked={newDog.regular ? newDog.regular : false}
                            onChange={()=> dispatch({ type:'SET_REGULAR', payload: !newDog.regular})}/>
                        </ListItem>
                      </List>
                </Card>
              </Grid>
            <Grid item sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="info"
                  onClick={() => goBack()}>Cancel</Button> 
              <Button variant="contained" color="secondary"
                  onClick={() => saveDog()}>Save</Button> 
            </Grid>
            </Grid>
      );
}

export default AddDogFromEdit;

// to do:
// clear dog reducer on submit
//toggle as part of post route
