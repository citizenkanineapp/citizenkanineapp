import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import modal from './modal.reducer'
import dogPhotoReducer from './dogImage.reducer';
import employeesReducer from './employees.reducer';
import clientsReducer from './clients.reducer';
import clientToAddReducer from './clientToAdd.reducer';
import clientReducer from './client.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal,
  dogPhotoReducer,
  employeesReducer,
  clientsReducer,
  clientToAddReducer,
  clientReducer,
});

export default rootReducer;
