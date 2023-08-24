import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';


//MUI
import { TableFooter, Paper, Stack, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import ResultsSearchDogs from '../../AllPages/SearchResults/ResultsSearchDogs';
import ResultsAllDogs from '../../AllPages/SearchResults/ResultsAllDogs';
import ResultsDogByDay from '../../AllPages/SearchResults/ResultsDogByDay';

export default function MobileDogSearch() {

  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [weekSearch, setWeekSearch] = useState('')
  // const [dogList, setDogList] = useState(clientList ? createDogList : [])

  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
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
      mon: client.monday,
      tue: client.tuesday,
      wed: client.wednesday,
      thu: client.thursday,
      fri: client.friday
    }))
  ))];
    // console.log('doglist',dogList)

  const searchFunction = (event) => {
    setSubmittedSearch(search.toLowerCase())
  }

  const clearResults = (event) => {
    setWeekSearch('');
    setSubmittedSearch('');
    setSearch('');
  }

  const searchDogByDay = (day) => {
    setSearch('');
    setSubmittedSearch('');
    setWeekSearch(day);
  }

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

                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            { submittedSearch && dogList.length > 0 ?
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