import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return "Oops! The username and password didn't match. Try again!";
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

const resetPasswordMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_PASSWORD_ERROR':
      return '';
    case 'PASSWORD_RESET':
      return 'Password successfully reset.'
    case 'PASSWORD_INPUT_ERROR':
      return 'Password must match!';
    case 'PASSWORD_RESET_FAILED':
      return 'Password failed to reset.';
    default:
      return state;
  }
};

const addClientErrors= (state = '', action) => {
  switch (action.type) {
    case 'FIRST_NAME_ERROR':
      return 'Please enter a first name';
    // case 'PASSWORD_RESET':
    //   return 'Password successfully reset.'
    // case 'PASSWORD_INPUT_ERROR':
    //   return 'Password must match!';
    // case 'PASSWORD_RESET_FAILED':
    //   return 'Password failed to reset.';
    default:
      return state;
  }
};

const qbSyncErrors = (state='', action) => {
  switch(action.type) {
    case 'SERVICES_SYNCED':
      return 'Services synced from Quickbooks!';
  }
}

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  resetPasswordMessage,
  addClientErrors
});
