import {useHistory} from 'react-router-dom';
import { TableBody, TableRow, TableCell, } from '@mui/material';
import { styled } from '@mui/system';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsAllDogs({dogList, view}) {
  const history = useHistory();
  const getDogDetails = (dogID) => {
    history.push(`/m/dog/${dogID}`)
  }
  console.log(dogList);

  

  return (
    <TableBody>
    {dogList.map((dog) => (
      <StyledTableRow key={dog.dog_id}> 
        <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.dog_name}</TableCell>
        <TableCell onClick={()=>getDogDetails(dog.dog_id)}>{dog.client_firstname} {dog.client_lastname}</TableCell>
        { view==='desktop' ?
          <TableCell onClick={()=>getDogDetails(dog.dog_id)}> {dog.days.join(', ').toUpperCase()} </TableCell>
           :null
          }
      </StyledTableRow>
    ))}
  </TableBody>
  )
}