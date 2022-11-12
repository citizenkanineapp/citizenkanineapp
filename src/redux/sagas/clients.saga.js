import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* getALlClients(action){
    // console.log('arrived in get client route');
    try {
        const clients = yield axios.get('/api/clients');
        // console.log(clients.data)
        yield put ({type: 'SET_CLIENTS', payload: clients.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching clients');
    }
    
}

function* addClient(action){
    console.log('arrived in add client route', action.payload);

    try {
        const client = yield axios({
            method: 'POST',
            url: '/api/clients',
            data: action.payload
        })
        yield put ({type: 'FETCH_CLIENTS'});
    } catch (error) {
        console.log(error);
        alert('Error adding clients');
    }
    
}

function* editClient(action){
    console.log('arrived in edit client route', action.payload);

    try {
        const client = yield axios({
            method: 'PUT',
            url: '/api/clients',
            data: action.payload
        })
        yield put ({type: 'FETCH_CLIENTS'});
    } catch (error) {
        console.log(error);
        alert('Error editing clients');
    }
    
}

function* addDog(action){
    console.log('arrived in add dog route', action.payload);

    try {
        const dog = yield axios({
            method: 'POST',
            url: '/api/clients/dog',
            data: action.payload
        })
        // yield put ({type: 'FETCH_CLIENTS'});
    } catch (error) {
        console.log(error);
        alert('Error adding dog');
    }
    
}



function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', getALlClients);
    yield takeLatest('ADD_CLIENT', addClient);
    yield takeLatest('EDIT_CLIENT', editClient);
    yield takeLatest('ADD_NEW_DOG', addDog);
   
    
  }

  export default clientSaga;
  