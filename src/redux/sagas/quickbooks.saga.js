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

//this function fetches all QB clients and then calls post route to add to DB
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
        
        //fetches clients from CK database
        yield put ({type: 'FETCH_CLIENTS'});
        
    } catch (error) {
        console.log(error);
        alert('Error adding QB customers');
    }
    
}

function* updateAllQbCustomers(action){
    console.log('arrived in function to compare DB to QB');
        /* These two axios calls get the DB and QB customers */
        const qbCustomers = yield axios.get('/api/quickbooks/customer')
        const dbCustomers = yield axios.get('/api/clients')
        let qbResult = qbCustomers.data
        let dbResult = dbCustomers.data
        // console.log('Quickbooks customers:', qbResult)
        // console.log('Database customers:', dbResult)

         /* These functions compare the ids and stores unique customer IDs 
         to the variable uniqueIds*/
        let initialCustomers = new Set(dbResult.map(({qb_id}) => qb_id))
        let uniqueCustomers = qbResult.filter(({qb_id}) => !initialCustomers.has(qb_id))
        // console.log('Unique customer objects:', uniqueCustomers)

         /* Post Route to Add Unique Customers to Database*/

         if (uniqueCustomers.length === 0){
            yield put ({type: 'FETCH_CLIENTS'});
            console.log('Clients are up to date')
         } else {
        try {
            const qbClients = yield axios({
                method: 'POST',
                url: '/api/quickbooks/qbcustomers',
                data: uniqueCustomers
         })
         
         //fetches clients from CK database
        yield put ({type: 'FETCH_CLIENTS'});

    } catch (error) {
        console.log(error);
        alert('Error updating QB customers!');
    }   
    } 
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
    yield takeLatest('GET_QB_CUSTOMERS', fetchQbCustomers);
    yield takeLatest('POST_QB_CLIENTS', addAllQbCustomers);
    yield takeLatest('UPDATE_ALL_QB_CUSTOMERS', updateAllQbCustomers);
}

export default quickBooksSaga;
