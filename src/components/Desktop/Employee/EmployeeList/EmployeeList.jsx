import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//COMPONENTS
import EmployeeModal from "../EmployeeModal/EmployeeModal";

//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';

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

      <Button onClick={() => openModal('EmployeeDetails')}>DOLLY PARTON - ID: 12345 - (666)-666-6666 - working9to5@gmail.com </Button>  {/*opens employee details*/}
      <Button onClick={() => openModal('AddEmployee')}>Add Employee</Button>
      <Button onClick={() => history.push('/schedule')}>Schedule</Button>

      <EmployeeModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default EmployeeList;

