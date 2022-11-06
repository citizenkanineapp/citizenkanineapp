import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LogOutButton from '../../AllPages/LogOutButton/LogOutButton';
import './Nav.css';

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
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <ListItemText primary='dashboard' />
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/employees')}>
            <BadgeIcon />
            <ListItemText primary='pack leaders' />
          </ListItemButton>
        </ListItem>

        <ListItem >
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/clients')}>
            <PetsIcon />
            <ListItemText primary='clients' />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }} onClick={(event) => history.push('/invoice')}>
            <EqualizerIcon sx={{ textAlign: 'flex-end' }}/>
            <ListItemText primary='reports' />
          </ListItemButton>
        </ListItem>

      </List>
      <LogOutButton />
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AppBar component="nav" position='sticky'>
     
        {user.id && (
          <Toolbar variant="dense">
            {/* <Button onClick={handleDrawerToggle} color='secondary'></Button> */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{mx: 4, py: 1, display: { sm: 'block' } }}
            >
              <MenuIcon sx={{ fontSize: "3rem", color: '#7BCEC8', p: 0, }} />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, pb: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              CITIZEN KANINE
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'none' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        )}
      </AppBar>
      <Box>
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
    </Box >
  );
}



export default Nav;
