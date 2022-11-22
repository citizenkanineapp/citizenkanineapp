import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Button, TextField, Typography, Card, CardActions, Box, CardContent, Switch, CardMedia, Grid, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';


import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function AddDogForm (){
  const dispatch = useDispatch();

  const client = useSelector(store => store.clientReducer)
  const dogs = useSelector(store => store.dogReducer)
  

  const back = () => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'})
    dispatch({type: 'CLEAR_DOGS'});
  }

  const checkInputs = () => {
   if(dogs.filter(dog => dog.dog_name ===  undefined || dog.dog_name ===  '').length === 0){
    // console.log('All required dog inputs are here!');
    setTimeout(() => {
      // console.log("Delayed for 1 seconds");
      dispatch({type: 'ADD_CLIENT', payload: {...client, dogs: dogs}}); //waiting for cloudinary url to return before adding client
      }, "1000");
    dispatch({type: 'SET_MODAL_STATUS'});
    };
  }

  const saveClient = event => {
    dispatch({type: 'ADD_CLIENT', payload: client});
    dispatch({type: 'SET_MODAL_STATUS', payload: 'ClientList'});
    dispatch({type: 'CLEAR_SCHEDULE'});
    dispatch({type: 'CLEAR_CLIENT'});
    dispatch({type: 'CLEAR_DOGS'});
    //need to add clear client?
  }



    return (
      <Grid container sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'column', gap: 1}}>
        <Grid item>
          <Typography variant="h5">Add Dogs</Typography>
        </Grid>
        <Grid item sx={{ height: '85%', width: '100%', display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1}}>
            {dogs.map((singleDog, index)=> (
            <Card key={index} sx={{width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <IconButton color="info" size="small" sx={{ borderRadius: 0, mr: 1 }}
                        onClick={() => dispatch({ type: 'DELETE_DOG_INPUT', payload: index })}>
                        <CloseIcon/>
                      </IconButton>
                    </Box>

                    <ImageUpload index={index} />

                    <TextField 
                      sx={{ width: '95%' }}
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
                    helperText="Name"  
                    size="small" 
                    /> 

                    <TextField 
                      sx={{ width: '95%' }}
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
                      multiline rows={3}
                      /> 

                    <List sx={{ width: '100%' }}>
                      <ListItem>
                        <ListItemIcon>
                          <FlagCircleIcon sx={{ color: dogs[index].flag && '#e0603f' }}/>
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
                          checked={dogs[index].flag} 
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
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonthIcon sx={{ color: dogs[index].regular && '#e0603f' }}/>
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
                      </ListItem>
                    </List>

              </Card>
              ))}
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="info"
            onClick={back}>Back</Button> 
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Button variant="contained" color="primary" aria-label="add" 
              onClick={()=> {dispatch({type: 'ADD_DOG_INPUT'})}}>Add Dog</Button>
            <Button variant="contained" color="success"
              onClick={checkInputs}>Submit</Button> 
          </Box>
        </Grid>
   
      </Grid>
      );
}

export default AddDogForm;
