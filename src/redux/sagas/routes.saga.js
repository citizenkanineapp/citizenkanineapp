import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRoutes() {
    console.log('GETTING DAILY ROUTES');

    try {
        const routes = yield axios.get('/api/mobile/routes');
        const dayRoutes = {
            tangletown: routes.data.filter(dog => (dog.route === 'tangletown')),
            emerson: routes.data.filter(dog => (dog.route === 'emerson')),
            far: routes.data.filter(dog => (dog.route === 'far')),
            misfits: routes.data.filter(dog => (dog.route === 'misfits')),
            unassigned: routes.data.filter(dog => (dog.route === 'unassigned'))
        };
        yield put({ type: 'SET_DAILY_ROUTES', payload: dayRoutes });

    } catch (error) {
        console.log(error);
        alert('ERROR FETCHING DAILY DOGS');
    }
}


function* RouteSaga() {
    yield takeLatest('GET_DAILY_ROUTES', getRoutes);

}

export default RouteSaga;