// IMPORTS

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import dayjs from 'dayjs';

// components
import AdminNotes from '../AdminNotes/AdminNotes';
import './SplashPage.css';

//MUI
import { Box, Grid, Typography, Card, TextField, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function SplashPage() {

  const dispatch = useDispatch();
  let today = new Date().toISOString();

  const user = useSelector((store) => store.user);
  const [date, setDate] = useState(today);
  const dogCount = useSelector(store => store.scheduledDogs);
  useEffect(() => {
    handleDateChange(today);
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    dispatch({ type: 'CHECK_DOG_SCHEDULES', payload: dayjs(date).format('YYYY-MM-DD') });
  }

  return (
    <Box className="splash_container" sx={{width: '100%', height: '80vh'}}>
      <Grid container spacing={2} sx={{ alignItems: "center", display: "flex", pl: '5vw', mt: 5}}>
        <Grid item xs={6}>
          <Card sx={{ pb: 2, mb: 5 }}>
            {/* <CardActionArea> */}
              <CardMedia
                component="img"
                height="140"
                image="https://static.vecteezy.com/system/resources/thumbnails/000/210/848/small_2x/abstract-border-collie-dog-portrait-in-low-poly-vector-design.jpg"
                alt="dog with glasses on"
              />
              <CardContent sx={{ justifyContent: "stretch", alignItems: "center", height: '100%' }}>
              </CardContent>
            {/* </CardActionArea> */}
            {user.id ?
              <AdminNotes  /> : null}
          </Card>
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={4}>
          <Card sx={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <Typography sx={{mt: 1}}> Dogs scheduled for {dayjs(date).format('MM/DD')}: {dogCount} </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={handleDateChange}
                value={date}
                renderInput={(params) => {
                  return <TextField {...params} sx={{ mt: 2 ,mx: 2, pb: 1, width: '20vw' }} />
                }}
              />
            </LocalizationProvider>
          </Card >
        </Grid>
      </Grid>
    </Box>
  );
}

export default SplashPage;
