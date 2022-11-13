const dogDelete = (state = {}, action) => {
    // console.log ('in dog reducer', action.payload)
    switch (action.type) {
        case 'SET_DOG':
        return action.payload;
        case 'CLEAR_DELETE_DOG':
            return {}
        default:
            return state;
    }
}

export default dogDelete;

