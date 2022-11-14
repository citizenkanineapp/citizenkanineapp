import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
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

function CSVDateView() {
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Period:</TableCell>
                  <TableCell>Client:</TableCell>
                  <TableCell>Date of Service:</TableCell>
                  <TableCell>Dog:</TableCell>
                  <TableCell>Service:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* map over data object.*/}
                {/*
                {clientList && clientList.map && clientList.map((client) => (
                    <StyledTableRow key={client.id} hover onClick={() => fetchOneClient(client)}> 
                      <TableCell>{client.first_name} {client.last_name}</TableCell>
                      <TableCell>{client.address}</TableCell>
                      <TableCell>{client.dogs.length}</TableCell>
                      <TableCell>{client.dogs.map(dog => (dog.dog_name + ' '))}</TableCell>
                    </StyledTableRow>
                ))} */}
              </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CSVDateView;