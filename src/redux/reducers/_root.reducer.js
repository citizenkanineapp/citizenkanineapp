import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import modal from './modal.reducer'
import dogPhotoReducer from './dogImage.reducer';
import clientsReducer from './clients.reducer';
import dogReducer from './dog.reducer';
import clientScheduleReducer from './clientSchedule.reducer';

import clientReducer from './client.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal,
  dogPhotoReducer,
  clientsReducer,
  clientReducer,
  dogReducer,
  clientScheduleReducer,
});

export default rootReducer;
