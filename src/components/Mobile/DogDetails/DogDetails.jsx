import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Stack, CardContent, Card, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';


function DogDetails() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button>BACK</Button>
      </Grid>
      <Grid item xs={6}>
        <Paper>DOG PHOTO</Paper>
      </Grid>
      <Grid item xs={6}>
        <Stack direction='column'>
          <Card>DOG NAME</Card>
          <Card>DOG ADDRESS</Card>
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