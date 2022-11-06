import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";

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

function EmployeeList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const openModal = (view) => {
    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  return (
    <Box className="desktop_container">
      <Typography variant="h4">Employees</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mx: 5 }}>
          {/* TABLE OPTION */}
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID:</TableCell>
                  <TableCell>Name:</TableCell>
                  <TableCell>Phone Number:</TableCell>
                  <TableCell>E-Mail:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* EXAMPLE ROW THAT WOULD BE MAPPED */}
                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>
                {/* END OF EXAMPLE ROW */}

                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>

                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>

                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>

                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>

                <StyledTableRow hover onClick={() => openModal('EmployeeDetails')}> {/* FETCH CLIENT ROUTE */}
                  <TableCell>12345</TableCell>
                  <TableCell>Dolly Parton</TableCell>
                  <TableCell>(666)-666-6666</TableCell>
                  <TableCell>working9to5@gmail.com</TableCell>
                </StyledTableRow>



              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ mr: 5, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => history.push('/schedule')} variant='contained' color='info' sx={{ mr: 2 }}>Schedule</Button>
          <Button onClick={() => openModal('AddEmployee')} variant='contained' color='secondary'  >Add Employee</Button>
        </Grid>
      </Grid>
      <EmployeeModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default EmployeeList;

