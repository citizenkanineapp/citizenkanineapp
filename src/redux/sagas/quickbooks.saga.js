import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import swal from 'sweetalert';

function* createQbInvoice (action) {
    // console.log('in createQbInvoice saga');
    const invoiceItems = action.payload;
    try {
        const invoiceResponse = yield axios({
            method: 'POST',
            url: '/api/qbInvoice',
            data: invoiceItems
        })
       // console.log(invoiceResponse);
        if (invoiceResponse.data === 'connectToQb') {
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
            // location.href = "https://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

        } else if (invoiceResponse.status === 201) {
            //don't knkow how to handle 201 status in router.
            swal("invoices sent!")
        } 
    }
    catch {
        //console.log('error in createQbInvoice');
    }
}

/*This function adds customers to DB from QB on first sync only*/
function* addAllQbCustomers(action){
   // console.log('arrived in add QB clients route', action.payload);

    try {
        const qbClients = yield axios({
            method: 'POST',
            url: '/api/quickbooks/qbcustomers',
            data: action.payload
        })
        
        //fetches clients from CK database
        yield put ({type: 'FETCH_CLIENTS'});
        
    } catch (error) {
       // console.log(error);
        alert('Error adding QB customers. Try connecting to QB again');
    }
    
}

function* updateAllQbCustomers(action){
   // console.log('arrived in function to compare DB to QB', action.payload);
        let qbResult = action.payload.qb.data
        let dbResult = action.payload.db.data

         /* These functions compare the ids and stores unique customer IDs 
         to the variable uniqueIds*/
        let initialCustomers = new Set(dbResult.map(({qb_id}) => qb_id))
        let uniqueCustomers = qbResult.filter(({qb_id}) => !initialCustomers.has(qb_id))
        //console.log('Unique customer objects from QB:', uniqueCustomers)

        let initialDbCustomers = new Set(qbResult.map(({qb_id}) => qb_id))
        let uniqueDbCustomers = dbResult.filter(({qb_id}) => !initialDbCustomers.has(qb_id))
        let idsToDelete = uniqueDbCustomers.map(client => client.qb_id)
       // console.log('does it catch extra db client?', idsToDelete)

        /* No Changes to customer numbers. Ends here*/
         if (uniqueCustomers.length === 0 && idsToDelete.length === 0 ){
            yield put ({type: 'FETCH_CLIENTS'});
           // console.log('Clients are up to date')
         } 
          /* Post Route and Delete Route to Handle Differing Databases*/
        try {
            if (uniqueCustomers.length > 0) {
            const qbClients = yield axios({
                method: 'POST',
                url: '/api/quickbooks/qbcustomers',
                data: uniqueCustomers
         })
        }
        if(idsToDelete.length >= 1){
            let urlQuery = `/api/quickbooks/delete?ids=${idsToDelete}`
            const deleteClientsFromDB = yield axios.delete(`${urlQuery}`);
        }
    } catch (error) {
       // console.log(error);
        alert('Error updating QB customers!');
    }  
            //fetches clients from CK database
           // console.log('finished add/delete clients saga')
            yield put ({type: 'FETCH_CLIENTS'});
    }


/* See Additional Notes At the Bottom of this File*/

/* Any time a QB sync happens, this function is called first.  The checks are as follows:
    1. For first sync, it will add all QB clients to DB
    2. It then checks for unique customers coming from QB
    3. Put route route for existing clients in both locations for data updates
    4. The next saga function (above) checks for new customers
        or customers to be deleted and then runs those routes 
        Note: Sever side handles the logic for adding and removing dogs*/

function* quickBooksSync (action) {

    // updates SERVICES. This could have been its own saga, but we wanted to minimize buttons and keep the interface simple. So, every time user wants to sync app DB with quickbooks,
    // it queries quickbooks both for services (item) and client (customer) data thru the API.

    const services = yield axios({
        method: 'GET',
        url: '/api/qb_services'
    })
    // if/else block handles the possibility that browser session.token is NULL (due to cleared cookies, for example), or
    // if tokens are expired. 
    if (services.status === 201) {
        console.log(services.status)
    } else if (services.data === 'connectToQB'){
        // console.log('services redirect')
        location.href = "http://localhost:5000/api/oauth2/connect_handler"
        // location.href = "https://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"
    }
        
   // console.log('arrived in saga for updating qb customers')
    const qbCustomers = yield axios.get('/api/quickbooks/customer')
    const dbCustomers = yield axios.get('/api/clients')
    let qbResult = qbCustomers.data
    let dbResult = dbCustomers.data
       
    
    // this duplicates the if/else block of lines 112-118. theoretcally, lines 114 should resolve before lines 121, but we aren't confident
    // these functions handle the asyncronous functions as we want. 
    if (qbResult === 'connectToQb'){
       // console.log('need to connect to qb')
        location.href = "http://localhost:5000/api/oauth2/connect_handler"
        // location.href = "https://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

    }

    /*If there is nothing in the database, proceed with adding all QB
    customers to the DB */
    else if(dbResult.length === 0){
       // console.log('Nothing in the database')
        yield put ({type: 'POST_QB_CLIENTS', payload: qbResult});
    } else if (dbResult.length >= 1 ) {
        //console.log('some clients already exist')
        let existingCustomerIds = new Set(dbResult.map(({qb_id}) => qb_id))
        let existingCustomers = qbResult.filter(({qb_id}) => existingCustomerIds.has(qb_id))
        let uniqueCustomers = qbResult.filter(({qb_id}) => !existingCustomerIds.has(qb_id))
       // console.log('Unique customer objects in this route:', uniqueCustomers)
       // console.log('existing customers', existingCustomers)
        
    /*Existing clients to be updated go here: */
        const combinedDataObject = {
            qb: existingCustomers,
            db: dbResult
        }

        const originalData = {
            qb: qbCustomers,
            db: dbCustomers
        }

        try {
            const customersToUpdate = yield axios({
                method: 'PUT',
                url: '/api/quickbooks/customer/put',
                data: combinedDataObject
            })
            //console.log('success in put route', customersToUpdate)
     /* Calls saga function that checks for new clients */
            yield put ({type: 'UPDATE_ALL_QB_CUSTOMERS', payload: originalData});
        }
            catch {
                alert('Error updating QB customers. Try connecting to QB again');
        }
    }
}



function* quickBooksSaga() {
    // yield takeLatest('GET_QB_SERVICES', fetchServices);
    yield takeLatest('CREATE_QB_INVOICE', createQbInvoice);
    yield takeLatest('POST_QB_CLIENTS', addAllQbCustomers);
    yield takeLatest('UPDATE_ALL_QB_CUSTOMERS', updateAllQbCustomers);
    yield takeLatest('QUICKBOOKS_SYNC', quickBooksSync)
}

export default quickBooksSaga;

/*For checking for updates to existing clients and updating them
    most of what happens inside of quickBooksSync AND updateAllQbCustomers should be moved server-side.

    We decided to handle this complicated object management client-side primarily due to path dependancy-- we started working with one large server script (quickbooks.router.js) which contained multiple endpoints.
    As we were building out these functions, we didn't realize the thing to do would have been to break out each endpoint into its own module so that we can send horizontal requests.

    We tried to address this at several times during development, but we had challenges with managing async functions in quickbooks.router.js ;
    for OAUTH, we relied on the Quickbooks node SDK. (server/modules/tools.js ). We have two hypothesis as to what was not working.
    1) the SDK/oauth tool uses 'request' module, not 'axios.' request needs an additional wrapper module in order to handle async. both modules are depreciated, and we did not have time to test async request.
    2) the server-side request functions at each endpoint pass all parameters--headers, req, res--through tool.checkForUnauthorized. this nested function made adapting the entire API call to axios very challenging.
    
    also, if this ever gets moved server-side, middleware in the /api/clients endpoint would need to be adjusted or removed.
    */