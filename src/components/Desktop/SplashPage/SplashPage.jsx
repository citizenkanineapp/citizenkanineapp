import { useSelector } from 'react-redux';
import './SplashPage.css';
import AdminNotes from '../AdminNotes/AdminNotes';

//MUI
import { Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

function SplashPage() {
  const user = useSelector((store) => store.user);

  return (
    <Box className="splash_container" sx={{width: '100%', height: '80vh'}}>
      <Grid container sx={{ justifyContent: "start", alignItems: "center", display: "flex", pl: '5vw', mt: 5}}>
        <Card sx={{ width: "45%", pb: 2, mb: 5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://static.vecteezy.com/system/resources/thumbnails/000/210/848/small_2x/abstract-border-collie-dog-portrait-in-low-poly-vector-design.jpg"
              alt="dog with glasses on"
            />
            <CardContent sx={{ justifyContent: "center", alignItems: "center", height: '100%' }}>
              <Typography variant="h5" fontStyle="italic">
                WELCOME BACK, {user.username.toUpperCase()}!
              </Typography>
            </CardContent>
          </CardActionArea>
          {user.id ?
            <AdminNotes  /> : null}
        </Card>
        <Card sx={{ width: "20%", mb: 5}}>
            wildness
        </Card >
      </Grid>
    </Box>
  );
}

export default SplashPage;
