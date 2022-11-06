import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function ClientModal(){
  const dispatch = useDispatch();
 
  return (
      <div className="container">
          <h2 id="parent-modal-title">Add Client:</h2>
          <p id="parent-modal-description">Name: _______________ - ID: _______________ - Route: Tangletown</p>
          <p id="parent-modal-description">Address: _______________ - Notes: _______________</p>
          <p id="parent-modal-description">Email: _______________  - (____)____-________</p>
          <p id="parent-modal-description">Vet: ______________________________ - (____)____-________</p>
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Cancel</Button>  {/*goes back to client list*/}
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Submit</Button>  {/*POST ROUTE*/}
      </div>
    );
}

export default ClientModal;