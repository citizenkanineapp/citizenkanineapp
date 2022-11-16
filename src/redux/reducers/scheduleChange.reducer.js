const scheduleChangeReducer = (state = {}, action) => {
    // console.log('in reducer test', action.payload)
    switch (action.type) {
        // case 'SET_SCHEDULE_CHANGE': 
        //     return action.payload;
        // case 'SET_MONDAY_CHANGE': 
        //     return action.payload;
        // case 'SET_TUESDAY_CHANGE': 
        //     return action.payload;
        // case 'SET_WEDNESDAY_CHANGE': 
        //     return action.payload;
        // case 'SET_THURSDAY_CHANGE': 
        //     return action.payload;
        // case 'SET_FRIDAY_CHANGE': 
        //     return action.payload
        default:
            return state;
    }
}

export default scheduleChangeReducer;