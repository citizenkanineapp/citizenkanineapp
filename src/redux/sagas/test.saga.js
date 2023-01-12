import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testAuthorizationRequest (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/test'
        })
    } catch {
        console.log('error in authorizationRequest');
    }
  
}

function* testSaga() {
    yield takeLatest('TEST_AUTHORIZATION', testAuthorizationRequest);
}

export default testSaga;
