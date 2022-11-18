import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDetails(action) {
    console.log('FETCHING DOG DETAILS', action.payload);
    const dogID = action.payload;
    try {
        const dog = yield axios({
            method: 'GET',
            url: `/api/mobile/dog/${dogID}`
        })
        console.log('DOG IS', dog.data);

        yield put({ type: 'SET_DOG_DETAILS', payload: dog.data })

    } catch {
        console.log('error in addImage')
    }
}

function* updateNote(action) {
    // single dog
    let dog = action.payload;
    let note = action.payload.note;
    console.log('DOG TO UPDATE IS:', dog, note);

    try {
        yield axios({
            method: 'PUT',
            url: `/api/mobile/notes`,
            data: dog
        })
        yield put({ type: 'FETCH_DOG_DETAILS', payload: dog.id })

        console.log('CHANGED');

    } catch (error) {
        console.log('ERROR UPDATING DOG STATUS', error);
    }
}



function* detailsSaga() {
    yield takeLatest('FETCH_DOG_DETAILS', fetchDetails);
    yield takeLatest('UPDATE_DOG_NOTE', updateNote);

}

export default detailsSaga;
