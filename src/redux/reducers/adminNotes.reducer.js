const adminNotesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        // case 'ADD_ADMIN_NOTES':
        //     return [{...state, notes: action.payload}];
        default:
            return state;
    }
}

export default adminNotesReducer;