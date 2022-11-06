import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from '@mui/material/Button';

function ClientForm(){
  const dispatch = useDispatch();

  return (
      <div className="container">
            <h2 id="parent-modal-title">Client Form</h2>
            <p>Lisa Frank - ID: 425246 - Route: Tangletown</p>
            <p>1234 Gates of Hell Dr. - Side Door - Passcode: 666</p>
            <p>lisa_loves_dogs@gmail.com  - (666)-666-6666</p>
            <p>Dr. Terry - All Dogs Go To Heaven Clinic - (666)-666-6666</p>

            <div className="dog_photos">
              <button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule'})}>Schedule</button>    
              <button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'DogDetails'})}>Dog Details</button>      
              <button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'AddDogForm'})}>Add Dog</button>         
            </div>
            
            <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Cancel</Button>         
            <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL' })}>Save</Button>  {/* PUT ROUTE */}                                                                                         

      </div>
    );
}

export default ClientForm;