import { useSelector } from 'react-redux';

//COMPONENTS
import EditEmployeeForm from '../EditEmployee/EditEmployeeForm';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';
import AddEmployeeForm from '../AddEmployee/AddEmployeeForm';

//MUI
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//modal css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
};

function EmployeeModal(){
  const status = useSelector(store => store.modal.status);
  const modalView = useSelector(store => store.modal.employee);

  //chooses which component to view
  const pickView = () => {
    switch(modalView){                 //conditionally renders components inside modal
      case "EditEmployeeForm": return <EditEmployeeForm/>
      case "EmployeeDetails":  return <EmployeeDetails/>
      case "AddEmployee": return <AddEmployeeForm/>
      default: return <EmployeeDetails/>
    };
  };
 
  return (
      <div className="container">
        <Modal open={status}>
          <Box sx={{ ...style, width: 800, height: 600 }}>
            {pickView()}
          </Box>
        </Modal>
      </div>
    );
}

export default EmployeeModal;