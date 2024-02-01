import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI
import { TableFooter, Paper, Stack, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ResultsSearchDogs from '../../AllPages/SearchResults/ResultsSearchDogs';
import ResultsAllDogs from '../../AllPages/SearchResults/ResultsAllDogs';
import ResultsDogByDay from '../../AllPages/SearchResults/ResultsDogByDay';
import ResultsScheduledDogs from '../../AllPages/SearchResults/ResultsScheduledDogs';

export default function MobileDogSearch() {

  const clientList = useSelector(store => store.clientsReducer);
  const dogListToday = useSelector(store => store.scheduledDogs)
  const dispatch = useDispatch();
  let today = new Date().toISOString();

  const [date, setDate] = useState(today);
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [weekSearch, setWeekSearch] = useState('');
  const [dogCount, setDogCount] = useState('');
  
  // let dogCount = dogListToday[0] && dogListToday[0].dog_id != undefined ? dogListToday.length : 0;


  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    setDogCount(dogListToday[0] && dogListToday[0].dog_id != undefined ? dogListToday.length : 0)
    },[]
  );

  
  const daysOfWeek = ['mon','tue','wed','thu','fri'];
  // console.log(daysOfWeek)
  const dogList = [...new Set(clientList.flatMap((client) =>
    client.dogs.map((dog) => ({
      dog_name: dog.dog_name,
      dog_id: dog.dog_id,
      client_firstname: client.first_name,
      client_lastname: client.last_name,
      client_id: client.client_id,
      route: client.route_name,
      mon: client.monday,
      tue: client.tuesday,
      wed: client.wednesday,
      thu: client.thursday,
      fri: client.friday
    }))
  ))];

  // console.log('doglist',dogList)

  const searchFunction = (event) => {
    setDate('');
    setSubmittedSearch(search.toLowerCase());
    setDogCount(undefined)
  }

  const clearResults = (event) => {
    setDate('');
    setWeekSearch('');
    setSubmittedSearch('');
    setSearch('');
  }

  const searchDogByDay = (day) => {
    setDate('');
    setSearch('');
    setSubmittedSearch('');
    setWeekSearch(day);
    setDogCount(undefined)
  }

  const handleDateChange = (date) => {
    setDate(date);
    dispatch({ type: 'CHECK_DOG_SCHEDULES', payload: dayjs(date).format('YYYY-MM-DD') });
    setDogCount(dogListToday[0] && dogListToday[0].dog_id != undefined ? dogListToday.length : 0);
  }

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <Box className="mobile_container"
      sx={{ 
        height: '88%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        gap: 2 
      }}>
      <Grid container 
        sx={{
          mt: 1, mb:1, mx: 4, 
          pt: 2,
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          width:'90%', gap: 2 
        }}>
        <TextField
          value={search || ''}
          onChange={(e) => setSearch(e.target.value)}
          label="Search Clients & Dogs"
          variant="filled"
          size="small"
          color="secondary"
          sx={{width: '60%'}}
        />
        {submittedSearch ?
        <Button onClick={() => clearResults()} variant="contained" color="secondary">Clear</Button> :
        <Button onClick={() => searchFunction()} variant="contained" color="secondary">Search</Button>
       }
      </Grid>
      <Stack sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <Typography> <b>{dogCount}</b> Dogs scheduled </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              shouldDisableDate={isWeekend}
              onChange={handleDateChange}
              value={date}
              renderInput={(params) => {
                return <TextField {...params} sx={{ mt: 2 ,mx: 2, pb: 1, width: '30vw' }} />
              }}
            />
        </LocalizationProvider>
      </Stack>
      <Stack sx={{display:'flex', flexDirection:'row'}}>
        {daysOfWeek.map((day,i) => (
          <Button key={i} onClick={()=>searchDogByDay(day)}>{day}</Button>
        ))}
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}
          sx={{
            mx: 5,
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
          }}
        >
          {/* TABLE OPTION */}
          <TableContainer component={Paper} sx={{width: '100%', height: '65vh'}}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: '800'}}>Dog:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Client:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Route:</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            { date && dogListToday.length > 0 ?
              <ResultsScheduledDogs dogList={dogListToday} />
                : submittedSearch && dogList.length > 0 ?
                  <ResultsSearchDogs dogList={dogList} submittedSearch={submittedSearch} />
                  : (weekSearch && dogList.length > 0  ) ?
                    <ResultsDogByDay dogList={dogList} weekSearch={weekSearch} />
                    : (dogList.length > 0 ) ?
                    <ResultsAllDogs dogList={dogList} />
                    : null
            }
            </Table>
          </TableContainer >
        </Grid>
      </Grid>
    
    </Box>
  )
}