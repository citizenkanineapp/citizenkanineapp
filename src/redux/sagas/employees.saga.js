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

function* fetchEmpSchedules (){
    try{
        const empSchedule = yield axios({
            method: 'GET',
            url: '/api/employees/schedules'
        })
        yield console.log(empSchedule.data);
        // yield put({
        //     type: 'SET_EMP_SCHEDULE',
        //     payload: employees.data
        // })
    }
    catch {
        console.log('error in fetchEmpSchedules');
    }
}

function* employeesSaga(){
    yield takeLatest('SAGA_FETCH_EMPLOYEES', fetchAllEmployees),
    yield takeLatest('SAGA_FETCH_EMP_SCHEDULES', fetchEmpSchedules)
}

export default employeesSaga;