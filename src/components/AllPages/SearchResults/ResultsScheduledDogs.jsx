import { TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';

// CUSTOM COMPONENTS FOR SEARCH RESULTS
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-root:hover':{
    backgroundColor: '#accad5' ,
  },
}));

export default function ResultsScheduledDogs({dogList}) {


  return (
    <TableBody >
      {dogList[0] && dogList[0].dog_id != undefined && dogList.map((dog) => (
        <StyledTableRow key={dog.dog_id}>
          <TableCell >{dog.name}</TableCell>
          <TableCell >{dog.client_last_name}, {dog.client_first_name}</TableCell>
          <TableCell >{dog.route_name}</TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  )
}