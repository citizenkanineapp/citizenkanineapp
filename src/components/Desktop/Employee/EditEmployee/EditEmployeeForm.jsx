import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from '@mui/material/Button';

function EmployeeForm(){
  const dispatch = useDispatch();

  return (
      <div className="container">
            <h2>Employee Form</h2>
            <p>Dolly Parton - ID: 425246 - Route: Tangletown</p>
            <p>1234 Jolene Ave. - Side Door - Passcode: 666</p>
            <p>dollywood_baby@gmail.com  - (666)-666-6666</p>

            <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Cancel</Button>         
            <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Save</Button>  {/* PUT ROUTE */}                                                                                         

      </div>
    );
}

export default EmployeeForm;