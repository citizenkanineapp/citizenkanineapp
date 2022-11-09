const clientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLIENT': // switch to client to add later?
            return action.payload;
        case 'CLEAR_CLIENT':
            return state;
        default:
            return state;
    }
}

export default clientReducer;