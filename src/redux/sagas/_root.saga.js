import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import imageSaga from './image.saga';
import resetPassSaga from './passreset.saga';
import employeesSaga from './employees.saga.js';
import clientSaga from './clients.saga';
import RouteSaga from './routes.saga';
import InvoiceDataSaga from './invoiceData.saga';
import clientScheduleSaga from './clientSchedule.saga';
import detailsSaga from './details.saga';
import adminSaga from './admin.saga';
import quickBooksSaga from './quickbooks.saga';
import testSaga from './test.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    imageSaga(),
    resetPassSaga(),
    employeesSaga(),
    clientSaga(),
    RouteSaga(),
    InvoiceDataSaga(),
    clientScheduleSaga(),
    detailsSaga(),
    adminSaga(),
    quickBooksSaga(),
    testSaga(),
  ]);
}
