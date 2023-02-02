import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import swal from 'sweetalert';

//this function fetches all QB Services and then calls post route to add to DB
// function* fetchServices (action) {
//     console.log('arrived in saga for fetching qb services')
//     try {
//         const services = yield axios({
//             method: 'GET',
//             url: '/api/qb_services'
//         })
//         if (services.status === 201) {
//             swal("Services updated!");
//             console.log(services.status)
//         } else if (services.data === 'connectToQB'){
//             location.href = "http://localhost:5000/api/oauth2/connect_handler"
//             //location.href = "https://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"
//         }


//     }
//     catch {
//         console.log('error in services request');
//     }
// }

function* createQbInvoice (action) {
    // console.log('in createQbInvoice saga');
    const invoiceItems = action.payload;
    try {
        const invoiceResponse = yield axios({
            method: 'POST',
            url: '/api/qbInvoice',
            data: invoiceItems
        })
        console.log(invoiceResponse);
        if (invoiceResponse.data === 'connectToQb') {
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
            //location.href = "http://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

        } else if (invoiceResponse.status === 201) {
            //don't knkow how to handle 201 status in router.
            swal("invoices sent!")
        } 
    }
    catch {
        console.log('error in createQbInvoice');
    }
}

/*This function adds customers to DB from QB on first sync only*/
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
    console.log('arrived in function to compare DB to QB', action.payload);
        let qbResult = action.payload.qb.data
        let dbResult = action.payload.db.data

         /* These functions compare the ids and stores unique customer IDs 
         to the variable uniqueIds*/
        let initialCustomers = new Set(dbResult.map(({qb_id}) => qb_id))
        let uniqueCustomers = qbResult.filter(({qb_id}) => !initialCustomers.has(qb_id))
        console.log('Unique customer objects from QB:', uniqueCustomers)

        let initialDbCustomers = new Set(qbResult.map(({qb_id}) => qb_id))
        let uniqueDbCustomers = dbResult.filter(({qb_id}) => !initialDbCustomers.has(qb_id))
        let idsToDelete = uniqueDbCustomers.map(client => client.qb_id)
        console.log('does it catch extra db client?', idsToDelete)

        /* No Changes to customer numbers. Ends here*/
         if (uniqueCustomers.length === 0 && idsToDelete.length === 0 ){
            yield put ({type: 'FETCH_CLIENTS'});
            console.log('Clients are up to date')
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
            //delete route goes here.  use drinks code from solo project to send multiple
            //ids
            console.log('does it hit delete block')
            let urlQuery = `/api/quickbooks/delete?ids=${idsToDelete}`
            const deleteClientsFromDB = yield axios.delete(`${urlQuery}`);
        }
    } catch (error) {
        console.log(error);
        alert('Error updating QB customers!');
    }  
            //fetches clients from CK database
            console.log('finished add/delete clients saga')
            yield put ({type: 'FETCH_CLIENTS'});
    }


//For checking for updates to existing clients and updating them
function* quickBooksSync (action) {

    // updates SERVICES.

    // const services = yield axios({
    //     method: 'GET',
    //     url: '/api/qb_services'
    // })
    // if (services.status != 201) {
    //     console.log( services)
    // } else {
    //     console.log('current services', services);
    // }

    console.log('arrived in saga for updating qb customers')
    const qbCustomers = yield axios.get('/api/quickbooks/customer')
    const dbCustomers = yield axios.get('/api/clients')
    let qbResult = qbCustomers.data
    let dbResult = dbCustomers.data
        console.log('Quickbooks customers:', qbResult)
        console.log('Database customers:', dbResult)

    if (qbResult === 'connectToQB'){
        console.log('need to connect to qb')
      location.href = "http://localhost:5000/api/oauth2/connect_handler"
        //location.href = "http://citizen-kanine.herokuapp.com/api/oauth2/connect_handler"

    }

    /*If there is nothing in the database, proceed with adding all QB
    customers to the DB */
    else if(dbResult.length === 0){
        console.log('Nothing in the database')
        yield put ({type: 'POST_QB_CLIENTS', payload: qbResult});
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
            console.log('success in put route', customersToUpdate)
     /* Calls saga function that checks for new clients */
            yield put ({type: 'UPDATE_ALL_QB_CUSTOMERS', payload: originalData});
        }
        catch {
            console.log('error updating clients');
        }
    }
}


function* checkTokenStatus (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const tokenStatus = yield axios.get('/api/quickbooks/token')
        console.log('is there a token right now?', tokenStatus.data)
        if(tokenStatus.data === true) {
            yield put ({type: 'QUICKBOOKS_SYNC'})
        } else {
            location.href = "http://localhost:5000/api/oauth2/connect_handler"
        }
    } catch {
        console.log('error in token route');
    }
}


function* quickBooksSaga() {
    // yield takeLatest('GET_QB_SERVICES', fetchServices);
    yield takeLatest('CREATE_QB_INVOICE', createQbInvoice);
    yield takeLatest('POST_QB_CLIENTS', addAllQbCustomers);
    yield takeLatest('UPDATE_ALL_QB_CUSTOMERS', updateAllQbCustomers);
    yield takeLatest('QUICKBOOKS_SYNC', quickBooksSync)
    yield takeLatest('CHECK_TOKEN', checkTokenStatus);
}

export default quickBooksSaga;