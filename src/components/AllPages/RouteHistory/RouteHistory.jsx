import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

//MUI imports
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Table, TableContainer, TableHead, Paper, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import {styled} from '@mui/system';

//style for modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

function RouteHistoryModal({open, setOpen}) {

  const dispatch = useDispatch();

  // subscribing to routeHistory reducer ensures that modal displays most route history for the selected date.
  // calendar date is dispatched to server in parent component and sent to routeHistory reducer.
  const routeHistory = useSelector(store => store.modal.routeHistory);

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: 'CLEAR_MODALS' })
  }

return (
  <>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{fontWeight: '800', mb: 2}}>{routeHistory[0] && dayjs(routeHistory[0].date).utc().format('MM/DD/YYYY')}</Typography>
      <TableContainer component={Paper} >
          <Table stickyHeader size="small" sx={{overflow:'auto'}}>
            <TableHead>
              <TableRow>
                  <TableCell sx={{fontWeight: '600'}}>Packleader:</TableCell>
                  <TableCell sx={{fontWeight: '600'}}>Route:</TableCell>
                  <TableCell sx={{fontWeight: '600'}}>Phone:</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
            {routeHistory && routeHistory[0] && routeHistory.map((packleader) => (
              <StyledTableRow key={packleader.emp_id}> 
                <TableCell >{packleader.first_name} {packleader.last_name}</TableCell>
                <TableCell >{packleader.route_name}</TableCell>
                <TableCell >{packleader.phone}</TableCell>

              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Modal>
  </>
)
}

export default RouteHistoryModal;