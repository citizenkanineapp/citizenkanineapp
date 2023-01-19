import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// this standalone connect will be phased out.
function* authorizationRequest (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/oauth2/connect_handler'
        })
        console.log('in QB saga', uri);

        // I DON"T KNOW IF WE WANT TO SET URI TO DATA.
        // yield put({
        //     type: 'SET_AUTH_URL',
        //     payload: uri.data
        // })
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
        if (customers.data === 'connectToQB'){
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
        }
        // yield put({
        //     type: 'SET_AUTH_URL',
        //     payload: uri.data
        // })
    }
    catch {
        console.log('error in authorizationRequest');
    }
}

function* createQbInvoice (action) {
    // console.log('in createQbInvoice saga');
    const invoiceItems = action.payload;
    try {
        const invoiceResponse = yield axios({
            method: 'POST',
            url: '/api/qbInvoice',
            data: invoiceItems
        })
        console.log(invoiceResponse)
        if (invoiceResponse.data === 'connectToQB'){
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
        }
        // yield put({
        //     type: 'SET_AUTH_URL',
        //     payload: uri.data
        // })
    }
    catch {
        console.log('error in authorizationRequest');
    }
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
    yield takeLatest('GET_QB_CUSTOMERS', fetchQbCustomers);
    yield takeLatest('CREATE_QB_INVOICE', createQbInvoice)
}

export default quickBooksSaga;
