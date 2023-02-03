import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testAuthorizationRequest (action) {
    // console.log('arrived in saga for authorization request')
    try {
        const uri = yield axios({
            method: 'GET',
            url: '/api/redirect/test'
        })
        console.log(uri)
    } catch {
        console.log('error in authorizationRequest');
    }
  
}

// function* checkTokenStatus (action) {
//     // console.log('arrived in saga for authorization request')
//     try {
//         const tokenStatus = yield axios.get('/api/quickbooks/token')
//         console.log('is there a token right now?', tokenStatus.data)
//     } catch {
//         console.log('error in token route');
//     }
// }




function* testSaga() {
    yield takeLatest('GET_HEROKU', testAuthorizationRequest);
    // yield takeLatest('CHECK_TOKEN', checkTokenStatus);
    
    
}

export default testSaga;
