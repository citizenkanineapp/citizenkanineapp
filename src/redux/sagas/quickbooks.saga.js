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

        /* Call function that will be post route to add QB clients to DB */
        yield put({
            type: 'POST_QB_CLIENTS',
            payload: customers.data
        })
    }
    catch {
        console.log('error in authorizationRequest');
    }
  
}

/*This function adds customers to DB from QB*/
function* addAllQbCustomers(action){
    console.log('arrived in add QB clients route', action.payload);

    try {
        const qbClients = yield axios({
            method: 'POST',
            url: '/api/quickbooks/qbcustomers',
            data: action.payload
        })
        
        //testing if I can call a saga function in a different saga file
        yield put ({type: 'FETCH_CLIENTS'});
        
    } catch (error) {
        console.log(error);
        alert('Error adding QB customers');
    }
    
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
    yield takeLatest('GET_QB_CUSTOMERS', fetchQbCustomers);
    yield takeLatest('POST_QB_CLIENTS', addAllQbCustomers);
}

export default quickBooksSaga;
