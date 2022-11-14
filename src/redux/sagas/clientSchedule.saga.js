import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchClientDogs(action){
    const client_id = action.payload;
    try{
        const clientDogs = yield axios({
            method: 'GET',
            url: `/api/clientSchedule/${client_id}`
        })
        // yield put({
        //     type: 'SET_EMPLOYEES',
        //     payload: employees.data
        // })
    }
    catch {
        console.log('error in fetchClientDogs');
    }
}


function* clientScheduleSaga(){
    yield takeLatest('SAGA_FETCH_DOGS', fetchClientDogs)
}

export default clientScheduleSaga;