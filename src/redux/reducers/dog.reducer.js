const dogReducer = (state = [{dog_name: '', image: '', dog_notes: '', flag: false, regular: true}], action) => {
    // console.log ('in dog reducer', action.payload)
    switch (action.type) {
        case 'ADD_DOG_NAME':
            // change the dog_name value for a given dog object (based on index)
            const newState = state.map((dog, index) => {
                if (index === action.payload.index) {
                    dog.dog_name = action.payload.dog_name
                    return dog;
                } else {
                    return dog;
                }
            })
            return newState;
        case 'ADD_DOG_NOTES':
            // change the dog_notes value for a given dog object (based on index)
            const updateState = state.map((notes, index) => {
                if (index === action.payload.index) {
                    notes.dog_notes = action.payload.dog_notes
                    return notes;
                } else {
                    return notes;
                }
            })
            return updateState;
            
        case 'SET_DOG_PHOTO':
            const photoState = state.map((image , index) => {
                if(index === action.payload.index) {
                    image.image = action.payload.data
                    return image;
                } else {
                    return image;
                }
            })
            return photoState;
        case 'ADD_DOG_INPUT':
            return [...state, {dog_name: '', image: '', dog_notes: '', flag: false}]
        case 'SET_FIRST_FLAG':
            console.log(action.payload)
            const flagState = state.map((flag , index) => {
                if(index === action.payload.index) {
                    flag.flag = action.payload.flag
                    return flag;
                } else {
                    return flag;
                }
            })
            return flagState;
        case 'SET_REGULAR':
            console.log(action.payload)
            const regularState = state.map((regular , index) => {
                if(index === action.payload.index) {
                    regular.regular = action.payload.regular
                    return regular;
                } else {
                    return regular;
                }
            })
            return regularState;
        case 'DELETE_DOG_INPUT':
            return state.filter((dog, i) => i !== action.payload);
        case 'CLEAR_DOGS':
            return [{dog_name: '', image: '', dog_notes: '', flag: false, regular: true}];
        default:
            return state;
    }
}

export default dogReducer;


