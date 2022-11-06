import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function DogDetails(){
  const dispatch = useDispatch();

    return (
        <div className="container">
          <h1>Edit Dog</h1>
          <p>Name: Fido</p>
          <p>Notes: He's a good boy, yes he is.</p>
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>Cancel</Button> 
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button> {/*PUT ROUTE*/}
        </div>
      );
}

export default DogDetails;