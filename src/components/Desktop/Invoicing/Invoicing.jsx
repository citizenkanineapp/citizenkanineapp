import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable";
import dayjs from 'dayjs';
import ExportCSV from './ExportCSV'
let localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);
import '../Desktop.css';

//MUI
import { Box, Button, Grid, FormControl, MenuItem, Select, InputLabel, Container } from '@mui/material';
// import { styled } from '@mui/material/styles';

function Invoicing(){
  //set date/year arrays
  const months = dayjs.months();
  const getYears = () => {
    let max = 2050;
    let min = 2020;
    let yearsArr = [];
    for (let i = min; i <= max; i++) {
      yearsArr.push(i)
    }
    return yearsArr
  }
  const years = getYears();

  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();
  const [selectedId, setId] = useState(0); // defaults to 'all'
  const [selectedMonth, setMonth] = useState(months[dayjs().month()]); //defaults to current month
  const [selectedYear, setYear] = useState(dayjs().year());

  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
  }, []);

  const fetchInvoiceData = () => {
    //formats month for search query
    const month = months.indexOf(selectedMonth)+1;

    dispatch({
      type: 'FETCH_INVOICE_DATA',
      payload: {
        clientId: selectedId,
        month: month, 
        year: selectedYear
      }});

    setId(0);
  }

  return (
    <Box className="desktop_container" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'center'}}>
      <Grid container sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '80%'}}>
        <Grid item xs={8}>
          <FormControl sx={{mx: 2,  width: 150 }}>
            <InputLabel>Select Client</InputLabel>
              <Select
                size="small"
                value={selectedId}
                onChange={e => setId(e.target.value)}
              >
                <MenuItem value={0}>
                  <em>All</em>
                </MenuItem>
                  { clientList && clientList.map && clientList.map((client) => (
                <MenuItem
                  key = {client.id}
                  value={client.id}
                >
                  {client.first_name} {client.last_name}
                </MenuItem>
                ))} 
              </Select>
          </FormControl>
          <FormControl sx={{mr: 2,  width: 150 }}>
            <InputLabel>Select Month</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={e => setMonth(e.target.value)}
              >

                  { months.map((month, i) => (
                <MenuItem
                  key = {i}
                  value={month}
                >
                  {month}
                </MenuItem>
                ))} 
              </Select>
          </FormControl>
          <FormControl sx={{mr: 2,  width: 150 }}>
            <InputLabel>Select Year</InputLabel>
              <Select
                size="small"
                
                value={selectedYear}
                onChange={e => setYear(e.target.value)}
              >
              { years.map((year,i) => (
                <MenuItem
                  key = {i}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))} 
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button size="large" variant="contained" color="secondary" sx={{mx: 1}}
            onClick={e=>fetchInvoiceData()}
          >
            Search
          </Button>

          <Box component="span">
            <ExportCSV />
          </Box>

        </Grid>
      </Grid>
    
      <InvoiceTable />

    </Box>
    );
}

export default Invoicing;