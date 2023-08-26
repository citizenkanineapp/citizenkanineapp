import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useDispatch} from 'react-redux';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsAllClients({clientList, openModal}) {
  const dispatch = useDispatch();

  const clientScheduleView = (client) => {
    dispatch({ type: 'SET_CLIENT', payload: client })
    openModal('ClientSchedule')
  }

  const fetchOneClient = (client) => {
    // console.log('client',client)
    dispatch({type: 'SET_CLIENT', payload: client })
    openModal('ClientDetails')
  }

  return (
    <TableBody>
      {clientList && clientList.map((client ) => (
          <StyledTableRow key={client.client_id} hover> 
            <TableCell onClick={() => fetchOneClient(client)}>{client.first_name} {client.last_name}</TableCell>
            <TableCell onClick={() => fetchOneClient(client)}>{client.dogs.map(
              (dog, i) => (i === client.dogs.length-1 ? dog.dog_name : dog.dog_name + ' • '))}</TableCell>
            <TableCell onClick={() => fetchOneClient(client)}>{client.phone}</TableCell>
            <TableCell onClick={() => fetchOneClient(client)}>{client.email}</TableCell>
            <TableCell>
              <IconButton onClick={() => clientScheduleView(client)}>
                <CalendarMonthIcon sx={{ fontSize: 20, color: '#341341' }}/> 
              </IconButton>
            </TableCell>
          </StyledTableRow>
      ))}
    </TableBody>
  );
}