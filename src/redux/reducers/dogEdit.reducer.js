const dogEdit = (state = {client_id: '', dog_name: '', dog_notes: '', image: '', flag: false, regular: false}, action) => {
    switch (action.type) {
        case 'SET_DOG_EDIT':
            return action.payload;
        case 'UPDATE_DOG_NAME':
            return {...state, dog_name: action.payload}
        case 'UPDATE_DOG_NOTES':
            return {...state, dog_notes: action.payload}
        case 'SET_EDIT_FLAG':
            return{...state, flag: action.payload}
        case 'SET_EDIT_REGULAR':
            return{...state, regular: action.payload}
        case 'CLEAR_EDIT_DOG':
            return {dog_name: '', dog_notes: '', flag: false, regular: false}
        default:
            return state;
    }
}

export default dogEdit;

