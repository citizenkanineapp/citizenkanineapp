import { useSelector } from 'react-redux'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
let localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);

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

function InvoiceTable() {
  const invoiceItems = useSelector(store=>store.invoiceReducer);
  // grabs month MMM format for 'dates of service' column
  let months;
  let month;
  if (invoiceItems.length>0) {
    months = dayjs.monthsShort();
    month = months[invoiceItems[0].month-1];
  }

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
                  {invoiceItems && invoiceItems.map && invoiceItems.map((item) => (
                      <StyledTableRow key={item.id} >
                        <TableCell key={item.id} >{item.month}/{item.year}</TableCell>
                        <TableCell key={item.id} >{item.first_name} {item.last_name}</TableCell>
                        <TableCell key={item.id} >{item.service.service}</TableCell>
                        <TableCell key={item.id} >{month}: {item.dates.map(date => (date + ', '))}</TableCell>
                        <TableCell key={item.id} >{item.dates.length}</TableCell>
                        <TableCell key={item.id} >{item.service.price}</TableCell>
                        <TableCell key={item.id} >{item.service.price*item.dates.length}</TableCell>
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