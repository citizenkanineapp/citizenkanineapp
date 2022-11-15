import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import modal from './modal.reducer'
import dogPhotoReducer from './dogImage.reducer';
import dnd from './dnd.reducer';
import employeesReducer from './employees.reducer';
import clientsReducer from './clients.reducer';
import clientToAddReducer from './clientToAdd.reducer';
import clientReducer from './client.reducer';
import routeReducer from './route.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal,
  dogPhotoReducer,
  dnd,
  employeesReducer,
  clientsReducer,
  clientToAddReducer,
  clientReducer,
  routeReducer,
});

export default rootReducer;
