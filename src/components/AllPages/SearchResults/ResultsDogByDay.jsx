import {useHistory} from 'react-router-dom';
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

export default function ResultsDogByDay({dogList, clientList,openModal, weekSearch, view}) {
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
      dispatch({type: 'SET_CLIENT', payload: client });
      openModal('ClientDetails');
    } else {
      history.push(`/m/dog/${dog.dog_id}`)
    }
  }

  return (
    <TableBody>
      {dogList.filter((dog)=> dog[weekSearch]).map((dog) => (
        <StyledTableRow key={dog.dog_id}> 
          <TableCell onClick={()=>getDogDetails(dog)}>{dog.dog_name}</TableCell>
          <TableCell onClick={()=>getDogDetails(dog)}>{dog.client_firstname} {dog.client_lastname}</TableCell>
          { view==='desktop' ?
          <>
            <TableCell onClick={()=>getDogDetails(dog)}> {dog.days.join(', ').toUpperCase()} </TableCell>
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