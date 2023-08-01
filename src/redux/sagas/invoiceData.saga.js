import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInvoiceData(action) {
    try {
        console.log('action in invoice saga', action.payload);
        const invoiceItems = yield axios.get(`/api/invoice`, {
            params: {
                clientId: action.payload.clientId,
                email: action.payload.email,
                month: action.payload.month,
                year: action.payload.year
            }
        });
        if(invoiceItems.data === ''){
            console.log('no returned data')
        } else {
            console.log('invoices: ', invoiceItems.data)
        }
        // console.log('does it hit this', invoiceItems.data)
        yield put ({type: 'SET_INVOICE_DATA', payload: invoiceItems.data}); 
    } catch (error) {
        console.log(error);
    }
}

function* InvoiceDataSaga() {
  yield takeLatest('FETCH_INVOICE_DATA', fetchInvoiceData);
}

export default InvoiceDataSaga;