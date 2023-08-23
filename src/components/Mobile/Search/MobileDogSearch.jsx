import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Link, useParams } from 'react-router-dom';


//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function MobileDogSearch() {

  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  // const [dogList, setDogList] = useState(clientList ? createDogList : [])

  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    },[]
  );

  const dogList = [...new Set(clientList.flatMap((client) =>
      client.dogs.map((dog) => ({
        dog_name: dog.dog_name,
        dog_id: dog.dog_id,
        client_firstname: client.first_name,
        client_lastname: client.last_name,
        client_id: client.client_id,
      }))
    ))]
    console.log('doglist',dogList)

  const searchFunction = (event) => {
    setSubmittedSearch(search.toLowerCase())
  }

  const clearResults = (event) => {
    setSubmittedSearch('');
    setSearch('');
  }

  const getDogDetails = (dogID) => {
     history.push(`/m/dog/${dogID}`)
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
          m: 2, mx: 4, 
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
            {submittedSearch ?
              <TableBody>
                {dogList.filter((dog) => {
                  const firstName = dog.client_firstname.toLowerCase();
                  const lastName = dog.client_lastname.toLowerCase();
                  const dogName = dog.dog_name.toLowerCase()

                  //loop through array of dog names and check those
                  if (firstName.includes(submittedSearch) || lastName.includes(submittedSearch) || dogName.includes(submittedSearch) ) {
                    return true;
                  }
                }).map((dog ) => (
                  <StyledTableRow key={dog.dog_id}> 
                    <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.dog_name}</TableCell>
                    <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.client_firstname} {dog.client_lastname}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              :
              <TableBody>
                {dogList.map((dog) => (
                  <StyledTableRow key={dog.dog_id}> 
                    <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.dog_name}</TableCell>
                    <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.client_firstname} {dog.client_lastname}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            }
            </Table>
          </TableContainer >
        </Grid>
      </Grid>
    
    </Box>
  )
}