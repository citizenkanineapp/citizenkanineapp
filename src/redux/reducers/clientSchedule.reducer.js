const clientScheduleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MONDAY':
            return {...state, monday: action.payload};
        case 'SET_TUESDAY':
            return {...state, tuesday: action.payload};
        case 'SET_WEDNESDAY':
            return {...state, wednesday: action.payload};
        case 'SET_THURSDAY':
            return {...state, thursday: action.payload};
        case 'SET_FRIDAY':
            return {...state, friday: action.payload};
        case 'CLEAR_SCHEDULE':
            return{};
        default:
            return state;
    }
}

export default clientScheduleReducer;