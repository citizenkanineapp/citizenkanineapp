import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

//MUI
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, styled, Typography } from '@mui/material';
import { LocalizationProvider, PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

//modal css
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    pt: 2,
    px: 4,
    pb: 3,
  };

function EmployeeScheduleChangesModal (props) {

    const dispatch = useDispatch();
    const initialDate =()=> {
        if(dayjs().$W === 0 || dayjs().$W === 6){
          return dayjs().add(1, 'day');
        }
        else{
          return dayjs();
      }}
    const [date, setDate] = useState(initialDate);
    const [dateValues, setDateValues] = useState([initialDate()]);
    const [employee, setEmployee] = useState('');
    const [scheduled, setScheduled] = useState('');

    const [empChange, setEmpChange] = useState({emp_id:'', date_to_change:`${date.$y}-${date.$M + 1}-${date.$D}`, is_scheduled: ''});
  const allEmployees = useSelector(store=> store.allEmployeesReducer.employees);
  const changes = useSelector(store=> store.allEmployeesReducer.empScheduleChanges);

  // adds or removes dates to the dateValues array.
  const handleDatesChange = (date) => {
    console.log('in handleDatesChange')
    console.log(date.$M, date.$D)
    const valueArray = [...dateValues];

    const index = valueArray.findIndex((item) => (item.$y === date.$y) && (item.$M === date.$M) && (item.$D === date.$D));

    // if current date matches existing date at index >=0, remove date from array.
    // else, add date to array.
    if (index >=0) {
      valueArray.splice(index, 1);
      // console.log(index, valueArray);
    } else {
      valueArray.push(date);
      // console.log(index, valueArray);
    }
    setDateValues(valueArray);
  }

  const handleSubmit = () => {
    // dispatch change to be added to database
    const changeDates = [];
    dateValues.forEach(date => changeDates.push(`${date.$y}-${date.$M + 1}-${date.$D}`));

    console.log('changeDates:', changeDates)
    let newChanges = [];
    if (changeDates.length > 0){
        changeDates.map(date => {
            let thisChange = { emp_id: employee, date_to_change: date, is_scheduled: scheduled}
            newChanges.push(thisChange)
        })
    }
    console.log('newChanges:', newChanges)

    if (newChanges.length > 0 && employee){
         dispatch({
      type: 'SAGA_ADD_EMP_CHANGE',
      payload: newChanges
    })
    setEmployee('');
    setScheduled('');
    setDateValues([initialDate()]);
    props.setShowModal(false)  
    }

  }

  const handleClose = () => {
    setEmployee('');
    setScheduled('');
    setDateValues([initialDate()]);
    props.setShowModal(false);
  }
    
    const isWeekend = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) => prop !== "selected"
      })(({ theme, selected }) => ({
        ...(selected && {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark
          },
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%"
        })
      }));

// renderPickersDay is called by 'renderDay' prop on StaticDatePicker. iterates over displayed dates and renders a styled PickersDay componentfor each date.
  // I don't quite understand props, but 'selected' targets dates in dateValues array and applies CustomPickersDay styling to them.
  // selectedDates is apparently a required prop, otherwise all dates are rendered as current day (on 8/22, a month of 8/22s)
  const renderPickersDay = (date, selectedDates, pickersDayProps) => {
    if (!dateValues) {
      return <CustomPickersDay {...pickersDayProps} />
    }
    const selected = dateValues.find((item) => (item.$y === date.$y) && (item.$M === date.$M) && (item.$D === date.$D));
    // if (selected){console.log('selected', selected)}
    return (
      <CustomPickersDay
        {...pickersDayProps}
        selected={selected}
      />
    );
  };

return (
    <div className='container'>
    <Modal
        open={props.open}
        onClose={props.onClose}
        setShowModal={props.setShowModal}
    >
    <Box 
    sx={{ ...style, width: 'auto', height: 'auto', outline: 'none', borderRadius: '5px', display: 'flex-column', alignContent: 'center', justifyContent: 'center' }}
    >
                  <FormControl  sx={{width: 'auto', minWidth: '15vw' }}>
            <InputLabel>Employee</InputLabel>

            <Select value={employee} onChange={(e) => setEmployee(e.target.value)}>
                {allEmployees && allEmployees.map(employee => {
                    return (
                        <MenuItem key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name}</MenuItem>
                    )
                })}
            </Select>
          </FormControl>

          <FormControl  sx={{width: 'auto', minWidth: '15vw' }}>
            <InputLabel>Change Type</InputLabel>
            <Select value={scheduled} onChange={(e) => setScheduled(e.target.value)}>
              <MenuItem value={true}>Add Employee</MenuItem>
              <MenuItem value={false}>Remove Employee</MenuItem>
            </Select>
          </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                shouldDisableDate={isWeekend}
                inputFormat="MM/DD/YYYY"
                // value={date}
                label="Date(s) To Change"
                onChange={handleDatesChange}
                renderDay={renderPickersDay}
                renderInput={(params) => {
                  return <TextField {...params} sx={{ mt: 2, mr: 4, pb: 1, width: '20vw' }} />
                }}
            />
          </LocalizationProvider>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button variant='outlined' color='secondary'  sx={{height: '70%'}} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color='secondary' onClick={handleSubmit} sx={{height: '70%'}}> Submit</Button>
          </Box>
    </Box>
    </Modal>
    </div>
);
}

export default EmployeeScheduleChangesModal;