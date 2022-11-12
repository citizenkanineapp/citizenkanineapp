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

function* fetchEmpSchedule(action){
    const empID = action.payload
    try{
        const empSchedule = yield axios({
            method: 'GET',
            url: `/api/employees/details/${empID}`
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
    }
    catch {
        console.log('error in fetchEmpSchedules');
    }



}

function* employeesSaga(){
    yield takeLatest('SAGA_FETCH_EMPLOYEES', fetchAllEmployees),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_ODD', fetchOddEmpSchedules),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULES_EVEN', fetchEvenEmpSchedules),
    yield takeLatest('FETCH_EMP_SCHEDULE', fetchEmpSchedule)
}

export default employeesSaga;