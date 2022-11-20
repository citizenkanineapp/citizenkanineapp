import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert'

//MUI
import { Box } from "@mui/system";
import { Button, TextField, Typography, Card, CardActions, CardMedia, Grid, Menu, Divider, MenuItem, IconButton, CardContent,Tooltip } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ClientDetails(){
  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer);
  const dogToEdit = useSelector(store => store.dogEdit);
  
  const back = event => {
    dispatch({type: 'CLEAR_CLIENT'});
    dispatch({ type: 'FETCH_CLIENTS'});
    dispatch({ type: 'SET_MODAL_STATUS' });
    dispatch({type: 'CLEAR_EDIT_DOG'});
  }


  const [flipCard, setFlipCard] = useState(false);
  const [cardIndex, setCardIndex] = useState(-1);

  const showDetails = (index) => {
    setCardIndex(index);
    setFlipCard(!flipCard);
  }

  const deleteClient = (client) => {
    console.log(client);
    swal({
      title: "Are you sure?",
      text: "This will permanently delete this client",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch({ type: 'DELETE_CLIENT', payload: client });
        dispatch({ type: 'SET_MODAL_STATUS' });
        dispatch({ type: 'CLEAR_CLIENT'});

        swal("Client Deleted", {
          icon: "success",
        });
      } 
    });
  }


  const editDog = (dog) =>{
    console.log(dog);
    const clientDogObj = {
      client_id: client.id,
      dog_name: dog.dog_name,
      image: dog.image,
      dog_id: dog.dog_id,
      dog_notes: dog.dog_notes,
      flag: dog.flag,
      regular: dog.regular
    }
    dispatch({type: 'SET_DOG_EDIT', payload: clientDogObj})
    dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditDogForm' });
  }
  
  
  const deleteDog = (dog) => {
    setAnchorEl(null); //closes menu 
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
        dispatch({ type: 'DELETE_DOG', payload: {dog, client} });
      } 
    });
  };
  
  
  //MUI DOG MENU STUFF
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = (event, dog) => {
    console.log(dog);
    setAnchorEl(event.currentTarget);
    console.log(event)
    console.log(dogToEdit);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <Box sx={{m:2, p:2, height: '95%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1.5 }}>

            {/*----------------------- HEADER -----------------------*/}
            <Grid sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between' }}>  
              <Typography variant="h3" >{client.first_name} {client.last_name}</Typography>
              <IconButton onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule' })}>
                <CalendarMonthIcon sx={{ fontSize: 45, color: '#341341' }}/> 
              </IconButton>
            </Grid> {/* display only */}

         
              {/*-------------------- TEXT FIELDS --------------------*/}
            <Grid sx={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', columnGap: 1, py: 2 }}>
          
              <TextField
                focused={false}
                value={client.street} 
                helperText="Street"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
              />
              <TextField
                focused={false}
                value={client.city} 
                helperText="City"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
              <TextField
                focused={false}
                value={client.zip} 
                helperText="Zip"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
              <TextField
                focused={false}
                value={client.notes || ''} 
                helperText="Entry Protocol"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px" }}}
               />
              <TextField
                focused={false}
                value={client.phone} 
                helperText="Phone"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />

              <TextField
                focused={false}
                value={client.email} 
                helperText="Email"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
              <TextField
                focused={false}
                value={client.vet_name || ''} 
                helperText="Vet Name"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
            />
              <TextField
                focused={false}
                value={client.vet_phone || ''} 
                helperText="Vet Phone"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
               />
               <TextField
                focused={false}
                value={client.route_name || ''} 
                helperText="Default Route"  
                size="small" 
                InputProps={{readOnly: true, style: {fontWeight: '800', fontSize: "16px"}}}
                />
            </Grid> {/* value is what you see in the field, read only*/}


          {/*-------------------- DOG PICTURES --------------------*/}
          <Grid sx={{ display: 'flex', justifyContent: "center", flexDirection: 'row', gap: 1 }}>
          {client.dogs && client.dogs.map && client.dogs.map((dog, index) => 
              ((flipCard === true && cardIndex === index) ?
                <Card key={index} sx={{width: '35%', height: '225px', m: 1}}>
                   <CardActions sx={{ justifyContent: 'space-between', ml: 1 }}>
                    <Typography>{dog.dog_name}</Typography>
                    {dog.flag && <FlagCircleIcon sx={{color: '#e0603f'}}/>}
                  </CardActions>
                  <CardContent sx={{height: '80%', bgcolor: '#e5e1df'}} onClick={() => showDetails(index)}>
                    <Typography>{dog.dog_notes}</Typography>
                  </CardContent>
                </Card>
                  :
                <Card key={index} sx={{width: '35%', height: '225px', m: 1}}>
                  <CardActions sx={{ justifyContent: 'space-between', ml: 2, p: 0}}>
                    <Typography>{dog.dog_name}</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton
                        onClick={openMenu}
                        size="small"
                        sx={{ py: 1, borderRadius: 0 }}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu
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
                      </Menu>
                    </Box>
                  </CardActions>
                  <CardMedia component="img"  
                    // sx={{width: 1}}
                    width="100%"
                    alt="client dog photo"
                    onClick={() => showDetails(index)}
                    src={dog.image ? dog.image : 'images/dogfiller.png'}
                    sx={{height: '100%', '&:hover': {filter: 'brightness(90%)'}}}
                    />
                </Card>
              ))}

          </Grid>

          {/*-------------------- BUTTONS --------------------*/}
          <Box display="flex" justifyContent="space-between">
            <Box width="22%" display="flex" justifyContent="space-between">
              <Button variant="outlined" color="info"
                onClick={back}>Back</Button>
            <Tooltip title="Delete Client" placement="top-end">
              <Button variant="contained"
                onClick={() => deleteClient(client.id)}>Delete</Button> 
            </Tooltip>
            </Box>
              <Button variant="contained" color="secondary"
                onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Edit</Button> 
          </Box>

      </Box>
    );
}

export default ClientDetails;