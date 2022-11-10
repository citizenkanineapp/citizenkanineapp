import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* uploadImage(action){
    // console.log('arrived in image saga' , action.payload);
    try{
        const image = yield axios({
            method: 'POST',
            url: '/api/image',
            data: action.payload
        })
        console.log(action.payload.index)
        console.log('what comes back from server', image)
        const {data} = image
        const newImageObject = {data}
        newImageObject.index = action.payload.index
        console.log('testing format', newImageObject)
        //need to decide what type of state the reducer should be
        yield put ({type: 'SET_DOG_PHOTO', payload: newImageObject});
    } catch {
        console.log('error in addImage')
    }
}

// f

function* imageSaga() {
    yield takeLatest('ADD_IMAGE', uploadImage);
    
  }

  export default imageSaga;
  