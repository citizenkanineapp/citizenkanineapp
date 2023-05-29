import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import swal from 'sweetalert'
//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Select, Menu, Divider, MenuItem, FormControl, FormHelperText, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';



function ClientForm(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  
  useEffect(()=> {
    dispatch({
      type: 'FETCH_CLIENTS'
    })
  },[])

const saveChanges = event => {
  dispatch({type: 'EDIT_CLIENT', payload: client})
  dispatch({type: 'CLEAR_CLIENT'})
  dispatch({ type: 'SET_MODAL_STATUS' })
  //need to update dogs as well
}

const editDog = (dog) =>{
  // const clientDogObj = {
  //   client_id: client.id,
  //   dog_name: dog.dog_name,
  //   image: dog.image,
  //   dog_id: dog.dog_id,
  //   dog_notes: dog.dog_notes,
  //   flag: dog.flag,
  //   regular: dog.regular
  // }
  dispatch({type: 'SET_DOG_EDIT', payload: dog})
  dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditDogForm' });
}



//MUI DOG MENU STUFF
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const openMenu = (event) => {
  setAnchorEl(event.currentTarget);
  // console.log(event)
};
const handleClose = () => {
  setAnchorEl(null);
};


  return (
        <Box sx={{ m:2, p:2,  height: '95%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1.5 }}>

              {/*----------------------- HEADER -----------------------*/}
              <Grid sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>  
                <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
                <Box sx={{justifyContent:'space-between'}}>
                <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                    <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/>
                </IconButton>
                </Box>
              </Grid>


                {/*-------------------- TEXT FIELDS --------------------*/}
              <Grid sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', columnGap: 1, py: 2 }}>
                <TextField 
                  value={client.street}
                  onChange={(e) => dispatch({type: 'ADD_STREET', payload: e.target.value})}
                  helperText="Street"  
                  disabled
                  size="small"/>
                <TextField 
                  value={client.city}
                  disabled
                  onChange={(e) => dispatch({type: 'ADD_CITY', payload: e.target.value})}
                  helperText="City"  
                  size="small"/>
                <TextField 
                  value={client.zip}
                  disabled
                  onChange={(e) => dispatch({type: 'ADD_ZIPCODE', payload: e.target.value})}
                  helperText="Zip Code"  
                  size="small"/>
                <TextField 
                  value={client.notes || ''} 
                  disabled
                  onChange={(e) => dispatch({type: 'ADD_NOTES', payload: e.target.value})}
                  helperText="Entry Protocol"  
                  size="small"/>
                <TextField 
                  value={client.phone}
                  disabled
                  onChange={(e) => dispatch({type: 'ADD_PHONE', payload: e.target.value})}
                  helperText="Phone"  
                  size="small"/>
                <TextField
                  disabled
                  focused={false}
                  value={client.mobile || ''} 
                  helperText="Mobile"  
                  size="small" 
                  InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
                <TextField 
                  disabled
                  value={client.email}
                  onChange={(e) => dispatch({type: 'ADD_EMAIL', payload: e.target.value})} 
                  helperText="Email"  
                  size="small"/>
                <TextField 
                  value={client.vet_name || ''} 
                  onChange={(e) => dispatch({type: 'ADD_VET_NAME', payload: e.target.value})}
                  helperText="Vet"
                  size="small"/>
                <TextField 
                  value={client.vet_phone || ''}
                  onChange={(e) => dispatch({type: 'ADD_VET_PHONE', payload: e.target.value})}
                  helperText="Vet Contact"  
                  size="small"/>
                <FormControl>
                  <Select
                    labelId="route"
                    size="small"
                    id="route"
                    value={client.route_name || ''}
                    onChange={(event) => {
                      dispatch({type: 'CHANGE_ROUTE', payload: event.target.value})
                    }}
                  >
                    <MenuItem value={'Tangletown'}>Tangletown</MenuItem>
                    <MenuItem value={'Emerson'}>Emerson</MenuItem>
                    <MenuItem value={'Far'}>Far</MenuItem>
                    <MenuItem value={'Misfits'}>Misfits</MenuItem>
                    <MenuItem value={'Unassigned'}>Unassigned</MenuItem>
                </Select>
                <FormHelperText>Default Route</FormHelperText>
              </FormControl>
              </Grid> 


            {/*-------------------- DOG PICTURES --------------------*/}
            <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
              {client.dogs.map((dog, index) => (
                  <Card key={index} sx={{width: '35%', height: '225px', m: 1}}>
                    <CardActions sx={{ justifyContent: 'space-between', ml: 2, py: 0, pr: 0}}>
                      <Typography>{dog.dog_name}</Typography>
                      <IconButton
                        onClick={() => editDog(dog)}
                        size="small"
                        sx={{ ml: 2, py: 1, borderRadius: 0 }}>
                        <CreateOutlinedIcon/>
                      </IconButton>
                      {/* <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                        <MenuItem sx={{gap: 1, py: 0, m: 0 }} onClick={() => editDog(dog)}>Edit</MenuItem>
                          <Divider />
                        <MenuItem sx={{gap: 1, py: 0, m: 0 }} onClick={() => deleteDog(dog)}>Delete</MenuItem>
                      </Menu> */}
                    </CardActions>
                    <CardMedia component="img"  
                      width="100%"
                      alt="client dog photo"
                      src={dog.image ? dog.image : 'Images/dogfiller.png'}
                      sx={{height: 175, '&:hover': {filter: 'brightness(90%)'}}}
                      />
                  </Card>
                ))}
         
            </Grid>

            {/*-------------------- BUTTONS --------------------*/}
            <Box display="flex" justifyContent="space-between">
             
              <Button variant="outlined" color="info"
                onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientDetails'})}>Back</Button>
              <Box width="23%" display="flex" justifyContent="flex-end">
                
                <Button variant="contained" color="secondary"
                      onClick={saveChanges}>Save</Button> 
                {/* <Button variant="contained" color="error"
                  onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogFromEdit'})}>Add Dog</Button>   */}
                 
              </Box>
            </Box>
      </Box>
    );
}

export default ClientForm;