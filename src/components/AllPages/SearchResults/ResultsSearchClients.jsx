import { TableBody, TableRow, TableCell, IconButton,  } from '@mui/material';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useDispatch} from 'react-redux';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsSearchClients({clientList, openModal}) {
  const dispatch = useDispatch();

  const clientScheduleView = (client) => {
    dispatch({ type: 'SET_CLIENT', payload: client })
    openModal('ClientSchedule')
  }

  const fetchOneClient = (client) => {
    //console.log(client)
    dispatch({type: 'SET_CLIENT', payload: client })
    openModal('ClientDetails')
  }

 return (
    <TableBody>  
      {clientList && clientList
        .filter((client) => {
          const firstName = client.first_name.toLowerCase()
          const lastName = client.last_name.toLowerCase()

          //loop through array of dog names and check those
          if (firstName.includes(submittedSearch)) {
            return true;
          }
          if (lastName.includes(submittedSearch)) {
            return true;
          }
          for(let dog of client.dogs){
            const dogName = dog.dog_name.toLowerCase()
            if(dogName.includes(submittedSearch)){
              return true;
            }
          }
        })
        .map((client ) => (
          <StyledTableRow key={client.client_id} hover> 
            <TableCell onClick={() => fetchOneClient(client)}>{client.first_name} {client.last_name}</TableCell>
            <TableCell onClick={() => fetchOneClient(client)}>{client.dogs.map(dog => (dog.dog_name + ' '))}</TableCell>
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
  )
}