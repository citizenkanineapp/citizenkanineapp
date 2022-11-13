import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAllEmployees(){
    // console.log('saga getting request to fetch employees');
    try{
        const employees = yield axios({
            method: 'GET',
            url: '/api/employees'
        })
        yield put({
            type: 'SET_EMPLOYEES',
            payload: employees.data
        })
    }
    catch {
        console.log('error in fetchAllEmployees');
    }
}

// This function gets all the employee schedule data for week1 to autofill the employee schedule calendar. 
function* fetchOddEmpSchedules (){
    try{
        const empSchedule = yield axios({
            method: 'GET',
            url: '/api/employees/schedules/odd'
        })
        // yield console.log(empSchedule.data);
        yield put({
            type: 'SET_EMP_SCHEDULE_ODD',
            payload: empSchedule.data
        })
    }
    catch {
        console.log('error in fetchOddEmpSchedules');
    }
}

// This function gets all the employee schedule data for week2 to autofill the employee schedule calendar. 
function* fetchEvenEmpSchedules (){
    try{
        const empSchedule = yield axios({
            method: 'GET',
            url: '/api/employees/schedules/even'
        })
        // yield console.log(empSchedule.data);
        yield put({
            type: 'SET_EMP_SCHEDULE_EVEN',
            payload: empSchedule.data
        })
    }
    catch {
        console.log('error in fetchEvenEmpSchedules');
    }
}

// This function gets the selected employee schedule details for both week1 and week2.
function* fetchEmpSchedule(action){
    const empID = action.payload
    try{
        const empSchedule = yield axios({
            method: 'GET',
            url: `/api/employees/schedule/${empID}`
        })
        yield console.log(empSchedule.data);
        yield put({
            type: 'SET_EMPLOYEE_SCHEDULE',
            payload: empSchedule.data
        })
        yield put({
            type: 'SET_EDIT_EMP_SCHEDULE1',
            payload: empSchedule.data[0]
        })
        yield put({
            type: 'SET_EDIT_EMP_SCHEDULE2',
            payload: empSchedule.data[1]
        })
    }
    catch {
        console.log('error in fetchEmpSchedules');
    }
}

function* updateEmpDetails(action){
    const updatedEmp = action.payload;
    try{
        const empDetails = yield axios({
            method: 'PUT',
            url: '/api/employees/details',
            data: updatedEmp
        })
        // updates the selectedEmployee reducer so that the details page will render the updated employee details
        yield put({
            type: 'SET_EMPLOYEE',
            payload: updatedEmp
        })
        yield put({
            type: 'SAGA_FETCH_EMPLOYEES'
        })
    }
    catch {
        console.log('error in updateEmpDetails');
    }
}

function* updateEmpSchedule(action){
    const updatedEmpSchedules = action.payload;
    // [{week1 schedule}, {week2 schedule}]
    try{
        const empSchedule = yield axios({
            method: 'PUT',
            url: '/api/employees/schedules',
            data: updatedEmpSchedules
        })
    }
    catch {
        console.log('error in updateEmpSchedule');
    }
}

function* addEmployee(action){
    const newEmployee = action.payload;
    try{
        const employeeAdded = yield axios({
            method: 'PUT',
            url: '/api/employees',
            data: newEmployee
        })
        yield put({
            type: 'SAGA_FETCH_EMPLOYEES'
        })
    }
    catch {
        console.log('error in addEmployee');
    }
}


function* employeesSaga(){
    yield takeLatest('SAGA_FETCH_EMPLOYEES', fetchAllEmployees),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_ODD', fetchOddEmpSchedules),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_EVEN', fetchEvenEmpSchedules),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULE', fetchEmpSchedule),
    yield takeLatest('SAGA_UPDATE_EMP_DETAILS', updateEmpDetails),
    yield takeLatest('SAGA_UPDATE_EMP_SCHEDULE', updateEmpSchedule),
    yield takeLatest('SAGA_ADD_EMPLOYEE', addEmployee)
}

export default employeesSaga;