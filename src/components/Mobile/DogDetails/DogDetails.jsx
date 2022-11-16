import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Fab, CardMedia, Card, CardActions, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function DogDetails() {
  const dog = useSelector(store => store.details);


  const vetAddress = { address: '400 S 4th St', city: 'Minneapolis', zipCode: '55415', }
  const clientAddress = { address: '4145 Zarthan AVE S', city: 'St. Louis Park', zipCode: '55416', }
  const history = useHistory();

  const openMap = async (dog) => {
    const destination = encodeURIComponent(`${dog.street} ${dog.zipCode}`);
    // , ${clientAddress.city}
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  const clicktoCall = (number) => {
    window.open(`tel:+${number}`);
  }

  return (
    <Grid container spacing={1} sx={{ justifyContent: 'center', height: '100%' }}>
      {/* NAV BACK TO LIST */}
      <Grid item xs={12}>
        <Button onClick={(event) => history.push('/m/routes')}>BACK</Button>
      </Grid>
      {/* DOG PHOTO */}
      <Grid item xs={5}>
        <Card>
          <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
            <EditIcon />
          </Fab>
          <CardMedia component="img" height='70%' image={dog.image} />
        </Card>
      </Grid>
      {/* DOG NAME */}
      <Grid item xs={5} >
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
            <Typography variant='inherit'>
              {/* {dog.notes} */}
              {/* {dog.notes ? dog.notes : `Click to add a Note for ${dog.name}`} */}
              Total Diva, needs her hair brushed at LEAST once every 4 minutes or she throws a FIT.
            </Typography>
          </Stack>
        </Card>
      </Grid>
      {/* ACCESS INFORMATION */}
      <Grid item xs={10}>
        <Card sx={{ mb: 1 }}>
          <Typography align='center'>Protocol: Side door - Access Code: 12543</Typography>
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
            <a href="tel:+16127159132">(612)-715-9132</a>
            <Button endIcon={<LocalPhoneIcon fontSize='small' />}>
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
            <a href="tel:+16127159132"><LocalPhoneIcon fontSize='small' />(612)-715-9132</a>
            <Button endIcon={<LocalPhoneIcon fontSize='small' />}>
              Call
            </Button>
          </AccordionDetails>
        </Accordion>

      </Grid>



    </Grid>
  );
}

export default DogDetails;
