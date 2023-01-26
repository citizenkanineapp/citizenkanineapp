const qbClientsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QB_CLIENTS':
            return action.payload;
        default:
            return state;
    }
}

export default qbClientsReducer;