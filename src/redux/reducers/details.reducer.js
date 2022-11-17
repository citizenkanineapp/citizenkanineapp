const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOG_DETAILS':
            return action.payload;
        case 'EDIT_DOG_NOTE':
            return { ...state, dog_notes: action.payload }
        case 'EDIT_DOG_PHOTO':
            return { ...state, image: action.payload }
        case 'CLEAR_DETAILS':
            return {};
        default:
            return state;
    }
}

export default detailsReducer;