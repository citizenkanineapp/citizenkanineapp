
const clientScheduleReducer = (state = {1: false, 2: false, 3: false, 4: false, 5: false}, action) => {
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
        case 'CLEAR_SCHEDULE':
            return{1: false, 2: false, 3: false, 4: false, 5: false};
        default:
            return state;
    }
}


export default clientScheduleReducer;