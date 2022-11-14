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
        const clients = yield axios.get('/api/clients');
        // console.log(clients.data)
        yield put ({type: 'SET_CLIENTS', payload: clients.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching clients');
    }
    
}



function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', getALlClients);
    yield takeLatest('ADD_CLIENT', addClient);
    
  }

  export default clientSaga;
  