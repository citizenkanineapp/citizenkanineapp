import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Accordion, AccordionSummary, AccordionDetails, Fab, CardMedia, Card, CardActions, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MobileImageUpload from './MobileImageUpload';


function DogDetails() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // local state to manage dog note editing ability
  const [editStatus, setEditStatus] = useState(false);

  // specific dog details - fetched by the useEffect
  const dog = useSelector(store => store.details);
  const route = useSelector(store => store.routeReducer);
  // modal open and close status
  const status = useSelector(store => store.modal.status);

  // on page load fetch dog details (by dog ID) using the number provided in the URL
  useEffect(() => {
    dispatch({
      type: 'FETCH_DOG_DETAILS',
      payload: params.id
    })

    return () => {
      dispatch({
        type: 'CLEAR_DETAILS'
      })
    }
  }, [params.id])

  
//this routes the user back to the route for the day
  const backFunction = (event) => {
    const currentRoute  = route.filter(thisDog => thisDog.dog_id === dog.dog_id)
    const currentRouteId = currentRoute[0].route_id
    history.push(`/m/route/${currentRouteId}`)
  }

  // while we were not able to get map display functionality, clicking this should open either the google maps app or a webpage 
  const openMap = async (dog) => {
    // takes in address details and encodes them into URI 
    const destination = encodeURIComponent(`${dog.street} ${dog.zip}`);
    // based off of street address and city it pulls up a google map page
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }


  // this is a button that allows for an employee to click and prompt for a phone call to a given number
  const clicktoCall = (number) => {
     // removes any symbols and letters from the phone number
    let nosymbols = number.replace(/[^0-9 ]/g, '');
    // removes white space from number
    let readyNumber = nosymbols.trim();
    // sends prompt to call number
    location.href = `tel:+1${readyNumber}`;
  }

  // function that allows an employee to add notes to a dog
  const submitNote = (action) => {
    console.log(dog.dog_notes, dog.dog_id);
    let updatedDog = { id: dog.dog_id, note: dog.dog_notes };
    dispatch({ type: 'UPDATE_DOG_NOTE', payload: updatedDog });
    setEditStatus(false);
  }

  return (
    <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
      {/* NAV BACK TO LIST */}
      <Grid item xs={12}>
        {/* <Button onClick={(event) => history.push(`/m/route/${dog.route_id}`)}>BACK</Button> */}
        <Button onClick={(event) => backFunction(event)}>BACK</Button>
      </Grid>
      <Grid item xs={5} sx={{ justifyContent: 'center' }}>
        <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
          <EditIcon onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })} />
        </Fab>
        <Stack>

        </Stack>
        {dog.image ?
          <Avatar src={dog.image || ''} sx={{ height: '150px', width: '150px' }} />
          :
          <Avatar sx={{ height: '150px', width: '150px' }} >
            {dog.name}
          </Avatar>
        }
      </Grid>
      {/* DOG NAME */}
      <Grid item xs={5}>
        <Stack direction='column' sx={{ justifyContent: 'center', textAlign: 'center' }}>
          <Card sx={{ mb: 1 }}>
            <Typography variant='h5' align='center' sx={{ pt: 2 }}>{dog.name}</Typography>
          </Card>
          {/* CLIENT ADDRESS INFORMATION */}
          <Card>
            <Typography variant='caption'>
              {dog.street}
            </Typography>
            <CardActions sx={{ justifyContent: 'center' }} >
              <Button variant='contained' endIcon={<DirectionsIcon />} size='small' onClick={(event) => openMap(dog)}>
                Directions
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </Grid>
      {/* DOG NOTES & CONDITIONAL FLAG */}
      <Grid item xs={10}>
        <Card>
          <Stack direction='row' alignItems='center' sx={{ mt: 1, p: 2 }}>
            {dog.flag ? <FlagIcon sx={{ fill: '#e0603f' }} /> : null}
            {editStatus ?
              <>
                <TextField
                  value={dog.dog_notes || ''}
                  onChange={(event) => dispatch({ type: 'EDIT_DOG_NOTE', payload: event.target.value })}
                  label='Dog Notes'
                  fullWidth
                  multiline
                  Rows={5}
                  InputProps={{ margin: 'dense' }}

                  helperText="click to edit notes"
                />
                <Button onClick={(event) => submitNote()}>Submit</Button>

              </>
              :
              <TextField value={dog.dog_notes || ''}
                label='Dog Notes'
                fullWidth
                multiline
                Rows={5}
                helperText="click to edit notes"
                InputProps={{ readOnly: true }}
                sx={{ fieldset: { borderColor: 'transparent', border: '0' } }}
                onClick={(event) => setEditStatus(true)} />
            }
          </Stack>
        </Card>
      </Grid>
      {/* ACCESS INFORMATION */}
      <Grid item xs={10}>
        <Card sx={{ mb: 1 }}>
          <Typography align='center'>{dog.client_protocol || 'No protocol on File'}</Typography>
        </Card>
        {/* OWNER INFORMATION & CALL BUTTON */}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography>Client Info:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2'> {dog.first_name} {dog.last_name}</Typography>
            {/* <a href="tel:+16127159132">(612)-715-9132</a> */}
            <Button endIcon={<LocalPhoneIcon fontSize='small' />} onClick={(event) => clicktoCall(dog.phone)}>
              Call
            </Button>
            {dog.mobile? 
            <>
                <Typography variant='body2'> Second Number</Typography>
                <Button endIcon={<LocalPhoneIcon fontSize='small' />} onClick={(event) => clicktoCall(dog.mobile)}>
                  Call
                </Button>  
            </>
          : null}

          </AccordionDetails>
        </Accordion>
        {/* VET INFORMATION & CALL BUTTON */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Vet Info:</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {dog.vet_name || dog.vet_phone ? 
          <>
            <Typography variant='body2'>{dog.vet_name || ''}</Typography>
            <Button endIcon={<LocalPhoneIcon fontSize='small' />} onClick={(event) => clicktoCall(dog.vet_phone)} >
              Call
            </Button>
          </>
            :
            <Typography sx={{mb: 2}} variant='body2'>No Vet on File</Typography>
          }
          </AccordionDetails>
        </Accordion>

      </Grid>
      {/* Modal for mobile photo upload */}
      <Modal open={status} sx={{ mt: 5.5, ml: 4.2 }} >
        <Grid item xs={12}>
          <MobileImageUpload id={dog.dog_id} />

        </Grid>
      </Modal>


    </Grid >
  );
}

export default DogDetails;
