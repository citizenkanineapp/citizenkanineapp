import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// MUI IMPORTS
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function MobileNav() {

  const [value, setValue] = useState(0);
  const history = useHistory();

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ display: { xs: 'flex', sm: 'block', md: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, color: 'primary' } }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={(event) => { history.push('/user') }} />
      <BottomNavigationAction label="Routes" icon={<ListAltIcon />} onClick={(event) => { history.push('/m/routes') }} />
      <BottomNavigationAction label="Map" icon={<PinDropIcon />} onClick={(event) => { history.push('/m/map') }} />
      <BottomNavigationAction label="Schedule" icon={<CalendarMonthIcon />} onClick={(event) => { history.push('/m/employees') }} />
    </BottomNavigation>
  );
}

export default MobileNav;