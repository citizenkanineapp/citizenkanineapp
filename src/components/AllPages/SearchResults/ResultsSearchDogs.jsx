import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsSearchDogs({dogList, clientList, openModal, submittedSearch, view}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const clientScheduleView = (dog) => {
    if (view) {
      const client = clientList.filter((cli) => cli.client_id === dog.client_id)[0];
      dispatch({type: 'SET_CLIENT', payload: client })
      openModal('ClientSchedule')
    }
  }
  
  const getDogDetails = (dog) => {
    if (view) {
      const client = clientList.filter((cli) => cli.client_id === dog.client_id)[0];
      dispatch({type: 'SET_CLIENT', payload: client});
      openModal('ClientDetails');
    } else {
      history.push(`/m/dog/${dog.dog_id}`)
    }
  }

  return (
    <TableBody>
      {dogList.filter((dog) => {
        const firstName = dog.client_firstname.toLowerCase();
        const lastName = dog.client_lastname.toLowerCase();
        const dogName = dog.dog_name.toLowerCase()

        //loop through array of dog names and check those
        if (firstName.includes(submittedSearch) || lastName.includes(submittedSearch) || dogName.includes(submittedSearch) ) {
          return true;
        }
      }).map((dog ) => (
        <StyledTableRow key={dog.dog_id}> 
          <TableCell onClick={()=>getDogDetails(dog)}>{dog.dog_name}</TableCell>
          <TableCell onClick={()=>getDogDetails(dog)}>{dog.client_lastname}, {dog.client_firstname}</TableCell>
          <TableCell>{dog.route}</TableCell>
          { view==='desktop' ?
          <>
            <TableCell onClick={()=>getDogDetails(dog)}> {dog.days.join(', ').toUpperCase()} </TableCell>
            <TableCell>
              <IconButton onClick={() => clientScheduleView(dog)}>
                <CalendarMonthIcon sx={{ fontSize: 20, color: '#341341' }}/> 
              </IconButton>
            </TableCell>
          </>
            : null
          }
          </StyledTableRow>
      ))}
    </TableBody>
  )
}