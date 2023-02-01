import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import swal from 'sweetalert';


// // this standalone connect will be phased out.
// function* authorizationRequest (action) {
//     // console.log('arrived in saga for authorization request')
//     try {
//         const uri = yield axios({
//             method: 'GET',
//             url: '/api/oauth2/connect_handler'
//         })
//         console.log('in QB saga', uri);
//     }
//     catch {
//         console.log('error in authorizationRequest');
//     }
  
// }

// //this function fetches all QB clients and then calls post route to add to DB
// function* fetchQbCustomers (action) {
//     console.log('arrived in saga for fetching qb customers')
//     try {
//         const customers = yield axios({
//             method: 'GET',
//             url: '/api/quickbooks/customer'
//         })
//         console.log(customers)
//         if (customers.data === 'connectToQB'){
//             location.href = "http://localhost:5000/api/oauth2/connect_handler"
//         }
//       /* Call function that will be post route to add QB clients to DB */
//       yield put({
//         type: 'POST_QB_CLIENTS',
//         payload: customers.data
//     })

//     }
//     catch {
//         console.log('error in fetchQbCustomers');
//     }
// }

//this function fetches all QB Services and then calls post route to add to DB
function* fetchServices (action) {
    console.log('arrived in saga for fetching qb services')
    try {
        const services = yield axios({
            method: 'GET',
            url: '/api/qb_services'
        })
        if (services.status === 201) {
            swal("Services updated!");
            console.log(services.status)
        }
        if (services.data === 'connectToQB'){
             location.href = "http://localhost:5000/api/oauth2/connect_handler"
            //location.href = "http://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

        }


    }
    catch {
        console.log('error in services request');
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
            //location.href = "http://localhost:5000/api/oauth2/connect_handler"
            location.href = "http://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

        }

        /* Call function that will be post route to add QB clients to DB */
        yield put({
            type: 'POST_QB_CLIENTS',
            payload: customers.data
        })
    }
    catch {
        console.log('error in createQbInvoice');
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
        console.log('Unique customer objects:', uniqueCustomers)

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

//For checking for updates to existing clients and updating them
function* quickBooksSync (action) {
    console.log('arrived in saga for updating qb customers')
    const qbCustomers = yield axios.get('/api/quickbooks/customer')
    const dbCustomers = yield axios.get('/api/clients')
    let qbResult = qbCustomers.data
    let dbResult = dbCustomers.data
        console.log('Quickbooks customers:', qbResult)
        console.log('Database customers:', dbResult)

    if (qbResult.data === 'connectToQB'){
       location.href = "http://localhost:5000/api/oauth2/connect_handler"
        //location.href = "http://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

        console.log('need to connect to qb')
    }


    /*If there is nothing in the database, proceed with adding all QB
    customers to the DB */
    else if(dbResult.length === 0){
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
    // yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
    // yield takeLatest('GET_QB_CUSTOMERS', fetchQbCustomers);
    yield takeLatest('GET_QB_SERVICES', fetchServices);

    yield takeLatest('CREATE_QB_INVOICE', createQbInvoice);
    yield takeLatest('POST_QB_CLIENTS', addAllQbCustomers);
    yield takeLatest('UPDATE_ALL_QB_CUSTOMERS', updateAllQbCustomers);
    yield takeLatest('QUICKBOOKS_SYNC', quickBooksSync)

}

export default quickBooksSaga;