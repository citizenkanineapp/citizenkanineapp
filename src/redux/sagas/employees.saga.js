import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAllEmployees() {
    // console.log('saga getting request to fetch employees');
    try {
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
function* fetchOddEmpSchedules() {
    try {
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
function* fetchEvenEmpSchedules() {
    // console.log('in fetchEvenEmpSchedules')
    try {
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
function* fetchEmpSchedule(action) {
    const empID = action.payload
    try {
        const empSchedule = yield axios({
            method: 'GET',
            url: `/api/employees/schedule/${empID}`
        })
        // yield console.log(empSchedule.data);
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

function* updateEmpDetails(action) {
    const updatedEmp = action.payload;
    try {
        // console.log('in updateEmpDetails')
        const empDetails = yield axios({
            method: 'PUT',
            url: '/api/employees/details',
            data: updatedEmp
        })
        // console.log('post axiosPUT')
        // updates the user's admin status after employee details are updated.
        yield axios({
            method: 'PUT',
            url: '/api/user/admin',
            data: { admin: updatedEmp.admin, emp_id: updatedEmp.id }
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

function* updateEmpSchedule(action) {
    const updatedEmpSchedules = action.payload;
    // [{week1 schedule}, {week2 schedule}]
    try {
        // console.log('in updateEmpSchedule)')
        const empSchedule = yield axios({
            method: 'PUT',
            url: '/api/employees/schedules',
            data: updatedEmpSchedules
        })
        // updates schedules reducer so calender view renders with changed schedule
        yield put({
            type: 'SAGA_FETCH_EMP_SCHEDULES_ODD'
        })
        yield put({
            type: 'SAGA_FETCH_EMP_SCHEDULES_EVEN'
        })
    }
    catch {
        console.log('error in updateEmpSchedule');
    }
}

function* addEmployee(action) {
    const newEmployee = action.payload;
    const email = newEmployee[0].email;
    const admin = newEmployee[0].admin;

    try {
        const employeeAdded = yield axios({
            method: 'POST',
            url: '/api/employees',
            data: newEmployee
        })
        const emp_id = employeeAdded.data.emp_id;
        const newUser = { emp_id: emp_id, username: email, email: email, admin: admin }
        // yield console.log(emp_id);
        // {emp_id: #}
        // ADDING USER:
       // yield console.log('newUser:', newUser)
        yield put({
            type: 'REGISTER_EMP_USER',
            payload: newUser
        })
        yield put({
            type: 'SAGA_FETCH_EMPLOYEES'
        })
    }
    catch {
        console.log('error in addEmployee');
    }
}

function* deleteEmployee(action) {
    //console.log('Employee ID to delete', action.payload);
    let employeeID = action.payload;
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/employees/${employeeID}`
        })
        yield put({
            type: 'SAGA_FETCH_EMPLOYEES'
        })

    } catch {
        console.log('error in Employee Delete');
    }
}

function* addEmpScheduleChange(action){
    const change = action.payload;
    try {
        yield axios({
            method: 'POST',
            url: '/api/employees/schedule',
            data: change
        })
        yield put({
            type: 'SAGA_FETCH_CHANGES'
        })

    } catch {
        console.log('error in Adding Employee Schedule Change');
    }
}

function* fetchEmpChanges(){
    // console.log('getting request')
    try{
        const changes = yield axios({
            method: 'GET',
            url: '/api/employees/changes'
        })
    
    yield put({
        type: 'SET_EMP_SCHEDULE_CHANGES',
        payload: changes.data
    })
    }
    catch {
        console.log('error in Fetching Emp Schedule Changes');
    }
}

function* selectRouteForToday(){
    try {
        yield axios({
            method: 'POST',
            url: '/api/history',
            data: action.payload
        })
    } catch (err) {
        console.log('error setting packleader route for today', err);
    }
}

function* getRouteHistory(action){
    // console.log('here')
    const date = action.payload
    try {
        const routeHistory = yield axios ({
            method: 'GET',
            url: `/api/history/${date}`
        })
        yield put({
            type: 'SET_ROUTE_HISTORY_MODAL',
            payload: routeHistory.data
        })
    } catch (err) {
        console.log ('error in getting route history', err);
    }
}

function* employeesSaga() {
        yield takeLatest('SAGA_FETCH_EMPLOYEES', fetchAllEmployees),
        yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_ODD', fetchOddEmpSchedules),
        yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_EVEN', fetchEvenEmpSchedules),
        yield takeLatest('SAGA_FETCH_EMP_SCHEDULE', fetchEmpSchedule),
        yield takeLatest('SAGA_UPDATE_EMP_DETAILS', updateEmpDetails),
        yield takeLatest('SAGA_UPDATE_EMP_SCHEDULE', updateEmpSchedule),
        yield takeLatest('SAGA_ADD_EMPLOYEE', addEmployee),
        yield takeLatest('SAGA_DELETE_EMPLOYEE', deleteEmployee),
        yield takeLatest('SAGA_ADD_EMP_CHANGE', addEmpScheduleChange),
        yield takeLatest('SAGA_FETCH_CHANGES', fetchEmpChanges),
        yield takeLatest('SAGA_SELECT_ROUTE', selectRouteForToday),
        yield takeLatest('SAGA_GET_ROUTE_HISTORY', getRouteHistory)

}

export default employeesSaga;