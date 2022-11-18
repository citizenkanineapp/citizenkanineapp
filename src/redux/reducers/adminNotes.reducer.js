const adminNotesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        default:
            return state;
    }
}

export default adminNotesReducer;