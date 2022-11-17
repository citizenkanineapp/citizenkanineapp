import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';



function* getAllClients(action){
    console.log('arrived in get clients route');
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
        yield put ({type: 'CLEAR_SCHEDULE'})
        yield put ({type: 'CLEAR_CLIENT'})
        yield put ({type: 'CLEAR_DOGS'})
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
        yield put({type: 'FETCH_ONE_CLIENT', payload: action.payload.client_id})
        
    } catch (error) {
        console.log(error);
        alert('Error adding dog');
    }
    
}

function* fetchOneClient(action){
    console.log('arrived in get one client route', action.payload);
    let clientId = action.payload
    try {
        const client = yield axios.get(`/api/clients/${clientId}`);
        // console.log('back to saga', client)
        yield put ({type: 'SET_CLIENT', payload: client.data[0]});
    } catch (error) {
        console.log(error);
        alert('Error fetching one client');
    }
    
}

function* deleteClient(action) {
    const clientId = action.payload
    console.log(clientId)
    try{
        const client = yield axios.delete(`/api/clients/${clientId}`);
        yield put ({type: 'FETCH_CLIENTS'});
    } catch (error){
        console.log('error deleting client', error)
    }
}

function* deleteDog(action) {
    const dogId = action.payload.dog_id
    console.log(dogId)
    try{
        const dog = yield axios.delete(`/api/clients/dogs/${dogId}`);
        yield put ({type: 'FETCH_ONE_CLIENT', payload: action.payload.client_id});
    } catch (error){
        console.log('error deleting dog', error)
    }
}

function* updateDog(action){
    console.log('arrived in edit dog route', action.payload);

    try {
        const dog = yield axios({
            method: 'PUT',
            url: '/api/clients/dogs',
            data: action.payload
        })
        yield put ({type: 'FETCH_ONE_CLIENT', payload: action.payload.client_id});
        //probably need to fetch specific client?
    } catch (error) {
        console.log(error);
        alert('Error editing dog');
    }
    
}

function* fetchSchedule(action){
    console.log('arrived in get one client route', action.payload);
    let clientId = action.payload
    try {
        const schedule = yield axios.get(`/api/clients/schedule/${clientId}`);
        console.log('back to saga', schedule)
        yield put ({type: 'SET_SCHEDULE', payload: schedule.data[0]});
    } catch (error) {
        console.log(error);
        alert('Error fetching one client schedule');
    }
    
}

function* oneOffScheduleChange(action){
    console.log('arrived in edit one off schedule route', action.payload);
    const scheduleChange = action.payload

    try {
        const schedule = yield axios({
            method: 'POST',
            url: '/api/clients/schedule',
            data: action.payload
        })
        console.log(scheduleChange[0].client_id)
        yield put ({type: 'FETCH_ONE_CLIENT', payload: scheduleChange[0].client_id});
  
    } catch (error) {
        console.log(error);
        alert('Error editing one off schedule');
    }
    
}


function* regularScheduleChange(action){
    console.log('arrived in edit regular schedule', action.payload);

    try {
        const schedule = yield axios({
            method: 'PUT',
            url: '/api/clients/schedule',
            data: action.payload
        })
        yield put ({type: 'FETCH_SCHEDULE', payload: action.payload.client_id});
        //probably need to fetch specific client?
    } catch (error) {
        console.log(error);
        alert('Error editing regular schedule');
    }
    
}


function* search(action){
    console.log('search term? ->>>>>>', action.payload)
    const searchText = action.payload
    let urlQuery = `/api/clients/matches?search=${searchText}`
        try {
            const results = yield axios.get(`${urlQuery}`);
            console.log(results.data)
            yield put ({type: 'SET_SEARCH_RESULTS', payload: results.data});
        } catch (error) {
            console.log(error);
            alert('Error setting search results');
        }
    }



function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', getAllClients);
    yield takeLatest('ADD_CLIENT', addClient);
    yield takeLatest('EDIT_CLIENT', editClient);
    yield takeLatest('ADD_NEW_DOG', addDog);
    yield takeLatest('FETCH_ONE_CLIENT', fetchOneClient);
    yield takeLatest('DELETE_CLIENT', deleteClient);
    yield takeLatest('DELETE_DOG', deleteDog);
    yield takeLatest('UPDATE_DOG', updateDog);
    yield takeLatest('FETCH_SCHEDULE', fetchSchedule);
    yield takeLatest('SEND_ONE_SCHEDULE_CHANGE', oneOffScheduleChange);
    yield takeLatest('REGULAR_SCHEDULE_CHANGE', regularScheduleChange);
    yield takeLatest('SEARCH_CLIENTS', search);
    
  }

  export default clientSaga;
  