import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* uploadImage(action){
    console.log('arrived in image saga');
    try{
        const image = yield axios({
            method: 'POST',
            url: '/api/image',
            data: action.payload
        })
        yield put ({type: 'FETCH_IMAGE'});
    } catch {
        console.log('error in addImage')
    }
}

function* fetchImage (){
    try {
        const getImage = yield axios.get('/api/upload');
        const imageArray = getImage.data;
        const length = imageArray.length;
        console.log(length)
        console.log(getImage.data);
        yield put ({type: 'SET_IMAGE', payload: getImage.data[length-1]});
    } catch (error) {
        console.log(error);
        alert('Error fetching image');
    }
}

function* imageSaga() {
    yield takeLatest('ADD_IMAGE', uploadImage);
    yield takeLatest('FETCH_IMAGE', fetchImage)
   
  }

  export default imageSaga;
  