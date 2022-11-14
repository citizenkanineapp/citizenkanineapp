import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CSVDateView from "./CSVDateView";
import '../Desktop.css';

//MUI
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
function Invoicing(){
  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();
  //this route gets all clients to populate client list //
  useEffect(() => {
    // dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_INVOICE_DATA', payload: {clientId: 1, month: 11, year:2022}});
    
  }, []);










  
    return (
      <Box className="desktop_container">
        <Typography variant="h4">Invoicing</Typography>
        <Grid container spacing={2} sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* <Grid item xs={10}>
          <TextField
            label="Search Clients & Dogs"
            variant="filled"
            fullWidth
          />
          </Grid> */}
          <Grid item xs={2}>
            <Button size="large" variant="contained" color="secondary">
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mx: 5 }}>
            {/* TABLE OPTION */}
            <CSVDateView />
          </Grid>
        </Grid>
      </Box>
      );
}

export default Invoicing;