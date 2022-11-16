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



function* detailsSaga() {
    yield takeLatest('FETCH_DOG_DETAILS', fetchDetails);

}

export default detailsSaga;
