const clientToAddReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CLIENT': // switch to client to add later?
            return action.payload;
        case 'CLEAR_CLIENT_TO_ADD':
            return state;
        default:
            return state;
    }
}

export default clientToAddReducer;