// IMPORTS

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import dayjs from 'dayjs';

// components
import AdminNotes from '../AdminNotes/AdminNotes';
import DogCount from './DogCount';
import './SplashPage.css';

//MUI
import { Box, Grid, Card, CardMedia, CardContent } from '@mui/material';

function SplashPage() {

  const user = useSelector((store) => store.user);

  return (
    <Box className="splash_container" sx={{width: '100%', height: '80vh'}}>
      <Grid container spacing={2} sx={{ alignItems: "start", display: "flex", pl: '5vw', mt: 2}}>
        <Grid item xs={6}>
          <Card sx={{ pb: 2, mb: 5 }}>
            {/* <CardActionArea> */}
              <CardMedia
                component="img"
                height="140"
                image="https://static.vecteezy.com/system/resources/thumbnails/000/210/848/small_2x/abstract-border-collie-dog-portrait-in-low-poly-vector-design.jpg"
                alt="dog with glasses on"
              />
              <CardContent sx={{ justifyContent: "stretch", alignItems: "center", height: '90%' }}>
              </CardContent>
            {/* </CardActionArea> */}
            {user.id ?
              <AdminNotes  /> : null}
          </Card>
        </Grid>
        <DogCount />
        </Grid>
    </Box>
  );
}

export default SplashPage;
