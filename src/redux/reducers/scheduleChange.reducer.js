const scheduleChangeReducer = (state = [], action) => {
    console.log('in reducer test', action.payload)
    switch (action.type) {
        case 'SET_SCHEDULE_CHANGE': 
            return action.payload;
        // case 'CLEAR_SCHEDULE_CHANGE':
            
        default:
            return state;
    }
}

export default scheduleChangeReducer;