import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Fab, CardMedia, Card, CardActions, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function DogDetails() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState(false);

  const dog = useSelector(store => store.details);

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


  const openMap = async (dog) => {
    const destination = encodeURIComponent(`${dog.street} ${dog.zip}`);
    // , ${clientAddress.city}
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  const clicktoCall = (number) => {
    window.open(`tel:+${number}`);
  }

  return (
    <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
      {/* NAV BACK TO LIST */}
      <Grid item xs={12}>
        <Button onClick={(event) => history.push(`/m/route/${dog.route_id}`)}>BACK</Button>
      </Grid>
      <Grid item xs={5} sx={{ justifyContent: 'center' }}>
        <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
          <EditIcon />
        </Fab>
        <Stack>

        </Stack>
        {dog.image ?
          <Avatar src={dog.image} sx={{ height: '150px', width: '150px' }} />
          :
          <Avatar sx={{ height: '150px', width: '150px' }} >
            {dog.name}
          </Avatar>
        }
      </Grid>
      {/* DOG NAME */}
      <Grid item xs={5}>
        <Stack direction='column' sx={{ justifyContent: 'center' }}>
          <Card sx={{ mb: 1 }}>
            <Typography variant='h4' align='center'>{dog.name}</Typography>
          </Card>
          {/* CLIENT ADDRESS INFORMATION */}
          <Card>
            <Typography align='center' variant='caption'>
              {dog.street}
            </Typography>
            <CardActions>
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
          <Stack direction='row' alignItems='center'>
            {dog.flagged ? <FlagIcon sx={{ fill: '#e0603f' }} /> : null}
            <Typography variant='inherit' onClick={(event) => setEditStatus(true)}>
              {dog.dog_notes ? dog.dog_notes : `Click to add a Note for ${dog.name}`}
            </Typography>
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
            <Typography variant='body2'>Dr. Terry</Typography>
            {/* <a href="tel:+16127159132"><LocalPhoneIcon fontSize='small' />(612)-715-9132</a> */}
            <Button endIcon={<LocalPhoneIcon fontSize='small' />} onClick={(event) => clicktoCall(dog.vet_phone)} >
              Call
            </Button>
          </AccordionDetails>
        </Accordion>

      </Grid>



    </Grid >
  );
}

export default DogDetails;
