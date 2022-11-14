import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInvoiceData() {
    try {
        const clients = yield axios.get('/api/invoice');
        // console.log(clients.data)
        // yield put ({type: 'SET_CLIENTS', payload: clients.data}); 
    } catch (error) {
        console.log(error);
    }
}

function* InvoiceDataSaga() {
  yield takeLatest('FETCH_INVOICE_DATA', fetchInvoiceData);
}

export default InvoiceDataSaga;