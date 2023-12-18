// imports

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect} from 'react';
import dayjs from 'dayjs';

// MUI
import { Table, TableContainer, TableHead, Paper, TableBody, TableRow, TableCell, Grid, Typography, Card, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

function DogCount() {
  const dispatch = useDispatch();
  let today = new Date().toISOString();

  const [date, setDate] = useState(today);
  const scheduledDogs = useSelector(store => store.scheduledDogs);
  // kinda screwy here; if page opens on weekend, response object is single client with undefined fields.
  // returns count 0 if dog id = undefined.
  // this edge case is also addressed for mapping in line 77.
  const dogCount = scheduledDogs[0] ? scheduledDogs.reduce((acc, obj) => {
      if (obj.dogs[0].id === undefined) {
        return 0;
      }
      return acc + obj.dogs.length;
    }, 0) : 0;

  useEffect(() => {
    handleDateChange(today);
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    dispatch({ type: 'CHECK_DOG_SCHEDULES', payload: dayjs(date).format('YYYY-MM-DD') });
  }

  const isWeekend = (date) => {
    const day = date.day();
  
    return day === 0 || day === 6;
  };

  return (
    <Grid item xs={6} >
      <Card sx={{mx: 5, mb: 5, display: "flex", flexDirection: "column", alignItems:"center", maxHeight: "75vh" }}>
        <Typography sx={{mt: 1}}> Dogs scheduled for {dayjs(date).format('MM/DD')}: <b>{dogCount}</b> </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            shouldDisableDate={isWeekend}
            onChange={handleDateChange}
            value={date}
            renderInput={(params) => {
              return <TextField {...params} sx={{ mt: 2 ,mx: 2, pb: 1, width: '15vw' }} />
            }}
          />
        </LocalizationProvider>
        <TableContainer component={Paper} >
          <Table stickyHeader size="small" sx={{overflow:'auto'}}>
            <TableHead>
              <TableRow>
                  <TableCell sx={{fontWeight: '800'}}>Client:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Route:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Dogs:</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
            {scheduledDogs && scheduledDogs[0] && scheduledDogs[0].dogs[0].id != undefined && scheduledDogs.map((dog) => (
              <StyledTableRow key={dog.client_id}> 
                <TableCell >{dog.client_last_name}, {dog.client_first_name}</TableCell>
                <TableCell >{dog.route_name}</TableCell>
                <TableCell >{dog.dogs.map(d => (d.name + ', '))}</TableCell>
              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card >
    </Grid>
  )
}

export default DogCount;
