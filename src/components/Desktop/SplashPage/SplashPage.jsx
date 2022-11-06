import React from 'react';
import {useSelector} from 'react-redux';

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


function SplashPage() {
  const user = useSelector((store) => store.user);

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center" height={"80vh"}>
    <Card sx={{ width: "30%", height: "60%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://static.vecteezy.com/system/resources/thumbnails/000/210/848/small_2x/abstract-border-collie-dog-portrait-in-low-poly-vector-design.jpg"  
          alt="dog with glasses on"
        />
        <CardContent justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Typography gutterBottom variant="h5" component="div">
            WELCOME BACK, SARAH!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dog fact of the day: A dog’s nose print is unique, much like a person’s fingerprint.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  );
}

export default SplashPage;
