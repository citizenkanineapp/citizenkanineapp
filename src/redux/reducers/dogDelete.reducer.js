const dogDelete = (state = {}, action) => {
    // console.log ('in dog reducer', action.payload)
    switch (action.type) {
        case 'SET_DOG_DELETE':
        return action.payload;
        case 'SET_DOG':
            return action.payload;
        case 'UPDATE_DOG_NAME':
            return {...state, dog_name: action.payload}
        case 'UPDATE_DOG_NOTES':
            return {...state, dog_notes: action.payload}
        case 'SET_EDIT_FLAG':
                return{...state, flag: action.payload}
        case 'CLEAR_DELETE_DOG':
            return {}
        default:
            return state;
    }
}

export default dogDelete;

