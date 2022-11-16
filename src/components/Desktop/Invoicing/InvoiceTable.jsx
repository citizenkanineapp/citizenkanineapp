import { useSelector } from 'react-redux'
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

function InvoiceTable({month}) {
  const invoiceItems = useSelector(store=>store.invoiceReducer);
  console.log(invoiceItems);
  console.log(month)

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mx: 5, display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight: '800'}}>Invoice Period:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Client:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Service:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Dates of Service:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Quantity:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Service Cost:</TableCell>
                    <TableCell sx={{fontWeight: '800'}}>Total Cost:</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* map over data object.*/}
                  
                  {invoiceItems && invoiceItems.map && invoiceItems.map((item) => (
                      <StyledTableRow key={item.id} >
                        <TableCell>{item.month}/{item.year}</TableCell>
                        <TableCell>{item.first_name} {item.last_name}</TableCell>
                        <TableCell>{item.service.service}</TableCell>
                        <TableCell>{month}: {item.dates.map(date => (date + ', '))}</TableCell>
                        <TableCell>{item.dates.length}</TableCell>
                        <TableCell>{item.service.price}</TableCell>
                        <TableCell>{item.service.price*item.dates.length}</TableCell>

                      </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
}

export default InvoiceTable;