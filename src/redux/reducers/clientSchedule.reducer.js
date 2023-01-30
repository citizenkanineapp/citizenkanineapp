import { combineReducers } from 'redux';

const clientSchedule = (state = {1: false, 2: false, 3: false, 4: false, 5: false}, action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'SET_MONDAY':
            return {...state, 1: action.payload};
        case 'SET_TUESDAY':
            return {...state, 2: action.payload};
        case 'SET_WEDNESDAY':
            return {...state, 3: action.payload};
        case 'SET_THURSDAY':
            return {...state, 4: action.payload};
        case 'SET_FRIDAY':
            return {...state, 5: action.payload};
        case 'SET_SCHEDULE':
            return action.payload;
        case 'CLEAR_SCHEDULE':
            return{1: false, 2: false, 3: false, 4: false, 5: false};
        default:
            return state;
    }
}

const editClientSchedule = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_CLIENT_SCHEDULE':
            return action.payload;
        case 'EDIT_CLIENT_WEEK_SCHEDULE':
            const day = action.payload.day;
            const change = action.payload.change;
            return {...state, [day]: change}
        case 'CLEAR_SCHEDULE':
            return{1: false, 2: false, 3: false, 4: false, 5: false};
        default:
            return state;
    }
}

function clientScheduleChanges (state = [], action){
    switch (action.type){
        case 'SET_CLIENT_SCHEDULE_CHANGES':
            return action.payload;
        default:
            return state
    }
}

const clientScheduleReducer= combineReducers({
    clientSchedule,
    clientScheduleChanges,
    editClientSchedule,
})

export default clientScheduleReducer;