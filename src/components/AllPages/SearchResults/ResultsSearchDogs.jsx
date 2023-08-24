import useHistory from 'react-router-dom';
import { TableBody, TableRow, TableCell, } from '@mui/material';
import { styled } from '@mui/system';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsSearchDogs({dogList, submittedSearch, view}) {

  const getDogDetails = (dogID) => {
    history.push(`/m/dog/${dogID}`)
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