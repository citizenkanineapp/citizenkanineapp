import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch } from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function AddEmployee() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({ first_name: '', last_name: '', phone: '', street: '', city: '', zip: '', email: '' })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
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
    <Grid className="container" sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', pr: 2, justifyContent: 'center', ml: 1, mt: 3, width: '65vw' }}>
      <Grid sx={{ display: 'flex', justifyContent: 'right', mb: 1 }}>
        <Switch
          checked={admin}
          onChange={handleSwitch}
        />
        <SupervisorAccountIcon style={{ fontSize: 36, color: '#e0603f' }} />
      </Grid>
      {/*-------------------- TEXT FIELDS --------------------*/}
      <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%" }}>
        <TextField
          value={employee.first_name} size="small"
          onChange={e => setEmployee({ ...employee, first_name: e.target.value })
          }
          error={errorFirst}
          helperText={errorFirst ? errorFirst && "* First Name" : "* First Name"}
        />
        <TextField
          value={employee.last_name} size="small"
          onChange={e => setEmployee({ ...employee, last_name: e.target.value })
          }
          error={errorLast}
          helperText={errorLast ? errorLast && "* Last Name" : "* Last Name"}
        />
        <TextField
          value={employee.phone} size="small"
          onChange={e => setEmployee({ ...employee, phone: e.target.value })
          }
          error={errorPhone}
          helperText={errorPhone ? errorPhone && "* Phone (xxx)xxx-xxxx" : "* Phone"}
        />
      </Grid>

      <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%" }}>
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
      </Grid>

      <Grid sx={{ display: 'grid', gap: 1, height: "20%", width: 273.09 }}>
        <TextField
          value={employee.email} size="small"
          onChange={e => setEmployee({ ...employee, email: e.target.value })
          }
          error={errorEmail}
          helperText={errorEmail ? errorEmail && "* Email" : "* Email"}
        />
      </Grid>


      {/* Schedule day selectors */}
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'left', mt: 2 }}>
          <Typography variant="h6">Week 1:</Typography>
        </Grid>

        {/* Mapping through days of the week array to render buttons for week1 */}
        {daysOfWeek.map((day, index) => (
          <Grid key={index + 1} item xs={2}>
            <Card>
              <CardActionArea component={Button}
                onClick={() => {

                  if (!week1[index + 1]) {
                    setWeek1({ ...week1, [index + 1]: true })
                  }
                  else {
                    setWeek1({ ...week1, [index + 1]: false })
                  }
                }}
              >

                <CardContent sx={{ display: 'flex', justifyContent: 'center', backgroundColor: week1[index + 1] ? '#7BCEC8' : 'none' }}>
                  <Typography variant="h7" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 1 }} >
        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'left', mt: 2 }}>
          <Typography variant="h6">Week 2:</Typography>
        </Grid>

        {/* Mapping through days of the week array to render buttons for week2 */}
        {daysOfWeek.map((day, index) => (
          <Grid key={index + 1} item xs={2}>
            <Card>
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
                <CardContent sx={{ display: 'flex', justifyContent: 'center', backgroundColor: week2[index + 1] ? '#7BCEC8' : 'none' }}>
                  <Typography variant="h7" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "5%", mt: 3 }}>

        {/* DELETE BUTTON */}
        <Button variant="contained" sx={{ ml: 2 }}>Delete</Button>
        {/* CANCEL BUTTON */}
        <Box sx={{ width: "24%", display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => dispatch({ type: 'SET_MODAL_STATUS' })}>Cancel</Button>  {/*goes back to Employee list*/}
          {/* SAVE BUTTON */}
          <Button onClick={() => {
            checkInputs()
          }}>Submit</Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddEmployee;