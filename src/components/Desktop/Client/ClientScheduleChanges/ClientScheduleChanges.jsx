import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function ClientScheduleChanges(){
  const dispatch = useDispatch();

  return (
    <div className="container">
        <h2 id="parent-modal-title">Client Schedule</h2>
        <p id="parent-modal-description">Here is the schedule form.</p>
        <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientSchedule'})}>Back</Button>
        <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm'})}>Save</Button> {/*PUT ROUTE*/}
    </div>
    );
}

export default ClientScheduleChanges;