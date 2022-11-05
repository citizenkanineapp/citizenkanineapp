import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from '@mui/material/Button';

function ClientDetails(){
  const dispatch = useDispatch();

  return (
      <div className="container">
            <h2>Client Details</h2>
            <p>Lisa Frank - ID: 425246 - Route: Tangletown</p>
            <p>1234 Gates of Hell Dr. - Side Door - Passcode: 666</p>
            <p>lisa_loves_dogs@gmail.com  - (666)-666-6666</p>
            <p>Dr. Terry - All Dogs Go To Heaven Clinic - (666)-666-6666</p>

            <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Back</Button>  {/*goes back to client list*/}
            <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Edit</Button> 
      </div>
    );
}

export default ClientDetails;