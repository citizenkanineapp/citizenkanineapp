import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchServices() {
    try {
        const services = yield axios.get('/api/invoice/services');
        console.log(services.data);
    } catch (error) {
        console.log(error)
    }
}

function* fetchInvoiceData(action) {
    try {
        console.log(action.payload);
        //payload is search criteria: clientId, month, year.
        // const clients = yield axios.get(`/api/invoice?search=${action.payload}`);
        const clients = yield axios.get(`/api/invoice`, {
            params: {
                clientId: action.payload.clientId,
                month: action.payload.month,
                year: action.payload.year
            }
        });
        console.log(clients.data)
        // yield put ({type: 'SET_CLIENTS', payload: clients.data}); 
    } catch (error) {
        console.log(error);
    }
}

function* InvoiceDataSaga() {
  yield takeLatest('FETCH_INVOICE_DATA', fetchInvoiceData);
}

export default InvoiceDataSaga;