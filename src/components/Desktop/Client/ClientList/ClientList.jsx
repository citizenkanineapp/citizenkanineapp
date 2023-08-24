import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import '../../Desktop.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';
import ResultsSearchClients from '../../../AllPages/SearchResults/ResultsSearchClients';
import ResultsAllClients from '../../../AllPages/SearchResults/ResultsAllClients';


//MUI
import { Paper, Table, Switch, TableBody, TableContainer, Stack, TableHead, TableRow, TableCell, Box,  IconButton, Typography, Button, Grid, TextField } from '@mui/material';

const redirect = process.env.REACT_APP_REDIRECT;
console.log(redirect);
console.log(process.env)

export default function ClientList() {
  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('clients');
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [imageSrc, setImageSrc] = useState('Images/qbButtonMed.png')

  //this route gets all clients to populate client list //
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' })
    dispatch({ type: 'CLEAR_MODALS'})
  }, []);


  // creates flat list of all dogs for dog search feature
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

  //starts OAuth process with QB
  const connectQB = ()=>{
    location.href = redirect;
  }

  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
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


  return (
    <Box className="desktop_container" 
        sx={{ height: '88%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-start', 
              alignItems: 'center',
              gap: 2 
              }}>
     
      { searchType === 'clients' ?
      <Button sx={{pt: 2, fontWeight: '800'}} onClick={()=>setSearchType('dogs')}>Order by dog</Button>
      :
      <Button sx={{pt: 2, fontWeight: '800'}} onClick={()=>setSearchType('clients')}>Order by client</Button>
      }
      
      <Grid container 
          sx={{ mb: 2, mx: 4, 
                // pt: 2,
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
          <TableContainer component={Paper} sx={{width: '80%', height: '65vh'}}>
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
              { searchType==='clients' ? 
                (
                  (submittedSearch) ?
                  <ResultsSearchClients clientList={clientList} openModal={openModal} />
                  :
                  <ResultsAllClients clientList={clientList} openModal={openModal} />
                ) : (searchType === 'dogs') ?
                (
                  (submittedSearch) ?
                  <div>PSYCH!</div>
                  :
                  <div>PSYCH OUT!</div>
                ) : <div>you're missing something</div>

              }
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ mr: 5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={connectQB}>
              <img 
              src={imageSrc} alt="quickbooks logo"
              onMouseEnter={() => setImageSrc('Images/qbButtonMedHover.png')}
              onMouseOut={() => setImageSrc('Images/qbButtonMed.png')}/>
            </Button>
        </Grid>
      
      </Grid>
      <ClientModal /> {/* only open when button is pressed */}
    </Box>
  );
}

