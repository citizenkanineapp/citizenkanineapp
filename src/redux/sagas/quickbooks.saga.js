import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//this function fetches all QB Services and then calls post route to add to DB
function* fetchServices (action) {
    console.log('arrived in saga for fetching qb services')
    try {
        const services = yield axios({
            method: 'GET',
            url: '/api/qb_services'
        })
        if (services.status === 201){
            yield put({ type: 'SERVICES_SYNCED' });
        } else if (services.data === 'connectToQB'){
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
        }
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

//For checking for updates to existing clients and updating them
function* quickBooksSync (action) {
    console.log('arrived in saga for updating qb customers')
    const qbCustomers = yield axios.get('/api/quickbooks/customer')
    const dbCustomers = yield axios.get('/api/clients')
    let qbResult = qbCustomers.data
    let dbResult = dbCustomers.data
        console.log('Quickbooks customers:', qbResult)
        console.log('Database customers:', dbResult)

    /*If there is nothing in the database, proceed with adding all QB
    customers to the DB */
    if(dbResult.length === 0){
        console.log('Nothing in the database')
        yield put ({type: 'UPDATE_ALL_QB_CUSTOMERS'});
    } else if (dbResult.length >= 1) {
        console.log('some clients already exist')
        let existingCustomerIds = new Set(dbResult.map(({qb_id}) => qb_id))
        let existingCustomers = qbResult.filter(({qb_id}) => existingCustomerIds.has(qb_id))
        let uniqueCustomers = qbResult.filter(({qb_id}) => !existingCustomerIds.has(qb_id))
        console.log('Unique customer objects in this route:', uniqueCustomers)
        console.log('existing customers', existingCustomers)
        

    /*Existing clients to be updated go here: */
        const combinedDataObject = {
            qb: existingCustomers,
            db: dbResult
        }

        try {
            const customersToUpdate = yield axios({
                method: 'PUT',
                url: '/api/quickbooks/customer/put',
                data: combinedDataObject
            })
            console.log('success in put route', customersToUpdate)
     /* Calls saga function that checks for new clients */
            yield put ({type: 'UPDATE_ALL_QB_CUSTOMERS'});
        }
        catch {
            console.log('error updating clients');
        }
    }
}

function* quickBooksSaga() {

    yield takeLatest('GET_QB_SERVICES', fetchServices);
    yield takeLatest('QUICKBOOKS_SYNC', quickBooksSync)

}

export default quickBooksSaga;
