import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testAuthorizationRequest (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/redirect/test'
        })
        console.log(uri)
    } catch {
        console.log('error in authorizationRequest');
    }
  
}

function* testCors (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/oauth2/connect_handler'
        })
        console.log(uri)
    } catch {
        console.log('error in authorizationRequest');
    }
  
}


function* testSaga() {
    yield takeLatest('GET_HEROKU', testAuthorizationRequest);
    yield takeLatest('CONNECT_TEST', testCors);
}

export default testSaga;
