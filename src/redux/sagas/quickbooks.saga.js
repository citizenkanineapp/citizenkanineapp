import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* authorizationRequest (action) {
    console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/quickbooks/connect_handler'
        })

        //HIIIIIIIIIIII.  Ok I will close this now and check in later with any pushes you make
        yield put({
            type: '',
            payload: uri.data
        })
    }
    catch {
        console.log('error in authorizationRequest');
    }
  
}

function* quickBooksSaga() {
    yield takeLatest('AUTHORIZATION_REQUEST', authorizationRequest);
}

export default quickBooksSaga;
