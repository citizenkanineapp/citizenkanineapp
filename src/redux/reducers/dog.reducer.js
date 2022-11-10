const dogReducer = (state = [{dog_name: '', image: ''}], action) => {
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
            // return {...state, dog_name: action.payload};
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
            return [...state, {dog_name: '', image: ''}]
            // change the image alue for a given dog object
            // return {...state, image: action.payload.data};
        case 'CLEAR_DOGS':
            return [{dog_name: '', image: ''}];
        default:
            return state;
    }
}

export default dogReducer;

//should this be an object or an array?
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