import {useHistory} from 'react-router-dom';
import { TableBody, TableRow, TableCell, } from '@mui/material';
import { styled } from '@mui/system';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsDogByDay({dogList, weekSearch}) {
  const history = useHistory();
  const getDogDetails = (dogID) => {
    history.push(`/m/dog/${dogID}`)
  }
  console.log(weekSearch)

  return (
    <TableBody>
      {dogList.filter((dog)=> dog[weekSearch]).map((dog) => (
        <StyledTableRow key={dog.dog_id}> 
          <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.dog_name}</TableCell>
          <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.client_firstname} {dog.client_lastname}</TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  )
}