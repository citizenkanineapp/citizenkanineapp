import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from '@mui/material/Button';

function AddEmployee(){
  const dispatch = useDispatch();
 
  return (
      <div className="container">
          <h2>Add Employee:</h2>
          <p>Name: _______________ - ID: _______________ </p>
          <p>Address: _______________ </p>
          <p>Email: _______________  - (____)____-________</p>

          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Cancel</Button>  {/*goes back to Employee list*/}
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS'})}>Submit</Button>  {/*POST ROUTE*/}
      </div>
    );
};

export default AddEmployee;