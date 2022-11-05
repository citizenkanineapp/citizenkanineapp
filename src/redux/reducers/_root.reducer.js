import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import modal from './modal.reducer'

const rootReducer = combineReducers({
  errors, 
  user, 
  modal,
});

export default rootReducer;
