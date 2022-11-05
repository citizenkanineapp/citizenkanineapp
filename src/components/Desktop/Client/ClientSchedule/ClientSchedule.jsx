import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from '@mui/material/Button';

function ClientSchedule(){
  const dispatch = useDispatch();

 return (
  <div className="container">
    <h1>Client Schedule</h1>
    <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Back</Button>
    <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges'})}>Edit</Button>
  </div>
 )    
}

export default ClientSchedule;