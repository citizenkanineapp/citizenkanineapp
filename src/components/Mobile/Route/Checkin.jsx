import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function DogCheckIn ({dog, config}) {

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    
      const checkIn = (dog) => {
       // console.log('CHECKING IN CLIENT #:', dog.client_id);
        const dogID = dog.dog_id;
        const routeID = dog.route_id;
        const updatedDog = { id: dogID, checked_in: true, no_show: false, cancelled: false, routeID: routeID }
        dispatch({ type: 'CHECK_IN', payload: updatedDog });
    
      }
    
      const noShow = (dog) => {
        const dogID = dog.dog_id;
        const routeID = dog.route_id;
        const updatedDog = { id: dogID, checked_in: false, no_show: true, cancelled: false, routeID: routeID }
        dispatch({ type: 'NO_SHOW', payload: updatedDog });
      }
    
      const cancelWalk = (dog) => {
        const dogID = dog.dog_id;
        const routeID = dog.route_id;
        let updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }
    
        if (dog.cancelled) {
          updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: false, routeID: routeID }
    
        } else {
          updatedDog = { id: dogID, checked_in: false, no_show: false, cancelled: true, routeID: routeID }
    
        }
        dispatch({ type: 'CANCEL_WALK', payload: updatedDog });
      }
    return (
        <>
            { config === "routes" ?
                <>
                {dog.cancelled ?
                    <>
                        {user.admin ?
                            <Button edge="end" variant='contained' color='info' onClick={(event) => cancelWalk(dog)} >
                                <AddCircleIcon sx={{ mr: 2, p: 1 }} />
                                ADD DOG
                            </Button>
                            :
                            null
                        }
                    </>
        
                    :
                    <>
                        <Button edge="end" onClick={(event) => checkIn(dog)} variant='contained' color='success' sx={{ mr: 1 }} size='small'>
                        <CheckBoxIcon sx={{ mr: 2 }} />
                        CHECK IN
                        </Button>
                        <Button edge="end" onClick={(event) => noShow(dog)} variant='contained' color='error' size='small'>
                        <EventBusyIcon sx={{ mr: 2 }} />
                        NO SHOW
                        </Button>
                        {user.admin ?
                            <Button edge="end" onClick={(event) => cancelWalk(dog)} variant='contained' color='info' sx={{ mr: 1 }} size='small'>
                                <CancelIcon sx={{ mr: 2 }} />
                                CANCEL WALK
                            </Button>
                            
                            :
                            null
                        }
                    </>
                }
                </>
                : null

            }
        </>
    )
}

export default DogCheckIn;