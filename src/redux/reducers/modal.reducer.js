import { combineReducers } from 'redux';

const client = (state = '', action) => {
    switch (action.type) {
      case 'SET_CLIENT_MODAL':
        return action.payload;
      case 'CLEAR_MODALS':
        return '';
      default:
        return state;
    }
  };

const employee = (state = '', action) => {
  switch (action.type) {
    case 'SET_EMPLOYEE_MODAL':
      return action.payload;
    case 'CLEAR_MODALS':
      return '';
    default:
      return state;
  }
};

const status = (state = false, action) => {
  switch (action.type) {
    case 'SET_MODAL_STATUS':
      return !state;
    case 'CLEAR_MODALS':
      return false;
    default:
      return state;
  }
}

const modalReducer = combineReducers({
    client,
    employee,
    status,
});
 
export default modalReducer;
  