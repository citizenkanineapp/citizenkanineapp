import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';
import ImageUpload from "../../../../AllPages/ImageUpload/ImageUpload";

function DogDetails(){
  const dispatch = useDispatch();

    return (
        <div className="container">
          <h1>Add Dog</h1>
          <ImageUpload />
          <p>Name: _____________</p>
          <p>Notes: ______________________________.</p>
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddClient'})}>Cancel</Button> 
          <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button> {/*PUT ROUTE*/}
        </div>
      );
}

export default DogDetails;