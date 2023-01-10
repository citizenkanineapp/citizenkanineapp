import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* authorizationRequest (action) {
    console.log('arrived in saga for authorization request')
    try {
        const authToken = yield axios({
            method: 'POST',
            url: '/api/quickbooks/trigger'
        })
        // yield put({
        //     type: '',
        //     payload: authToken.data
        // })
    }
    catch {
        console.log('error in authorizationRequest');
    }
  
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
}

export default quickBooksSaga;
