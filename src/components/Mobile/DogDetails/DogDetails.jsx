import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Chip, Fab, CardMedia, Card, Paper, Stack, CardContent, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function DogDetails() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const dog = { flagged: true };
  const vetAddress = { address: '400 S 4th St', city: 'Minneapolis', zipCode: '55415', }
  const clientAddress = { address: '4145 Zarthan AVE S', city: 'St. Louis Park', zipCode: '55416', }
  const history = useHistory();

  const openMap = async (clientAddress) => {
    const destination = encodeURIComponent(`${clientAddress.address} ${clientAddress.zipCode}, ${clientAddress.city}`);
    const link = `http://maps.google.com/?daddr=${destination}`;
    window.open(link);
  }


  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', height: '100%' }}>

      {/* <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid item xs={10}>
            <Card>
              <Stack direction='row'>
                <Fab color="primary" aria-label="add" size='small' sx={{ position: 'fixed', mt: 1, ml: 1 }}>
                  <EditIcon />
                </Fab>
                <CardMedia component="img" height='25%' image="https://www.rd.com/wp-content/uploads/2020/11/GettyImages-889552354-e1606774439626.jpg" />
                <CardContent>
                  <Typography align='center'>DOG NOTES</Typography>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>

        </TabPanel>
        <TabPanel value={value} index={2}>

        </TabPanel>
      </Grid> */}
      {/* DOG PHOTO */}

      {/* DOG NAME */}
      <Grid item xs={10}>
        <Stack direction='column'>
          <Card sx={{ mb: 1 }}>
            <Typography variant='h4' align='center'>RUFUS</Typography>
          </Card>
          {/* CLIENT ADDRESS INFORMATION */}
          <Card onClick={(event) => openMap(clientAddress)}>
            <Typography align='center' variant='caption'>
              {clientAddress.address} {clientAddress.city} {clientAddress.zipCode}
            </Typography>
          </Card>
        </Stack>
      </Grid>
      {/* ACCESS INFORMATION */}
      <Grid item xs={10}>
        <Card>
          <Typography align='center'>Side door - Access Code: 12543</Typography>
        </Card>
      </Grid>
      {/* OWNER INFORMATION & CALL BUTTON */}
      <Grid item xs={10}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Owner Details:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h6'>Owner Info:</Typography>
            <Typography variant='body2'> Dolly Parton | <a href="tel:+17637447704">(763)-744-7704</a></Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={10}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Emergency Contact:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h6'>Vet Info:</Typography>
            <Typography variant='body2'>Dr. Terry | <a href="tel:+16127159132">(612)-715-9132</a> </Typography>
            <Typography variant='caption'>{vetAddress.address} {vetAddress.city} {vetAddress.zipCode}</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default DogDetails;