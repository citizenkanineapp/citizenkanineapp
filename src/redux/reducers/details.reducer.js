const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOG_DETAILS':
            return action.payload;
        case 'CLEAR_DETAILS':
            return {};
        default:
            return state;
    }
}

export default detailsReducer;