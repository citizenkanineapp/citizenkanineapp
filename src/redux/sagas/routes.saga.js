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


function* updateRoute(action) {
    console.log('UPDATING ROUTE', action.payload)
    const dogID = Number(action.payload.dogID);
    console.log('DOG ID IS:', dogID);
    const routeName = action.payload.routeName;
    console.log('ROUTE NAME IS:', routeName);
    let routeID = null;

    switch (routeName) {
        case 'tangletown':
            routeID = 1
            break;
        case 'emerson':
            routeID = 2
            break;
        case 'far':
            routeID = 3
            break;
        case 'misfits':
            routeID = 4
            break;
        case 'unassigned':
            routeID = 5
            break;
    }

    console.log('ROUTE NUMBER IS:', routeID);


    try {
        const updatedDog = yield axios({
            method: 'PUT',
            url: '/api/mobile/routes',
            data: { dogID, routeID }
        })
        console.log('CHANGED');

    } catch (error) {
        console.log('ERROR UPDATING DOG ROUTE', error);
    }
}

function* RouteSaga() {
    yield takeLatest('GET_DAILY_ROUTES', getRoutes);
    yield takeLatest('UPDATE_ROUTE', updateRoute);
}

export default RouteSaga;