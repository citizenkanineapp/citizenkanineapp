import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* uploadImage(action) {
    // console.log('arrived in image saga' , action.payload);
    try {
        const image = yield axios({
            method: 'POST',
            url: '/api/image',
            data: action.payload
        })

        const { data } = image

        const newImageObject = { data }
       // console.log('THE OBJECT IS:', newImageObject);
        newImageObject.index = action.payload.index
       // console.log('testing format', newImageObject)
        //need to decide what type of state the reducer should be
        yield put({ type: 'SET_DOG_PHOTO', payload: newImageObject });
    } catch {
        console.log('error in addImage')
    }
}

function* updateDogPhoto(action) {

    // console.log('DOG ID IS:', action.payload);
    try {
        const image = yield axios({
            method: 'POST',
            url: '/api/image',
            data: action.payload
        })
        //console.log('IMAGE IS:', image);
        const { data } = image;
        const newImageObject = { data };
        newImageObject.dogID = action.payload.dogID

        //console.log('testing format', newImageObject)

        yield axios({
            method: 'PUT',
            url: '/api/mobile/photos',
            data: newImageObject
        })

        //need to decide what type of state the reducer should be
        yield put({ type: 'FETCH_DOG_DETAILS', payload: action.payload.dogID })
        yield put({ type: 'SET_MODAL_STATUS' });
    } catch {
        console.log('error updating dog photo');
    }
}

function* imageSaga() {
    yield takeLatest('ADD_IMAGE', uploadImage);
    yield takeLatest('UPDATE_DOG_PHOTO', updateDogPhoto);

}

export default imageSaga;
