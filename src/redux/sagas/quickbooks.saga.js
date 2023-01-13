import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* authorizationRequest (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/quickbooks/connect_handler'
        })

        yield put({
            type: 'SET_AUTH_URL',
            payload: uri.data
        })
    }
    catch {
        console.log('error in authorizationRequest');
    }
  
}

function* fetchQbCustomers (action) {
    console.log('arrived in saga for fetching qb customers')
    try {
        const customers = yield axios({
            method: 'GET',
            url: '/api/quickbooks/customer'
        })
        console.log(customers)

        /* Here instead call a function that compares current clients to QB clients 
        and only POSTS the new ones to DB? */
        yield put({
            type: 'SET_QB_CLIENTS',
            payload: customers.data
        })
    }
    catch {
        console.log('error in authorizationRequest');
    }
  
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
    yield takeLatest('GET_QB_CUSTOMERS', fetchQbCustomers);
}

export default quickBooksSaga;
