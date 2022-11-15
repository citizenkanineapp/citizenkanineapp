const routeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            return action.payload;
        case 'CLEAR_ROUTE':
            return [];
        default:
            return state;
    }
}

export default routeReducer;