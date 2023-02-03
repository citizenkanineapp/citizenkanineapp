import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchClientScheduleChanges(action){
    const client_id = action.payload;
    try{
        const clientChanges = yield axios({
            method: 'GET',
            url: `/api/clientSchedule/${client_id}`
        })
        console.log('does it come back from server (client schedule changes', clientChanges.data )
        yield put({
            type: 'SET_CLIENT_SCHEDULE_CHANGES',
            payload: clientChanges.data
        })
    }
    catch {
        console.log('error in fetchClientDogs');
    }
}


function* clientScheduleSaga(){
    yield takeLatest('SAGA_FETCH_CLIENT_SCHEDULE_CHANGES', fetchClientScheduleChanges)
}

export default clientScheduleSaga;