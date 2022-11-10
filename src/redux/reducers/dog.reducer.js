const dogReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_DOG_NAME':
            return {...state, dog_name: action.payload};
        case 'SET_DOG_PHOTO':
            return {...state, image: action.payload.data};
        case 'CLEAR_DOGS':
            return [];
        default:
            return state;
    }
}

export default dogReducer;

//should this be an object or an array?
//can't map through object