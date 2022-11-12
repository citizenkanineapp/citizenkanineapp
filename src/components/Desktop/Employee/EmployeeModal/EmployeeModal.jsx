import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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
  const dispatch = useDispatch();

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
        <Modal 
              className='modal'
              open={status} 
              // This 👇 gets rid of the funky blue outline around the modal. 
              disableEnforceFocus={false}
              // This onClose function allows the user click on the backdrop to exit the modal view only if the modalView is set to EmployeeDetails. This prevents the user from closing out a form that has not been submitted yet. 
              onClose={(_,reason) => {
              reason === 'backdropClick';
              if (modalView === 'EmployeeDetails'){
                dispatch({ type: 'SET_MODAL_STATUS' })
              }
              }} 
              >
          <Box sx={{ ...style, width: '65vw', height: '80vh', outline: 'none', borderRadius: '5px', display: 'flex', alignContent: 'center', justifyContent: 'left' }}>
            {pickView()}
          </Box>
        </Modal>
      </div>
    );
}

export default EmployeeModal;