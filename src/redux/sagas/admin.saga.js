import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setAdminNotes(action) {
    console.log('Admin Notes', action.payload); 
    try {
        const notes = yield axios({
            method: 'POST',
            url: '/api/admin',
            data: action.payload
        })
        yield put ({type: 'FETCH_NOTES'});
    } catch (error) {
        console.log(error);
        alert('Error adding admin notes');
    }
}

function* fetchAdminNotes(action) {
    console.log('Get Admin Notes', action.payload); 
    try {
        const notes = yield axios.get('/api/admin');
        yield put ({type: 'SET_NOTES', payload: notes.data[0]});
        console.log('notes structure', notes.data)
    } catch (error) {
        console.log(error);
        alert('Error fetching notes');
    }
    
}




function* adminSaga() {
    yield takeLatest('ADD_ADMIN_NOTES', setAdminNotes);
    yield takeLatest('FETCH_NOTES', fetchAdminNotes);

}

export default adminSaga;


//Note to self:  I think I need to just make a put route and
//get rid of the post route
