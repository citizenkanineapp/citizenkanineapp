import { useSelector } from 'react-redux';

//COMPONENTS
import ClientDetails from '../ClientDetails/ClientDetails';
import AddClient from '../AddClient/AddClient';
import EditClientForm from '../EditClient/EditClientForm';
import ClientSchedule from '../ClientSchedule/ClientSchedule';
import ClientScheduleChanges from '../ClientScheduleChanges/ClientScheduleChanges';
import AddDogForm from '../Dog/AddDog/AddDogForm';
import EditDogForm from '../Dog/EditDog/EditDogForm';
import DogDetails from '../Dog/DogDetails/DogDetails';
import ConfirmClient from '../ConfirmClient/ConfirmClient';

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

function ClientModal(){
  const status = useSelector(store => store.modal.status);
  const modalArray = useSelector(store => store.modal.client);
  const modalView = modalArray[modalArray.length-1]; //pulls the last view from the array
  console.log('Modalview is', modalArray)

  //chooses which component to view
  const pickView = () => {
    switch(modalView){                 //conditionally renders components inside modal
      case "AddClient":  return <AddClient/>
      case "EditClientForm": return <EditClientForm/>
      case "ClientSchedule": return <ClientSchedule/>
      case "ClientScheduleChanges": return <ClientScheduleChanges/>
      case "AddDogForm": return <AddDogForm/>
      case "DogDetails": return <DogDetails/>
      case "EditDogForm": return <EditDogForm/>
      case "ClientDetails": return <ClientDetails/>
      case "ConfirmClient": return <ConfirmClient/>
      default: return <ClientDetails/>
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

export default ClientModal;