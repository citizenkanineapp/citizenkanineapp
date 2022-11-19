import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import '../../Desktop.css';

//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';

//MUI
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Box, Divider, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledTableRow = styled(TableRow)(({ theme }) => ({

  // '&.MuiTableRow-root':{
  //   backgroundColor: '#edf2f4',
  // },
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: '#a3bbc4'
  // },

}));


//if search results map through that list 
//else map through clients 


function ClientList() {
  const clientList = useSelector(store => store.clientsReducer);
  const searchResults = useSelector(store => store.searchReducer)
  const dispatch = useDispatch();

  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

  //this route gets all clients to populate client list //
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' })
    dispatch({ type: 'CLEAR_MODALS'})
  }, []);

  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  const fetchOneClient = (client) => {
    console.log(client)
    dispatch({type: 'SET_CLIENT', payload: client })
    openModal('ClientDetails')
  }

  const searchFunction = (event) => {
    setSubmittedSearch(search.toLowerCase())
  }

  const clearResults = (event) => {
    setSubmittedSearch('');
    setSearch('');
  }



  return (
    <Box className="desktop_container" 
        sx={{ height: '88%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-start', 
              alignItems: 'center',
              gap: 2 
              }}>
      <Grid container 
          sx={{ m: 2, mx: 4, 
                pt: 6,
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'center', 
                width:'80%', gap: 2 
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
        <Button size="small" variant="contained" color="secondary" onClick={() => clearResults()}>Clear</Button> :

          <Button size="small" variant="contained" color="secondary" onClick={() => searchFunction()}>Search</Button>
       }
          <Button onClick={() => openModal('AddClient')} variant='contained' color='secondary' size="small">Add Client</Button>
       
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} 
            sx={{ mx: 5, 
                  display:'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center' 
                  }}>
          {/* TABLE OPTION */}
          <TableContainer component={Paper} sx={{width: '70%', height: '65vh'}}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: '800'}}>Name:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Dogs:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Phone</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Email</TableCell>
                </TableRow>
              </TableHead>
              {submittedSearch ? 
                <TableBody
                    >  
                    {clientList
                      .filter((client) => {
                        const firstName = client.first_name.toLowerCase()
                        const lastName = client.last_name.toLowerCase()

                        //loop through array of dog names and check those
                        if (firstName.includes(submittedSearch)) {
                          return true;
                        }
                        if (lastName.includes(submittedSearch)) {
                          return true;
                        }
                        for(let dog of client.dogs){
                          const dogName = dog.dog_name.toLowerCase()
                          if(dogName.includes(submittedSearch)){
                            return true;
                          }
                        }
                      })
                      .map((client ) => (
                        <StyledTableRow key={client.id} hover onClick={() => fetchOneClient(client)}> 
                          <TableCell>{client.first_name} {client.last_name}</TableCell>
                          <TableCell>{client.dogs.map(dog => (dog.dog_name + ' '))}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.email}</TableCell>
                        </StyledTableRow>
                    ))}
                  </TableBody>
                :
                  <TableBody>
                    {clientList.map((client ) => (
                        <StyledTableRow key={client.id} hover onClick={() => fetchOneClient(client)}> 
                          <TableCell>{client.first_name} {client.last_name}</TableCell>
                          <TableCell>{client.dogs.map((dog, i) => (i === client.dogs.length-1 ? dog.dog_name : dog.dog_name + ' • '))}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.email}</TableCell>
                        </StyledTableRow>
                    ))}
                
                </TableBody>

            }
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
      {/* <Button onClick={() => openModal('ClientDetails')}>LISA FRANK - SPIKE, FIDO</Button>  opens client details */}
      <ClientModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default ClientList;

