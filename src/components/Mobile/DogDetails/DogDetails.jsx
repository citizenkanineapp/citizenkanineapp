import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';


function DogDetails() {

  const dog = { flagged: true };
  const vetAddress = { address: '400 S 4th St', city: 'Minneapolis', zipCode: '55415', }
  const clientAddress = { address: '4145 Zarthan AVE S', city: 'St. Louis Park', zipCode: '55416', }
  const history = useHistory();

  const openMap = async (clientAddress) => {
    const destination = encodeURIComponent(`${clientAddress.address} ${clientAddress.zipCode}, ${clientAddress.city}`);
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      
       {/* HEADER */}
       <Grid item sx={{ height: '5%', width: '100%',  bgcolor: '#e0923f' }}>
        <Typography sx={{ color: 'transparent' }}>PACK CENTRAL</Typography>
      </Grid>

      {/* NAV BACK TO LIST */}
      <Grid item xs={12}>
        <Button>BACK</Button>
      </Grid>
      {/* DOG PHOTO */}
      <Grid item xs={5}>
        <Card>
          <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
            <EditIcon />
          </Fab>
          <CardMedia component="img" height='70%' image="https://www.rd.com/wp-content/uploads/2020/11/GettyImages-889552354-e1606774439626.jpg" />
        </Card>
      </Grid>
      {/* DOG NAME */}
      <Grid item xs={5}>
        <Stack direction='column'>
          <Card sx={{ mb: 1 }}>
            <Typography variant='h4' align='center'>RUFUS</Typography>
          </Card>
          {/* CLIENT ADDRESS INFORMATION */}
          <Card onClick={(event) => openMap(clientAddress)}>
            <Typography align='center' variant='caption'>
              {clientAddress.address} {clientAddress.city} {clientAddress.zipCode}
            </Typography>
          </Card>
        </Stack>
      </Grid>
      {/* ACCESS INFORMATION */}
      <Grid item xs={10}>
        <Card>
          <Typography align='center'>Side door - Access Code: 12543</Typography>
        </Card>
      </Grid>
      {/* OWNER INFORMATION & CALL BUTTON */}
      <Grid item xs={10}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Owner Info:</Typography>
            <Typography variant='body2'> Dolly Parton | <a href="tel:+17637447704">(763)-744-7704</a></Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* VET INFORMATION & CALL BUTTON */}
      <Grid item xs={10}>
        {/* <Card onClick={(event) => openMap(vetAddress)}> */}
        <Card>
          <CardContent>
            <Typography variant='h6'>Vet Info:</Typography>
            <Typography variant='body2'>Dr. Terry | <a href="tel:+16127159132">(612)-715-9132</a> </Typography>
            <Typography variant='caption'>{vetAddress.address} {vetAddress.city} {vetAddress.zipCode}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* DOG NOTES & CONDITIONAL FLAG */}
      <Grid item xs={10}>
        <Card>
          <Stack direction='row' alignItems='center'>
            {dog.flagged ? <FlagIcon sx={{ fill: '#e0603f' }} /> : null}
            <Typography variant='inherit'>
              Rufus need time to warm up to new friends
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DogDetails;