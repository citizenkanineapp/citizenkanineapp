import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


function DogDetails() {
  const schoolAddress = { address: '400 S 4th St', city: 'Minneapolis', zipCode: '55415', }
  const clientAddress = { address: '4145 Zarthan AVE S', city: 'St. Louis Park', zipCode: '55416', }
  const history = useHistory();

  const openMap = async (clientAddress) => {
    const destination = encodeURIComponent(`${clientAddress.address} ${clientAddress.zipCode}, ${clientAddress.city}`);
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button>BACK</Button>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
            <EditIcon />
          </Fab>
          <CardMedia component="img" height='70%' image="https://www.rd.com/wp-content/uploads/2020/11/GettyImages-889552354-e1606774439626.jpg" />
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Stack direction='column'>
          <Card>
            <Typography variant='h3'>RUFUS</Typography>
          </Card>
          <Card onClick={(event) => openMap(clientAddress)}>DOG ADDRESS</Card>
          <Card onClick={(event) => openMap(schoolAddress)}>VET ADDRESS</Card>


          <Card><a href="tel:+17637447704">CALL</a></Card>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Card>ACCESS DETAILS</Card>
      </Grid>
      <Grid item xs={12}>
        OWNER DETAILS
      </Grid>
      <Grid item xs={12}>
        VET DETAILS
      </Grid>
      <Grid>
        DOG NOTES / WARNING ICON
      </Grid>
    </Grid>


  );
}

export default DogDetails;