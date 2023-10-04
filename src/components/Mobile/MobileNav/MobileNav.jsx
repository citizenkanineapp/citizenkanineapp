import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MUI IMPORTS
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';
// import PinDropIcon from '@mui/icons-material/Pindrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function MobileNav() {
  // navigation that is conditionally rendered based on screen size 
  // bottom navigation for ease of access on mobile
  const dispatch = useDispatch();
  const notificationStatus = useSelector(store => store.notificationsReducer);
  console.log(notificationStatus);

  // state to show which link we are accessing at a time
  const [value, setValue] = useState(0);
  // history to navigate us to different pages
  const history = useHistory();

  return (
    // bottom navigation with conditional rendering that should only show on xs and small screens
    <BottomNavigation

      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ display: { xs: 'flex', sm: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, color: 'primary' } }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={(event) => { history.push('/m/user') }} />
      <BottomNavigationAction label="Routes" icon={<ListAltIcon />} onClick={(event) => { history.push('/m/routes') }} />
      { notificationStatus==='new' ? 
        <BottomNavigationAction label="Notes" sx={{backgroundColor:"red"}} icon={<NotesIcon />} onClick={(event) => { history.push('/m/notes') }} /> :
        <BottomNavigationAction label="Notes" icon={<NotesIcon />} onClick={(event) => { history.push('/m/notes') }} />
      }
      <BottomNavigationAction label="Schedule" icon={<CalendarMonthIcon />} onClick={(event) => { history.push('/m/schedule') }} />
    </BottomNavigation>
  );
}

export default MobileNav;