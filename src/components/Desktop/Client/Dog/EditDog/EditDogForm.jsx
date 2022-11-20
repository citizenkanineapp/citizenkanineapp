import { useSelector, useDispatch } from "react-redux";
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Grid, Typography, Card, Switch, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function EditDogForm(){

  const dispatch = useDispatch();
  const dog = useSelector (store => store.dogEdit)
  const client = useSelector(store => store.clientReducer);

  const dogObject = {
    dog_id: dog.dog_id,
    client_id: dog.client_id
  }

  const saveDogDetails = (event) =>{
    dispatch({type: 'UPDATE_DOG', payload: dog})
    dispatch({ type: 'BACK_TO_VIEW' })
  }
  
  const back = event => {
    dispatch({type: 'CLEAR_NEW_DOG'})
    dispatch({ type: 'BACK_TO_VIEW'})
  }
 
    return (
      <Grid container sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'column', gap: 1}}>

      <Grid item>
        <Typography variant="h5">Edit Dog</Typography>
      </Grid>

      <Grid item sx={{ height: '85%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1}}>
          <Card sx={{width: '35%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, pt: 4}}>

                    <Box sx={{ width: "90%", height: "80%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>  {/*need to figure out aspect ratio and conditional rendering to change into image upload for editing image*/}
                      <Avatar
                        sx={{width: '80%', height: '100%'}}
                        src={dog.image ? dog.image : 'images/dogfiller.png'}/>
                    </Box>
                    {/*<ImageUpload />*/}

                    <TextField 
                      sx={{ width: '95%' }}
                      value={dog.dog_name}  
                      onChange={(e) => dispatch({type: 'UPDATE_DOG_NAME', payload: e.target.value})}
                      helperText="Name"  
                      size="small" 
                      /> 

                    <TextField 
                      sx={{ width: '95%' }}
                      value={dog.dog_notes || ''}
                      onChange={(e) => dispatch({type: 'UPDATE_DOG_NOTES', payload: e.target.value})}
                      helperText="Notes"  
                      size="small" 
                      multiline rows={3}
                      /> 

                    <List sx={{ width: '100%' }}>
                      <ListItem>
                        <ListItemIcon>
                          <FlagCircleIcon sx={{ color: dog.flag && '#e0603f' }}/>
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
                          checked={dog.flag ? dog.flag : false} 
                          onChange={()=> dispatch({ type:'SET_EDIT_FLAG', payload: !dog.flag })}/>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonthIcon sx={{ color: dog.regular && '#e0603f' }}/>
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
                          checked={dog.regular ? dog.regular : false}
                          onChange={()=> dispatch({ type:'SET_EDIT_REGULAR', payload: !dog.regular})}/>
                      </ListItem>
                    </List>
              </Card>
            </Grid>

            {/*-----------BUTTONS----------*/}
            <Grid item sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="info"
                      onClick={back}>Cancel</Button> 
                <Button variant="contained" color="secondary"
                    onClick={() => saveDogDetails()}>Save</Button>
            </Grid>
          </Grid>
      );
}

export default EditDogForm;
