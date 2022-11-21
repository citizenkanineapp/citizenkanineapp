import { useSelector } from 'react-redux'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
let localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&.MuiTableRow-root:hover': {
    backgroundColor: '#accad5',
  },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: '#a3bbc4'
  // },

}));

function InvoiceTable({ monthsShort }) {
  const invoiceItems = useSelector(store => store.invoiceReducer);
  // grabs month MMM format for 'dates of service' column
  // let months;
  let month;
  if (invoiceItems.length > 0) {
    // months = dayjs.monthsShort();
    month = monthsShort[invoiceItems[0].month - 1];
  }
  dayjs().format('MM/DD/YYYY');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ mx: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TableContainer component={Paper} sx={{ width: '80%', height: '70vh' }}>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: '800' }}>Invoice Period:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Client:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Service:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Dates of Service:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Quantity:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Service Cost:</TableCell>
                <TableCell sx={{ fontWeight: '800' }}>Total Cost:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceItems && invoiceItems.map && invoiceItems.map((item) => (
                <StyledTableRow key={item.id} >
                  <TableCell key={item.id} >{item.month}/{item.year}</TableCell>
                  <TableCell key={item.id} >{item.first_name} {item.last_name}</TableCell>
                  <TableCell key={item.id} >{item.service.service}</TableCell>
                  <TableCell key={item.id} >{month}: {item.dates.map((date,i) => (i < item.dates.length-1 ? date + ', ': date))}</TableCell>
                  <TableCell key={item.id} >{item.dates.length}</TableCell>
                  <TableCell key={item.id} >{item.service.price}</TableCell>
                  <TableCell key={item.id} >{item.service.price * item.dates.length}</TableCell>
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