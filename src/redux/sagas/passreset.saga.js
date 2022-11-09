import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* resetPass(action) {
  try {
    // console.log(action.payload);
    const userId = action.payload.id;
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_PASSWORD_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.put(`/api/user/passreset/${userId}`, action.payload);

    // // automatically log a user in after registration
    // yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out

    //is this active?

    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with password reset:', error);
    yield put({ type: 'PASSWORD_RESET_FAIL' });
  }
}

function* clearError(action) {
  try {
    yield put({ type: 'CLEAR_PASSWORD_ERROR'});
  } catch (error) {
    console.log(error);
  }
}

function* resetPassSaga() {
  yield takeLatest('RESETPASS', resetPass);
  yield takeLatest('RESET_PASSWORD_ERROR', clearError)
}

export default resetPassSaga;
