import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import '../../Desktop.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';

//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

function ClientList() {
  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')

  //this route gets all clients to populate client list //
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' })
    dispatch({ type: 'CLEAR_MODALS'})
  }, []);

  //starts OAuth process with QB
  const connectQB = ()=>{
    console.log(location)
   location.href = "http://localhost:5000/api/oauth2/connect_handler";
  }

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

  const onEnterSubmit = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      searchFunction();
    };
  };

  const clearResults = (event) => {
    setSubmittedSearch('');
    setSearch('');
  }

  const clientScheduleView = (client) => {
    console.log('does it hit?')
    dispatch({ type: 'SET_CLIENT', payload: client })
    openModal('ClientSchedule')
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
            onKeyDown={(e) => onEnterSubmit(e)}
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
          <Button onClick={() => dispatch({ type: 'QUICKBOOKS_SYNC'})} variant='contained' color="secondary">QuickBooks Sync</Button>
       
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
                  <TableCell></TableCell>
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
                        <StyledTableRow key={client.client_id} hover> 
                          <TableCell onClick={() => fetchOneClient(client)}>{client.first_name} {client.last_name}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.dogs.map(dog => (dog.dog_name + ' '))}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.phone}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.email}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => clientScheduleView(client)}>
                              <CalendarMonthIcon sx={{ fontSize: 20, color: '#341341' }}/> 
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                    ))}
                  </TableBody>
                :
                  <TableBody>
                    {clientList.map((client ) => (
                        <StyledTableRow key={client.client_id} hover> 
                          <TableCell onClick={() => fetchOneClient(client)}>{client.first_name} {client.last_name}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.dogs.map(
                           (dog, i) => (i === client.dogs.length-1 ? dog.dog_name : dog.dog_name + ' • '))}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.phone}</TableCell>
                          <TableCell onClick={() => fetchOneClient(client)}>{client.email}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => clientScheduleView(client)}>
                              <CalendarMonthIcon sx={{ fontSize: 20, color: '#341341' }}/> 
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                    ))}
                
                </TableBody>

            }
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ mr: 5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={connectQB}>
              <img src="Images/qbButtonShort.png" alt="quickbooks logo"/>
            </Button>
        </Grid>
      
      </Grid>
      {/* <Button onClick={() => openModal('ClientDetails')}>LISA FRANK - SPIKE, FIDO</Button>  opens client details */}
      <ClientModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default ClientList;

