import { useSelector, useDispatch } from "react-redux";

//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';

//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

// NO THESE COLORS AREN'T FINAL BUT WE DEF SHOULD HAVE SOME VISUAL CHANGE
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function ClientList() {
  const dispatch = useDispatch();

  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }


  return (
    <Box >
      <h1>ClientList</h1>
      <Grid container spacing={2} sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Grid item xs={10}>
          <TextField
            label="Search Clients & Dogs"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button size="large" variant="contained" color="secondary">
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mx: 5 }}>
          {/* TABLE OPTION */}
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name:</TableCell>
                  <TableCell>Address:</TableCell>
                  <TableCell># Dogs</TableCell>
                  <TableCell>Dogs:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* EXAMPLE ROW THAT WOULD BE MAPPED */}
                <StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow>
                {/* END OF EXAMPLE ROW */}

                <StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow>
                <StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow><StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow><StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow>
                <StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow>
                <StyledTableRow hover onClick={() => openModal('ClientDetails')}>
                  <TableCell>Lisa Frank</TableCell>
                  <TableCell>1234 Gates of Hell Dr.</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>Spike, Fido</TableCell>
                </StyledTableRow>




              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ mr: 5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => openModal('AddClient')} variant='contained' color='secondary'  >Add Client</Button>
        </Grid>
      </Grid>

      {/* <Button onClick={() => openModal('ClientDetails')}>LISA FRANK - SPIKE, FIDO</Button>  opens client details */}


      <ClientModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default ClientList;

