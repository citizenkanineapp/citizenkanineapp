// imports

import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// This react component was *originally* a part of Route.jsx.
// I broke it into a separate component for code readibility and modularity.

function DogCheckIn ({ dog }) {

  const user = useSelector(store => store.user); //gets admin status
  const dispatch = useDispatch();

  // this was originally three different functions, one for each possible check-in status.
  const checkInDog = (dog, status) => {
    const dogID = dog.dog_id;
    const routeID = dog.route_id;
    let updatedDog = {}
    if (status === 'status_check_in') {
      updatedDog = { id: dogID, checked_in: true, no_show: false, cancelled: false, routeID: routeID }
    } else if (status === 'status_no_show') {
      updatedDog = { id: dogID, checked_in: false, no_show: true, cancelled: false, routeID: routeID }
     } else if (status === 'status_cancel') {
      if (dog.cancelled) {
        // if dog is currently cancelled, (TRUE), sets alll status fields to false. this allows user to set any status
        updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: false, routeID: routeID }
      } else {
        // if dog is not currently cancelled (FALSE), set dog.cancelled to TRUE. this removes dog from modal view for non-admin users, and disallows setting status to 'checked in' or 'no-show' for admin users.
        updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }
      }
     }
    // dispatches to routes.saga.js https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/redux/sagas/routes.saga.js
    // where an Axios PUT request is sent to server to update postgres database
    dispatch({ type: 'CHECK_IN', payload: updatedDog });
  }
  
  return (
    <>
      {dog.cancelled ?
        <>
          <Button edge="end" variant='contained' color='info' onClick={(event) => checkInDog(dog, 'status_cancel')} >
            <AddCircleIcon sx={{ mr: 2, p: 1 }} />
            ADD DOG
          </Button>
        </>
        :
        <>
          <Button edge="end" onClick={(event) => checkInDog(dog, 'status_check_in')} variant='contained' color='success' sx={{ mr: 1, fontSize: 10 }} size='small'>
            <CheckBoxIcon sx={{ mr: .5 }} />
            CHECK IN
          </Button>
          <Button edge="end" onClick={(event) => checkInDog(dog, 'status_no_show')} variant='contained' color='error' sx={{ fontSize: 10 }} size='small'>
            <EventBusyIcon sx={{ mr: .5 }} />
            NO SHOW
          </Button>
            <Button edge="end" onClick={(event) => checkInDog(dog, 'status_cancel')} variant='contained' color='info' sx={{ mr: 1, fontSize: 10 }} size='small'>
              <CancelIcon sx={{ mr: .5}} />
              CANCEL WALK
            </Button>
        </>
      }
    </>
  )
}

export default DogCheckIn;