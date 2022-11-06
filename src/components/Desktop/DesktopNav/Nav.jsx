import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


// MUI IMPORTS
import { Avatar, AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import BadgeIcon from '@mui/icons-material/Badge';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 350;
const navItems = ['Home', 'Pack Leaders', 'Clients', 'Reports'];

function Nav(props) {

  const history = useHistory();
  const user = useSelector((store) => store.user);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', mt: 7 }}>
      <Avatar sx={{ width: 200, height: 200, fontSize: 50 }}>ADMIN</Avatar>
      <Divider />
      <List>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/user')}>
            <DashboardIcon />
            <ListItemText primary='Dashboard' />
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/employees')}>
            <BadgeIcon />
            <ListItemText primary='Pack Leaders' />
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/clients')}>
            <PetsIcon />
            <ListItemText primary='Clients' />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/invoice')}>
            <EqualizerIcon />
            <ListItemText primary='Reports' />
          </ListItemButton>
        </ListItem>

      </List>
      <Button color='error' variant='contained'>Log Out</Button>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" >
        <Toolbar>
          {/* <Button onClick={handleDrawerToggle} color='secondary'></Button> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Citizen Kanine
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'none' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}



export default Nav;
