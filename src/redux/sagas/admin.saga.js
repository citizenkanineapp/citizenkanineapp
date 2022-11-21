import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setAdminNotes(action) {
    console.log('Admin Notes', action.payload);
    const note = { notes: action.payload }
    try {
        const notes = yield axios({
            method: 'POST',
            url: '/api/admin',
            data: note
        })
        yield put({ type: 'FETCH_ADMIN_NOTES' });
    } catch (error) {
        console.log(error);
        alert('Error adding admin notes');
    }
}

function* fetchAdminNotes(action) {
    console.log('Get Admin Notes', action.payload);
    try {
        const notes = yield axios.get('/api/admin');
        yield put({ type: 'SET_NOTES', payload: notes.data });
        // console.log('notes structure', notes.data)
    } catch (error) {
        console.log(error);
        console.log('Admin notes not available when logged out. Please log in to see them again');
    }

}

function* deleteAdminNotes(action) {
    const noteId = action.payload
    console.log('in saga', noteId)
    try {
        const note = yield axios.delete(`/api/admin/${noteId}`);
        yield put({ type: 'FETCH_ADMIN_NOTES' });
    } catch (error) {
        console.log('error deleting admin note', error)
    }
}




function* adminSaga() {
    yield takeLatest('ADD_ADMIN_NOTES', setAdminNotes);
    yield takeLatest('FETCH_ADMIN_NOTES', fetchAdminNotes);
    yield takeLatest('DELETE_ADMIN_NOTES', deleteAdminNotes);

}

export default adminSaga;


//Note to self:  I think I need to just make a put route and
//get rid of the post route
