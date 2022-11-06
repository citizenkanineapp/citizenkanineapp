import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from '@mui/material/Button';

function EmployeeSchedule(){
  const dispatch = useDispatch();
  const openModal = (view) => {
    dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

 return (
  <div className="container">

    <h1>Employee Schedule</h1>
    <p onClick={() => openModal('EmployeeDetails')}>Dolly Parton - Click me</p> 
    <Button>Submit</Button> {/*POST ROUTE*/}

    <EmployeeModal/> {/* only open when button is pressed */}
  </div>
 )    
}

export default EmployeeSchedule;