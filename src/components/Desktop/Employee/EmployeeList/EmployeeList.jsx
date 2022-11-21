import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";

//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

function EmployeeList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = (view) => {
    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  useEffect(()=> {
    dispatch({
      type: 'SAGA_FETCH_EMPLOYEES'
    })
  },[])
  

  const allEmployees = useSelector(store=> store.allEmployeesReducer.employees);

  // const modalStatus = useSelector(store=> store.modal.status);
  
  const handleClick = (employee)=> {
   
    // Need to send dispatch to fetch employee and their schedule
    dispatch({
      type: 'SET_EMPLOYEE',
      payload: employee
    })
    dispatch({
      type: 'SAGA_FETCH_EMP_SCHEDULE',
      payload: employee.id
    })
    setTimeout(() => {
      console.log("Delayed for 1 second"); //waits for employee to be set
      openModal('EmployeeDetails');
      }, "500");
   
  }

  return (
    <Box className="desktop_container"  sx={{ height: '88%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {/*<Typography variant="h4" sx={{display: 'flex', justifyContent: 'center', pt: 3}}>Employees</Typography>*/}
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mr: 45, display: 'flex', justifyContent: 'flex-end', gap: 2}}>
          <Button onClick={() => openModal('AddEmployee')} variant='contained' color='secondary'>Add Employee</Button>
          <Button onClick={() => history.push('/schedule')} variant='contained' color='info'>Schedule</Button>
        </Grid>
        <Grid item xs={12} sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

          {/* TABLE OPTION */}
          <TableContainer component={Paper} sx={{width: '50%', height: '50vh'}}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: '800'}}>Name</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Phone Number</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>E-Mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
    
                {/* EXAMPLE ROW THAT WOULD BE MAPPED */}
                {allEmployees.map( employee => (
                  <StyledTableRow 
                    key={employee.id} 
                    hover 
                    onClick={()=> handleClick(employee)}>
                    <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                  </StyledTableRow>
                ))}
                {/* END OF EXAMPLE ROW */}

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <EmployeeModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default EmployeeList;

