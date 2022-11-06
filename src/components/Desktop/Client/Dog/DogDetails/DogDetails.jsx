import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function DogDetails(){
  const dispatch = useDispatch();

    return (
        <div className="container">
          <h1>DogDetails</h1>
          <p>Name: Fido</p>
          <p>Notes: He's a good boy, yes he is.</p>
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Back</Button> 
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditDogForm'})}>Edit</Button> 
        </div>
      );
}

export default DogDetails;