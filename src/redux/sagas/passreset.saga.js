import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

// worker Saga: will be fired on "REGISTER" actions
function* resetPass(action) {
  try {
    // console.log(action.payload);
    const userId = action.payload.id;
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_PASSWORD_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.put(`/api/pass_reset/resetpass/${userId}`, action.payload);
    // yield axios.post(`/api/passreset/${userId}`)

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

function* resetPassFromLink(action){
 // console.log('in resetPassFromLink');

  try {
    const { password, token, id } = action.payload;
    // console.log(id, token, password);
    yield put({ type: 'CLEAR_PASSWORD_ERROR' });
    yield axios({
      url: '/api/pass_reset/resetpassfromlink',
      method: 'PUT',
      data: {
        id: id,
        token: token,
        password: password
      }
    })

  } catch (error) {
    console.log('Error with password reset: ', error);
    yield put({ type: 'PASSWORD_RESET_FAIL' });
  }
}





function* emailPassReset(action) {
  try{
    const email = action.payload.email;
    console.log('in saga', email)
    const res = yield axios({
      url:'/api/pass_reset/email_reset_link',
      method: 'POST',
      data: {email}
    });
      swal("Email sent!");

  } catch (error){
    console.log("error in emailPassRest. Email does not match any on record", error)
    swal("Incorrect Email")

  }
}

function* resetPassSaga() {
  yield takeLatest('RESETPASS', resetPass);
  yield takeLatest('RESET_PASS_FROM_LINK', resetPassFromLink)
  yield takeLatest('EMAIL_PASS_RESET', emailPassReset);
}

export default resetPassSaga;
