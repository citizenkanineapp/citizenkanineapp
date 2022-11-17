import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// function* registerUser(action) {
//   try {
//     // clear any existing error on the registration page
//     // yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

//     // passes the username and password from the payload to the server
//     yield axios({
//             method: 'POST',
//             url: '/api/user/register',
//             data: action.payload
//           })

//     // automatically log a user in after registration
//     // yield put({ type: 'LOGIN', payload: action.payload });

//     // set to 'login' mode so they see the login screen
//     // after registration or after they log out
//     // yield put({ type: 'SET_TO_LOGIN_MODE' });
//   } catch (error) {
//     console.log('Error with user registration:', error);
//     // yield put({ type: 'REGISTRATION_FAILED' });
//   }
// }

function* registerEmpUser(action){
  try {
    // passes the username and password from the payload to the server
    yield axios({
            method: 'POST',
            url: '/api/user/register/employee',
            data: action.payload
          })
    // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    // yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    // yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  // yield takeLatest('REGISTER', registerUser),
  yield takeLatest('REGISTER_EMP_USER', registerEmpUser);
}

export default registrationSaga;
