import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import modal from './modal.reducer'
import dogPhotoReducer from './dogImage.reducer';
import dailyDogz from './dailyDogz';
import allEmployeesReducer from './allEmployees.reducer';
import selectedEmployeeReducer from './selectedEmployee.reducer';
import clientsReducer from './clients.reducer';
import dogReducer from './dog.reducer';
import clientScheduleReducer from './clientSchedule.reducer';
import newDogReducer from './newDog.reducer';
import dogDelete from './dogDelete.reducer';
import searchReducer from './search.reducer';
import clientReducer from './client.reducer';
import routeReducer from './route.reducer';
import details from './details.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  modal,
  dogPhotoReducer,
  dailyDogz,
  allEmployeesReducer,
  clientsReducer,
  clientReducer,
  dogReducer,
  clientScheduleReducer,
  newDogReducer,
  dogDelete,
  selectedEmployeeReducer,
  routeReducer,
  searchReducer,
});

export default rootReducer;
