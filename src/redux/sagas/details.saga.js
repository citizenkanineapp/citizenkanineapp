import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDetails(action) {
    console.log('FETCHIND DOG DETAILS');
    const dogID = action.payload;
    try {
        const dog = yield axios({
            method: 'GET',
            url: `/api/mobile/dog/${dogID}`
        })
        console.log('DOG IS', dog);
        yield put({ type: 'SET_DOG', payload: dog.data })

    } catch {
        console.log('error in addImage')
    }
}



function* detailsSaga() {
    yield takeLatest('FETCH_DOG_DETAILS', fetchDetails);

}

export default detailsSaga;
