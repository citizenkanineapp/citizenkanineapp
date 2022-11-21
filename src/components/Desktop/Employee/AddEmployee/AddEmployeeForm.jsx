import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch, Tooltip } from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function AddEmployee() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({ first_name: '', last_name: '', phone: '', street: '', city: '', zip: '', email: '' })

  const daysOfWeek = ['MON', 'TUES', 'WEDS', 'THURS', 'FRI'];
  const [week1, setWeek1] = useState({ week: 1, 1: false, 2: false, 3: false, 4: false, 5: false });

  const [week2, setWeek2] = useState({ week: 2, 1: false, 2: false, 3: false, 4: false, 5: false });

  const [admin, setAdmin] = useState(false);
  const [errorFirst, setErrorFirst] = useState(false);
  const [errorLast, setErrorLast] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorStreet, setErrorStreet] = useState(false)
  const [errorZip, setErrorZip] = useState(false)
  const [errorCity, setErrorCity] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorRoute, setErrorRoute] = useState(false)


  const handleSwitch = () => {
    setAdmin(!admin)
  }

  const checkInputs = (event) => {
    let errorFree = false;
    setErrorFirst(false)
    setErrorLast(false)
    setErrorPhone(false)
    setErrorStreet(false)
    setErrorCity(false)
    setErrorZip(false)
    setErrorEmail(false)
    setErrorRoute(false)


    if (employee.first_name === undefined || employee.first_name === '') {
      setErrorFirst(true)
      errorFree = true
    }
    if (employee.last_name === undefined || employee.last_name === '') {
      setErrorLast(true)
      errorFree = true
    }
    if (employee.phone === undefined || employee.phone === '') {
      setErrorPhone(true)
      errorFree = true
    }
    if (employee.street === undefined || employee.street === '') {
      setErrorStreet(true)
      errorFree = true
    }
    if (employee.city === undefined || employee.city === '') {
      setErrorCity(true)
      errorFree = true
    }
    if (employee.zip === undefined || employee.zip === '') {
      setErrorZip(true)
      errorFree = true
    }
    if (employee.email === undefined || employee.email === '') {
      setErrorEmail(true)
      errorFree = true
    }
    if (employee.route === undefined || employee.route === '') {
      setErrorRoute(true)
      errorFree = true
    }
    if (employee.phone.length > 13) {
      setErrorPhone(true)
      errorFree = true
    } else if (errorFirst === false &&
      errorLast === false &&
      errorPhone === false &&
      errorStreet === false &&
      errorCity === false &&
      errorZip === false &&
      errorEmail === false &&
      errorRoute === false) {

      errorFree = false
    } else {
      dispatch({
        type: 'SAGA_ADD_EMPLOYEE',
        payload: [{ ...employee, admin: admin }, week1, week2, { admin: admin }]
      })
      dispatch({ type: 'SET_MODAL_STATUS' })
    }
  }

  return (
    <Grid className="container" sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%', height: '100%', justifyContent: 'center', gap: 2}}>
        <Grid sx={{display: 'flex', flexDirection: 'row', height: "15%",justifyContent: 'space-between', mt: 5, mb: 1, mx: 10 }}>
        <Box sx={{display: 'flex', flexDirection: 'row', width: '78%', my: 1, py: 1, gap: 2}}>
            <TextField
              fullWidth
              value={employee.first_name} size="small"
              onChange={e => setEmployee({ ...employee, first_name: e.target.value })}
              error={errorFirst}
              helperText={errorFirst ? errorFirst && "* First Name" : "* First Name"}
            />
            <TextField
              fullWidth
              value={employee.last_name} size="small"
              onChange={e => setEmployee({ ...employee, last_name: e.target.value })}
              error={errorLast}
              helperText={errorLast ? errorLast && "* Last Name" : "* Last Name"}
            />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 4}}>
              <Switch
                checked={admin}
                onChange={handleSwitch}
              />
              <Tooltip title="Admin" placement="top-start">         
                <SupervisorAccountIcon style={{ fontSize: 36, color: '#e0603f' }} />
              </Tooltip>
        </Box>
      </Grid>

      {/*-------------------- TEXT FIELDS --------------------*/}
      <Grid sx={{display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "60%", mx: 10, gap: 2 }}>
              <TextField
                  value={employee.street} size="small"
                  onChange={e => setEmployee({ ...employee, street: e.target.value })
                  }
                  error={errorStreet}
                  helperText={errorStreet ? errorStreet && "* Street" : "* Street"}
                />
              <TextField
                value={employee.city} size="small"
                onChange={e => setEmployee({ ...employee, city: e.target.value })
                }
                error={errorCity}
                helperText={errorCity ? errorCity && "* City" : "* City"}
              />
              <TextField
                value={employee.zip} size="small"
                onChange={e => setEmployee({ ...employee, zip: e.target.value })
                }
                error={errorZip}
                helperText={errorZip ? errorZip && "* Zip Code" : "* Zip Code"}
              />
              <TextField
                value={employee.email} size="small"
                onChange={e => setEmployee({ ...employee, email: e.target.value })
                }
                error={errorEmail}
                helperText={errorEmail ? errorEmail && "* Email" : "* Email"}
              />
            <TextField
              value={employee.phone} size="small"
              onChange={e => setEmployee({ ...employee, phone: e.target.value })
              }
              error={errorPhone}
              helperText={errorPhone ? errorPhone && "* Phone (xxx)xxx-xxxx" : "* Phone"}
            />
      </Grid>

      {/*-------------------- SCHEDULE --------------------*/}
      <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="b1" sx={{fontWeight: 800}}>Week 1:</Typography>
      </Grid>
      {/* Schedule day selectors */}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        {/* Mapping through days of the week array to render buttons for week1 */}
        {daysOfWeek.map((day, index) => (
          <Grid key={index + 1} item xs={2}>
            <Card elevation={2} xs={{ height: '30vh' }}>
              <CardActionArea component={Button}
                disabled={false}
                onClick={() => {

                  if (!week1[index + 1]) {
                    setWeek1({ ...week1, [index + 1]: true })
                  }
                  else {
                    setWeek1({ ...week1, [index + 1]: false })
                  }
                }}
              >

                <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: week1[index+1]? '#4a5061' : 'none', height: '3vh', alignItems: 'center' }}>
                  <Typography sx={{color: week1[index+1] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>{day}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Grid item xs={1.5} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="b1" sx={{fontWeight: 800}}>Week 2:</Typography>
      </Grid>

      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 3}} >
        {/* Mapping through days of the week array to render buttons for week2 */}
        {daysOfWeek.map((day, index) => (
          <Grid key={index + 1} item xs={2}>
            <Card elevation={2} xs={{ height: '30vh' }}>
              <CardActionArea component={Button}
                onClick={() => {
                  if (!week2[index + 1]) {
                    setWeek2({ ...week2, [index + 1]: true })
                  }
                  else {
                    setWeek2({ ...week2, [index + 1]: false })
                  }
                }}
              >
                <CardContent sx={{ display:'flex', justifyContent: 'center',backgroundColor: week2[index+1]? '#4a5061' : 'none', height: '3vh', alignItems: 'center' }}>
                  <Typography sx={{color: week2[index+1] ? 'whitesmoke' : '#4a5061', fontWeight: 800 }}>{day}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/*-------------------- BUTTONS --------------------*/}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "10%", mb: 1, mx: 3}}>
        
          <Button variant="outlined" color="info" onClick={() => dispatch({type: 'SET_MODAL_STATUS'})}>Back</Button>

          {/* SAVE BUTTON */}
          <Button variant="contained" color="secondary" onClick={() => {checkInputs()}}>Submit</Button>

      </Box>
    </Grid>
  );
};

export default AddEmployee;