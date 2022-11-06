import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function AddClient(){
  const dispatch = useDispatch();
 
  return (
      <div className="container">
          <h2>Add Client:</h2>
          <p>Name: _______________ - ID: _______________ - Route: Tangletown</p>
          <p>Address: _______________ - Notes: _______________</p>
          <p>Email: _______________  - (____)____-________</p>
          <p>Vet: ______________________________ - (____)____-________</p>
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Cancel</Button>  {/*goes back to client list*/}
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Submit</Button>  {/*POST ROUTE*/}
      </div>
    );
}

export default AddClient;