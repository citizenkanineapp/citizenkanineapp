const dogPhotoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOG_PHOTO':
            return action.payload;
        case 'CLEAR_DOG_PHOTO':
            return state;
        default:
            return state;
    }
}

export default dogPhotoReducer;

//maybe don't need this reducer if it sends directly to the dog reducer now