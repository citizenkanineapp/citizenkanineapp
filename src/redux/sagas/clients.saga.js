import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* getALlClients(action){
    // console.log('arrived in get client route');
    try {
        const clients = yield axios.get('/api/clients');
        // console.log(clients.data)
        // yield put ({type: 'SET_CLIENTS', payload: clients.data});
    } catch (error) {
        console.log(error);
        alert('Error fetching clients');
    }
    
}



function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', getALlClients);
    
  }

  export default clientSaga;
  