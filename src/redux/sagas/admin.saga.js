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
        // yield put({ type:})
    } catch (error) {
        console.log(error);
        //alert('Error adding admin notes');
    }
}

function* fetchAdminNotes(action) {
    // console.log('Get Admin Notes', action.payload);
    try {
        const notes = yield axios.get('/api/admin');
        yield put({ type: 'SET_NOTES', payload: notes.data });
        // console.log('notes structure', notes.data)
    } catch (error) {
        console.log(error);
        console.log('Admin notes not available when logged out. Please log in to see them again')
    }
}

function* deleteAdminNotes(action) {
    const noteId = action.payload
    //console.log('in saga', noteId)
    try {
        const note = yield axios.delete(`/api/admin/${noteId}`);
        yield put({ type: 'FETCH_ADMIN_NOTES' });
    } catch (error) {
        console.log('error deleting admin note', error)
    }
}

// Sends admin note to pack from desktop/admin view.
//this function pre-supposes the presence of an admin note in the notes table
// and changes the 'notetype' field based on note id.
function* sendNoteToPack(action) {
    const noteId = action.payload;
    console.log('in sendNoteToPack saga', noteId);
    try {
        const note = yield axios.put(`/api/admin/send/${noteId}`);
        yield put({ type: 'FETCH_ADMIN_NOTES' });
    } catch (err) {
        console.log('error sending note to packleaders', err)
    }
}

// Sends new note to packleaders from mobile notes view.
// creates new note in notes table; sets notetype 'topack',
// PUTS 'new' in notes field of users table for all users
function* sendNoteToPackMobile(action) {
    console.log('Admin Notes', action.payload);
    const note = { notes: action.payload }
    try {
        const notes = yield axios({
            method: 'POST',
            url: '/api/admin',
            data: note
        })
        yield put({ type: 'SET_USER_NOTIFICATION_STATUS', payload: 'new'})

        yield put({ type: 'FETCH_ADMIN_NOTES' });



        // yield put({ type:})
    } catch (error) {
        console.log(error);
        //alert('Error adding admin notes');
    }
}

function* setNotificationStatus(action) {
    console.log ('in setNotificationStatus', action)
    const userId = action.payload;
    try {
        const note = yield axios.put(`/api/admin/status/${userId}`)
        const notificationStatus = note.data.rows[0].notes;
        yield put({ type: 'SET_USER_NOTIFICATION_STATUS', payload: notificationStatus})
    } catch (err) {
        console.log('error in setting notification status', err)
    }
}

function* fetchNotificationStatus(action) {
    console.log('in fetchNStatus');
    try {
        const note = yield axios.get(`/api/admin/status/${userId}`);
        // console.log(note.data.rows[0])
        console.log(note);
    } catch (err) {
        console.log(err);
    }
}

function* adminSaga() {
    yield takeLatest('ADD_ADMIN_NOTES', setAdminNotes);
    yield takeLatest('FETCH_ADMIN_NOTES', fetchAdminNotes);
    yield takeLatest('DELETE_ADMIN_NOTES', deleteAdminNotes);
    yield takeLatest('SEND_NOTE_TO_PACK', sendNoteToPack);
    yield takeLatest('SEND_NOTE_TO_PACK_MOBILE', sendNoteToPackMobile);
    yield takeLatest('SET_NOTIFICATION_STATUS', setNotificationStatus);
    yield takeLatest('FETCH_NOTIFICATION_STATUS', fetchNotificationStatus);
}

export default adminSaga;
