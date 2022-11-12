const dogReducer = (state = [{dog_name: '', image: '', dog_notes: ''}], action) => {
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
            return [...state, {dog_name: '', image: '', dog_notes: ''}]
        case 'CLEAR_DOGS':
            return [{dog_name: '', image: '', dog_notes: ''}];
        default:
            return state;
    }
}

export default dogReducer;


//can't map through object

// const dogReducer = (state = {}, action) => {
//     switch (action.type) {
//         case 'ADD_DOG_NAME':
//             return {...state, dog_name: action.payload};
//         case 'SET_DOG_PHOTO':
//             return {...state, image: action.payload.data};
//         case 'CLEAR_DOGS':
//             return [];
//         default:
//             return state;
//     }
// }

// export default dogReducer;

// //should this be an object or an array?
// //can't map through object