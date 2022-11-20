//using this reducer for dogs added through edit form only

const newDogReducer = (state = {client_id: '', vet_phone: '', vet_name: '',
dog_name:'', dog_notes: '', image: '', flag: false, regular: false }, action) => {
    // console.log ('in dog reducer', action.payload)
    switch (action.type) {
        case 'ADD_CLIENT_ID_TO_DOG':
            return {...state, client_id: action.payload}
        case 'ADD_VET_PHONE':
            return {...state, vet_phone: action.payload}
        case 'ADD_VET_NAME':
            return {...state, vet_name: action.payload}
        case 'ADD_NEW_NAME':
            return {...state, dog_name: action.payload};
        case 'ADD_NEW_NOTES':
            return {...state, dog_notes: action.payload}
        case 'SET_DOG_PHOTO':
            return{...state, image: action.payload.data}
        case 'SET_FLAG':
            return{...state, flag: action.payload}
        case 'SET_REGULAR':
            return{...state, regular: action.payload}
        case 'CLEAR_NEW_DOG':
            return {client_id: '', vet_phone: '', vet_name: '',
            dog_name:'', dog_notes: '', image: '', flag: false };
        default:
            return state;
    }
}

export default newDogReducer;


