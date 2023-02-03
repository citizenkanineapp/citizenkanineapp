import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import swal from 'sweetalert'


//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch, Tooltip } from "@mui/material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

function EmployeeForm() {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(store => store.selectedEmployeeReducer.selectedEmployee);
  const employee = useSelector(store => store.selectedEmployeeReducer.editEmpDetails);
  // console.log(employee);
  const selectedEmpSchedule = useSelector(store => store.selectedEmployeeReducer.selectedEmpSchedule);

  const employeeSchedule1 = useSelector(store => store.selectedEmployeeReducer.editEmpSchedule1);

  const employeeSchedule2 = useSelector(store => store.selectedEmployeeReducer.editEmpSchedule2);
  // console.log(employeeSchedule);
  const week1 = employeeSchedule1;
  const week2 = employeeSchedule2;

  const daysOfWeek = ['MON', 'TUES', 'WEDS', 'THURS', 'FRI'];

  const deleteEmployee = async (employee) => {
    let employeeID = employee.id;
    swal({
      title: "Are you sure?",
      text: "This will permanently delete this employee",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch({ type: 'SAGA_DELETE_EMPLOYEE', payload: employeeID })
            .then(dispatch({ type: 'SET_MODAL_STATUS' }))
          swal("Removed employee", {
            icon: "success",

          });
        } 
      });
  }

  const [errorFirst, setErrorFirst] = useState(false);
  const [errorLast, setErrorLast] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorStreet, setErrorStreet] = useState(false)
  const [errorZip, setErrorZip] = useState(false)
  const [errorCity, setErrorCity] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorRoute, setErrorRoute] = useState(false)
  const [errorFree, setErrorFree] = useState(true)
 // console.log(errorFree);
  //console.log(errorFirst)


  const checkInputs = (event) => {
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
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.last_name === undefined || employee.last_name === '') {
      setErrorLast(true)
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.phone === undefined || employee.phone === '' || employee.phone.length > 13) {
      setErrorPhone(true)
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.street === undefined || employee.street === '') {
      setErrorStreet(true)
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.city === undefined || employee.city === '') {
      setErrorCity(true)
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.zip === undefined || employee.zip === '' || employee.zip.length > 5) {
      setErrorZip(true)
      setErrorFree(false);
      // errorFree = true
    }
    else if (employee.email === undefined || employee.email === '') {
      setErrorEmail(true)
      setErrorFree(false);
      // errorFree = true
    }
    else {
      // send updated form data to server to update the database:
    dispatch({
      type: 'SAGA_UPDATE_EMP_DETAILS',
      payload: employee
    })
    // sends updated schedule data to server to update the database:
    dispatch({
      type: 'SAGA_UPDATE_EMP_SCHEDULE',
      payload: [week1, week2]
    })
    // This updates the selectedEmpSchedule reducer so that the details page will render the updated employee schedule
    dispatch({
      type: 'SET_EMPLOYEE_SCHEDULE',
      payload: [week1, week2]
    })
    dispatch({
      type: 'SET_EMPLOYEE_MODAL', 
      payload: 'EmployeeDetails' })
    }
  }



  
  return (
    <Grid className="container" sx={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%', height: '100%', justifyContent: 'center', gap: 2}}>
      <Grid sx={{display: 'flex', flexDirection: 'row', height: "15%",justifyContent: 'space-between', mt: 5, mb: 1, mx: 10 }}>
          <Box sx={{display: 'flex', flexDirection: 'row', width: '78%', my: 1, py: 1, gap: 2}}>
                  {/* <TextField
                    fullWidth
                    value={employee.first_name} helperText="First Name" size="small"
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_EMP_FIRST_NAME',
                        payload: e.target.value
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    value={employee.last_name} helperText="Last Name" size="small"
                    onChange={e =>
                      dispatch({
                        type: 'UPDATE_EMP_LAST_NAME',
                        payload: e.target.value
                      })
                    }
                  /> */}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 4}}>
              <Switch
                checked={employee.admin}
                onChange={() => {
                  if (!employee.admin) {
                    dispatch({
                      type: 'UPDATE_EMP_ADMIN',
                      payload: true
                    })
                  }
                  else {
                    dispatch({
                      type: 'UPDATE_EMP_ADMIN',
                      payload: false
                    })
                  }
                }}
              />
              <Tooltip title="Admin" placement="top-start">         
                <SupervisorAccountIcon style={{ fontSize: 36, color: '#e0603f' }} />
              </Tooltip>
        </Box>
      </Grid>
      {/*-------------------- TEXT FIELDS --------------------*/}
      <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%" }}>
        <TextField
          value={employee.first_name} helperText="First Name" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_FIRST_NAME',
              payload: e.target.value
            })
          }
        />
        <TextField
          value={employee.last_name} helperText="Last Name" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_LAST_NAME',
              payload: e.target.value
            })
          }
        />
        <TextField
          value={employee.phone} helperText="Phone" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_PHONE',
              payload: e.target.value
            })
          }
        />
      </Grid>

      <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr ', gap: 1, height: "20%" }}>
        <TextField
          value={employee.street} helperText="Street" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_STREET',
              payload: e.target.value
            })
          }
        />
        <TextField
          value={employee.city} helperText="City" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_CITY',
              payload: e.target.value
            })
          }
        />
        <TextField
          value={employee.zip} helperText="Zip" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_ZIP',
              payload: e.target.value
            })
          }
        />
      </Grid>

      <Grid sx={{ display: 'grid', gap: 1, height: "20%", width: 273.09 }}>
        <TextField
          value={employee.email} helperText="Email" size="small"
          onChange={e =>
            dispatch({
              type: 'UPDATE_EMP_PHONE',
              payload: e.target.value
            })
          }
        />
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
                    dispatch({
                      type: 'UPDATE_EMP_SCHEDULE1',
                      payload: { day: index + 1, change: true }

                    })
                  }
                  else {
                    dispatch({
                      type: 'UPDATE_EMP_SCHEDULE1',
                      payload: { day: index + 1, change: false }

                    })
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
                    dispatch({
                      type: 'UPDATE_EMP_SCHEDULE2',
                      payload: { day: index + 1, change: true }

                    })
                  }
                  else {
                    dispatch({
                      type: 'UPDATE_EMP_SCHEDULE2',
                      payload: { day: index + 1, change: false }

                    })
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
        <Box sx={{ width: "24%", display: "flex", justifyContent: "space-between" }}>
          {/* CANCEL BUTTON */}
          <Button
              variant="outlined" color="info"
              onClick={() => {
                dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails' })
              }}>
              Cancel
            </Button>  {/*goes back to Employee list*/}
        { /* DELETE BUTTON */}
          <Tooltip title="Delete Employee" placement="top">
            <Button variant="contained" sx={{ ml: 2 }}
              onClick={() => deleteEmployee(employee)}>Delete</Button>
          </Tooltip>
        </Box>
          {/* SAVE BUTTON */}
          <Button
            variant="contained"
            color="secondary"
            onClick={checkInputs}>Save</Button>
        </Box>
    </Grid>
  );
}

export default EmployeeForm;