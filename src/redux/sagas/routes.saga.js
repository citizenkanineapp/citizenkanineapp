import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRoutes() {
    // console.log('GETTING DAILY ROUTES');

    try {
        const routes = yield axios.get('/api/mobile/routes');
       // console.log(routes);

        //assigns color to dog for grouping purposes
        const colors = (dog) => {
            //grabs the last digit in client_id, to account for many many numbers
            if (Number(dog.client_id.toString().slice(-2, -1)) === 0){  //if single digit
                const lastClientDigit = Number(dog.client_id.toString().slice(-1));
                switch (lastClientDigit) {
                    case 0: return '#e25032'; break;
                    case 1: return '#F38542'; break;
                    case 2: return '#F37E2D'; break;
                    case 3: return '#F8614D'; break;
                    case 4: return '#F49250'; break;
                    case 5: return '#f6703d'; break;
                    case 6: return '#F2932E'; break;
                    case 7: return '#FA7C6C'; break;
                    case 8: return '#F96F5D'; break;
                    case 9: return '#DC862A'; break;
                    default: return '#7F2020';
                }}
                
            else{ //double digits and beyond
                const secondToLast = Number(dog.client_id.toString().slice(-2, -1));
                const last = Number(dog.client_id.toString().slice(-1));
                // if (secondToLast % 2 === 0){ //if even number
                switch (last) {
                    case 0: return '#4A5061'; break;
                    case 1: return '#eea937'; break;
                    case 2: return '#4F7699'; break;
                    case 3: return '#eea937'; break;
                    case 4: return '#5DA8CF'; break;
                    case 5: return '#67B5CD'; break;
                    case 6: return '#71C2CB'; break;
                    case 7: return '#94CFD3'; break;
                    case 8: return '#94CFD3'; break;
                    case 9: return '#94CFD3'; break;
                    default: return '#4A5061';
                }
       
                //}
                // else{
                //     switch (last) {
                //         case 0: return '#354D89'; break;
                //         case 1: return '#DC682A'; break;
                //         case 2: return '#F37E2D'; break;
                //         case 3: return '#F87462'; break;
                //         case 4: return '#53B0D1'; break;
                //         case 5: return '#B02C65'; break;
                //         case 6: return '#1F96F1'; break;
                //         case 7: return '#7C87CF'; break;
                //         case 8: return '#FFA1A1'; break;
                //         case 9: return '#FA789F'; break;
                //         default: return '#B668D0';
                //     }}
                }
            }
        

        const dayRoutes = {
            Tangletown: routes.data
                .filter(dog => (dog.route === 'Tangletown'))
                .map(dog => {           //if there's more than one dog in the household
                    const dogMatch = routes.data.find(dawg => dog.dog_id !== dawg.dog_id && dog.client_id === dawg.client_id);
                    if (dogMatch) { return { ...dog, color: colors(dog) }; } //assign a color using colors function
                    else { return dog; }
                }),

            Emerson: routes.data
                .filter(dog => (dog.route === 'Emerson'))
                .map(dog => {
                    const dogMatch = routes.data.find(dawg => dog.dog_id !== dawg.dog_id && dog.client_id === dawg.client_id);
                    if (dogMatch) { return { ...dog, color: colors(dog) }; }
                    else { return dog; }
                }),

            Far: routes.data
                .filter(dog => (dog.route === 'Far'))
                .map(dog => {
                    const dogMatch = routes.data.find(dawg => dog.dog_id !== dawg.dog_id && dog.client_id === dawg.client_id);
                    if (dogMatch) { return { ...dog, color: colors(dog) }; }
                    else { return dog; }
                }),

            Misfits: routes.data
                .filter(dog => (dog.route === 'Misfits'))
                .map(dog => {
                    const dogMatch = routes.data.find(dawg => dog.dog_id !== dawg.dog_id && dog.client_id === dawg.client_id);
                    if (dogMatch) { return { ...dog, color: colors(dog) }; }
                    else { return dog; }
                }),

            Unassigned: routes.data
                .filter(dog => (dog.route === 'Unassigned'))
                .map(dog => {
                    const dogMatch = routes.data.find(dawg => dog.dog_id !== dawg.dog_id && dog.client_id === dawg.client_id);
                    if (dogMatch) { return { ...dog, color: colors(dog) }; }
                    else { return dog; }
                })
        };

        yield put({ type: 'SET_DAILY_ROUTES', payload: dayRoutes });

    } catch (error) {
        console.log(error);
        // alert('ERROR FETCHING DAILY DOGS');
    }
}

function* getRouteDetails(action) {
   // console.log('GETTING ROUTE:', action.payload);
    const routeID = Number(action.payload);
    // console.log('route id in getRouteDetails saga', action.payload, routeID)
    try {
        const routeResult = yield axios({
            method: 'GET',
            url: `/api/mobile/route/${routeID}`
        })
        //console.log(routeResult);

        yield put({ type: 'SET_ROUTE', payload: routeResult.data })
    } catch (error) {
        console.log('ERROR GETTING ROUTE', error);
    }

}


function* updateRoute(action) {
   // console.log('UPDATING ROUTE', action.payload)
    const dogID = Number(action.payload.dogID);
   // console.log('DOG ID IS:', dogID);
    const routeName = action.payload.routeName;
   // console.log('ROUTE NAME IS:', routeName);
    let routeID = null;

    switch (routeName) {
        case 'Tangletown':
            routeID = 1
            break;
        case 'Emerson':
            routeID = 2
            break;
        case 'Far':
            routeID = 3
            break;
        case 'Misfits':
            routeID = 4
            break;
        case 'Unassigned':
            routeID = 5
            break;
    }

   // console.log('ROUTE NUMBER IS:', routeID);


    try {
        const updatedDog = yield axios({
            method: 'PUT',
            url: '/api/mobile/routes',
            data: { dogID, routeID }
        })
      //  console.log('CHANGED');

    } catch (error) {
        console.log('ERROR UPDATING DOG ROUTE', error);
    }
}

function* populateDailyDogs(action) {
    //console.log('Populating Todays Dogs');

    try {
        const populatedDogs = yield axios.get('/api/mobile/daily');
    } catch (error) {
        console.log('Daily Dogs only generates on Weekdays - More than likely that is why you are seeing this error or daily dogs have already populated for today!', error);
    }
}

function* updateStatus(action) {
    // single dog
    let dog = action.payload;
    let routeID = action.payload.routeID;
   // console.log('DOG TO UPDATE IS:', dog, routeID);

    try {
        yield axios({
            method: 'PUT',
            url: `/api/mobile/daily`,
            data: dog
        })
        yield put({ type: 'GET_ROUTE_DETAILS', payload: routeID })

       // console.log('CHANGED');

    } catch (error) {
        console.log('ERROR UPDATING DOG STATUS', error);
    }

}

function* RouteSaga() {
    yield takeLatest('GET_DAILY_ROUTES', getRoutes);
    yield takeLatest('UPDATE_ROUTE', updateRoute);
    yield takeLatest('GET_ROUTE_DETAILS', getRouteDetails);
    yield takeLatest('POPULATE_DAILY_DOGS', populateDailyDogs);
    yield takeLatest('NO_SHOW', updateStatus);
    yield takeLatest('CHECK_IN', updateStatus);
    yield takeLatest('CANCEL_WALK', updateStatus);
}

export default RouteSaga;