import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import { Box, Button, TextField, Typography, Grid, Avatar, Card, CardContent, CardActionArea, Switch } from "@mui/material";
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

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const deleteEmployee = async (employee) => {
    console.log(employee.id);
    let employeeID = employee.id;
    await dispatch({ type: 'SAGA_DELETE_EMPLOYEE', payload: employeeID })

    await dispatch({ type: 'SET_MODAL_STATUS' })
  }
  return (
    <Grid className="container" sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', pr: 2, justifyContent: 'center', ml: 1, mt: 3, width: '65vw' }}>
      <Grid sx={{ display: 'flex', justifyContent: 'right', mb: 1 }}>
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
        <SupervisorAccountIcon style={{ fontSize: 36, color: '#e0603f' }} />
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
        <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'left', mt: 2 }}>
          <Typography variant="h6">Week 1:</Typography>
        </Grid>

        {/* Mapping through days of the week array to render buttons for week1 */}
        {daysOfWeek.map((day, index) => (
          <Grid key={index + 1} item xs={2}>
            <Card raised xs={{ height: '30vh' }}>
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

                <CardContent sx={{ display: 'flex', justifyContent: 'center', backgroundColor: week1[index + 1] ? '#7BCEC8' : 'none', height: '3vh', alignItems: 'center' }}>
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
            <Card raised xs={{ height: '30vh' }}>
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
                <CardContent sx={{ display: 'flex', justifyContent: 'center', backgroundColor: week2[index + 1] ? '#7BCEC8' : 'none', height: '3vh', alignItems: 'center' }}>
                  <Typography variant="h7" sx={{ textTransform: 'capitalize' }}>{day}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: "5%", mt: 3 }}>

        {/* DELETE BUTTON */}
        <Button variant="contained" sx={{ ml: 2 }}
          onClick={() => deleteEmployee(employee)}>Delete</Button>

        {/* CANCEL BUTTON */}
        <Box sx={{ width: "24%", display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined" color="info"
            onClick={() => {
              dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails' })
            }}>
            Cancel
          </Button>  {/*goes back to Employee list*/}
          {/* SAVE BUTTON */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
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
              dispatch({ type: 'SET_EMPLOYEE_MODAL', payload: 'EmployeeDetails' })
            }}>Save</Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default EmployeeForm;