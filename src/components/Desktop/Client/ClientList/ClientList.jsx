import { useSelector, useDispatch } from "react-redux";

//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';

//MUI
import Button from '@mui/material/Button';

function ClientList(){
  const dispatch = useDispatch();
  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  return (
    <div className="container">
        <h1>ClientList</h1>

      <Button onClick={() => openModal('ClientDetails')}>LISA FRANK - SPIKE, FIDO</Button>  {/*opens client details*/}
      <Button onClick={() => openModal('AddClient')}>Add Client</Button> 

      <ClientModal/> {/* only open when button is pressed */}
    </div>
  );

}

export default ClientList;

